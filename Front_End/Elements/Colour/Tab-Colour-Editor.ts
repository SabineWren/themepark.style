import * as chroma from "chroma.ts"
import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { live } from "lit/directives/live.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { ToStringHsl, ToStringHslCommas } from "Lib/Colours.js"
import { Shared } from "Elements/Style.js"
import { Tokenize } from "Platform_Targets/Shoelace.js"
import { ThemeProvider } from "Providers/Theme.js"

const style = css`
:host {
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 1.5rem;
}

.swatch {
	display: inline-block;
	flex-basis: 1rem; flex-grow: 1;
	min-width: 1rem;
	height: 62px;
	border-radius: 2px; }

sl-tab-group[invert-primary] {
	--sl-color-primary-600: var(--sl-color-warning-600); }
sl-tab::part(base) {
	width: 100%;
	padding: var(--sl-spacing-medium); }

sl-tag { min-width: unset; }
sl-tag::part(content) { min-width: 2em; }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) {
	background: var(--background); }
sl-tag::part(content) { color: var(--colour); }

sl-color-picker {
	--grid-width: 360px; }
sl-color-picker, sl-color-picker::part(base) {
	box-shadow: none; }
sl-color-picker::part(swatches) { display: none; }`

@customElement("tab-colour-editor")
class _ele extends LitElement {
	@property({ reflect: true }) variant: keyof ThemeColours
	private key: keyof ColourRange = "Min"
	private themeProvider = new ThemeProvider(this)
	private pickerRef: Ref<SlColorPicker> = createRef()
	private getSelectedColour = () => {
		const colours = this.themeProvider.GetColoursVariant(this.variant)
		const selectedColour = colours[this.key]
		const format = this.pickerRef.value?.format ?? "hsl"
		return format === "hex" ? selectedColour.hex()
			: format === "rgb" ? toStringRgb(selectedColour)
			: ToStringHslCommas(selectedColour)
	}
	private editColour() {
		const oldValue = this.getSelectedColour()
		const newValue = this.pickerRef.value!.value
		// Setting the value of sl-color-picker triggers change without equality check
		if (newValue === oldValue) { return }
		this.themeProvider.SetColoursVariant(
			this.variant, this.key, chroma.color(newValue))
		this.requestUpdate()
	}
	private editKey(key: keyof ColourRange) {
		this.key = key
		this.requestUpdate()
	}
	// sl-color-picker overrides the initial value with white
	// Need to use the 'live' directive and reset the value on 2nd render
	protected override firstUpdated(_: any): void { this.requestUpdate() }
	static override get styles() { return [Shared, style] }
	override render() {
		const colours = this.themeProvider.GetColoursVariant(this.variant)
		const baseColours = Object.entries(colours).map(([k,c]) =>
			({ key: k as keyof ColourRange, Css: ToStringHsl(c), L: c.lch()[0] }))

		const value = this.getSelectedColour()
		const tokens = Tokenize(this.variant, colours)
		return html`
<div style="grid-column: 1 / span 3; display: flex; gap: 5px; width: 100%;">
	${Object.entries(tokens).map(([k,v]) => html`
	<div class="swatch" style="background: var(${k});">
		<sl-tooltip content="${toStringLchCommas(v)}" .distance=${0}>
			<div style="width: 100%; height: 100%;"></div>
		</sl-tooltip>
	</div>`)}
</div>

<sl-tab-group placement="start" ?invert-primary=${this.variant === "primary"}>
	${baseColours.map(({ key, Css, L }) => html`
	<sl-tab slot="nav"
		@click=${() => this.editKey(key)}>
		<div style="width: 100%; font-size: 1.2em; font-weight: 600; margin-right: 1rem;"
			>${this.getColourName(key)}
		</div>
		<sl-tag
			style="--background: ${Css}; --colour: ${L > 50.0 ? "black" : "white"};"
			variant="${this.variant}"
			size="medium"
			>${L.toFixed(1)}
		</sl-tag>
	</sl-tab>`)}
</sl-tab-group>

<sl-color-picker inline
	${ref(this.pickerRef)}
	@sl-change=${() => this.editColour()}
	format="hsl" .value=${live(value)}
></sl-color-picker>

<div style="white-space: nowrap;">
	${Object.values(tokens).map(c => html`
	<div style="font-weight: 600;">${ToStringHsl((c as chroma.Color))};</div>`)}
</div>
`
	}
	private getColourName = (key: keyof ColourRange): string => {
		// TODO will soon remove this method
		// Will switch to this.themeProvider.GetMode
		const isLight = this.themeProvider.GetIsLight()
		switch (key) {
		case "Min": return isLight ? "Lightest" : "Darkest"
		case "C500": return "Button Hover"
		case "C600": return "Button"
		case "Max": return isLight ? "Darkest" : "Lightest"
		}
	}
}

const toStringLchCommas = (colour: chroma.Color) => {
	const [l,c,h] = colour.lch()
	return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}??)`
}

const toStringRgb = (c: chroma.Color) => {
	const [r,g,b] = c.rgb()
	return `rgb(${r}, ${g}, ${b})` }

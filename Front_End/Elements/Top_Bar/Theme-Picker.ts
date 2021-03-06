import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
import { Shared, StyleToggleBtn } from "Elements/Style.js"
import { ThemeMode, ThemeProvider } from "Providers/Theme.js"

@customElement("theme-picker-dropdown")
export class ThemePickerDropdown extends LitElement {
	private theme = new ThemeProvider(this)
	static override get styles() { return [Shared] }
	override render = () => html`
<sl-dropdown>
	<sl-button slot="trigger"
		>${this.theme.GetLabel()}
		<sl-icon slot="suffix" name="caret-down-fill"></sl-icon>
	</sl-button>
	<sl-menu
		@sl-select=${(e: any) => this.theme.SetTheme(e.detail.item.theme)}>
		${this.theme.GetThemeOptions().map(o => html`
		<sl-menu-item ?checked=${o.Label === this.theme.GetLabel()}
			.theme="${o}"
			>${o.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`
}

@customElement("theme-picker-switch")
class _themeModeSwitch extends LitElement {
	private themeProvider = new ThemeProvider(this)
	static override get styles() { return [Shared, StyleToggleBtn] }
	override render() {
		const mode = this.themeProvider.GetMode()
		return html`
<sl-button-group>
	<sl-button variant="default"
		?selected=${mode === ThemeMode.Light}
		@click=${() => this.themeProvider.SetMode(ThemeMode.Light)}
		><sl-icon name="sun"></sl-icon>
	</sl-button>
	<sl-button variant="default"
		?selected=${mode === ThemeMode.Dark}
		@click=${() => this.themeProvider.SetMode(ThemeMode.Dark)}
		><sl-icon name="moon"></sl-icon>
	</sl-button>
</sl-button-group>`
	}
}

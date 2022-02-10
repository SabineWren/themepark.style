type Colour = import("chroma.ts").Color

type TupleTriple = [number, number, number]
type ColourPlaceholder = string | Colour
type BoxShadow = { XYBlurSpread: string; Colour: ColourPlaceholder }
type ColourTokenValue = BoxShadow | ColourPlaceholder
type ThemeColourTokens = { [k: string]: Colour }

type SemanticColoursTuple = readonly ["primary", "success", "neutral", "warning", "danger"]
type ButtonVariant = SemanticColoursTuple[number]

/* Stylesheet has 3 parts:
 * 1. Body css, which normally sets text colour and page background
 * 2. Theme colours that apply to root, body, and host
 * 3. Platform-supplied shared css (ex. Shoelace tokens)
 * This probably isn't a good API, as theme implementors shouldn't
 * need to care about platform tokens. They will need to override
 * component parts as well.
*/

type ThemeSpecification = {
	// Used to style component parts. Platform-specific.
	ComponentPartsCss: import("lit").CSSResult

	ContrastBody: | 0 | 50 | 100 | 200
	ContrastPanel: | 0 | 50 | 100 | 200
	// Dark themes usually prefer lower values to prevent light bleed
	ContrastText: | 800 | 900 | 950 | 1000

	// Name in kebab-case. Use prefixes to guarantee uniqueness.
	// ex. Nord Dark for Shoelace: sl-nord-polar-night
	CssName: string

	// Light and Dark modes show different dropdowns for theme selection
	IsLight: boolean

	// Name user sees in theme-picker dropdown.
	Label: string

	// Defines the theme implementation.
	// Theme Park interpolates using LCH, then clamps to sRGB.
	// Defaults to grey if not supplied
	TokensColourTheme: ThemeColours

	// Placeholder type until I can refactor everything out.
	// These may be modified by themes, but not in real time via GUI.
	TokensShoelace: ThemeTokensShoelaceStatic
}

// Light theme order: Light -> Dark
// Dark theme order: Dark -> Light
type ColourRange = {
	Min: Colour
	C500: Colour
	C600: Colour
	Max: Colour
}
type ThemeColours = {
	danger: ColourRange
	neutral: ColourRange
	primary: ColourRange
	success: ColourRange
	warning: ColourRange
}
type ThemeTokensShoelaceStatic = {
	// Elevations (box shadows)
	"--sl-shadow-x-small": BoxShadow
	"--sl-shadow-small": BoxShadow
	"--sl-shadow-medium": BoxShadow
	"--sl-shadow-large": BoxShadow
	"--sl-shadow-x-large": BoxShadow

	// *** Forms ***
	"--sl-focus-ring": BoxShadow

	// Overlays
	"--sl-overlay-background-color": ColourPlaceholder

	/*
	"--sl-input-background-color": ColourPlaceholder
	"--sl-input-background-color-hover": ColourPlaceholder
	"--sl-input-background-color-focus": ColourPlaceholder
	"--sl-input-background-color-disabled": ColourPlaceholder
	"--sl-input-border-color": ColourPlaceholder
	"--sl-input-border-color-hover": ColourPlaceholder
	"--sl-input-border-color-focus": ColourPlaceholder
	"--sl-input-border-color-disabled": ColourPlaceholder

	"--sl-input-color": ColourPlaceholder
	"--sl-input-color-hover": ColourPlaceholder
	"--sl-input-color-focus": ColourPlaceholder
	"--sl-input-color-disabled": ColourPlaceholder
	"--sl-input-icon-color": ColourPlaceholder
	"--sl-input-icon-color-hover": ColourPlaceholder
	"--sl-input-icon-color-focus": ColourPlaceholder
	"--sl-input-placeholder-color": ColourPlaceholder
	"--sl-input-placeholder-color-disabled": ColourPlaceholder

	"--sl-input-filled-background-color": ColourPlaceholder
	"--sl-input-filled-background-color-hover": ColourPlaceholder
	"--sl-input-filled-background-color-focus": ColourPlaceholder
	"--sl-input-filled-background-color-disabled": ColourPlaceholder
	"--sl-input-filled-color": ColourPlaceholder
	"--sl-input-filled-color-hover": ColourPlaceholder
	"--sl-input-filled-color-focus": ColourPlaceholder
	"--sl-input-filled-color-disabled": ColourPlaceholder

	// can default to var(--sl-color-neutral-500)
	"--sl-input-help-text-color": ColourPlaceholder

	// Tooltips
	"--sl-tooltip-background-color": ColourPlaceholder
	"--sl-tooltip-color": ColourPlaceholder
	*/
}

type ThemeTokensShoelace = ThemeColourTokens & ThemeTokensShoelaceStatic

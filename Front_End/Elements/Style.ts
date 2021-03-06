import { css } from "lit"

export const Shared = css`
* {
	/* SVG icons TODO move to theme
	* https://shoelace.style/components/icon?id=icon-libraries
	* We set it here so we can override it later with a gradient URL as needed.
	* Only used if explicitly set by the app when registering icon libraries */
	--icon-gradient-start: var(--sl-color-primary-400);
	--icon-gradient-end: var(--sl-color-primary-800);
	--icon-fill: currentColor;
	--icon-fill: url(#global-svg-gradient);

	--sl-transition-medium: 200ms;
}

* { box-sizing: border-box; }

h1, h2, h3, h4, p {
	margin: 0;
	margin-bottom: 0.5rem; }
p:last-child {
	margin-bottom: 0; }

sl-dropdown sl-button sl-icon[slot="suffix"] {
	font-size: 1rem;
	transition: var(--sl-transition-medium) transform ease; }
sl-dropdown[disabled] sl-button sl-icon[slot="suffix"] {
	display: none; }
sl-dropdown[open] sl-button sl-icon[slot="suffix"] {
  transform: rotate(-180deg); }

sl-dropdown sl-menu-item::part(label) {
	width: max-content;
	max-width: 35rem;
	white-space: normal;
	font-size: 0.9rem; }

sl-dropdown sl-menu-item::part(base) {
	--sl-color-neutral-700: var(--sl-color-neutral-900); }
sl-dropdown sl-menu-item[checked]::part(label) {
	--sl-color-neutral-700: var(--sl-color-neutral-1000);
	font-weight: bold; }

/* TODO move to theme :host css */
sl-button:not([variant="default"]) sl-icon {
	--icon-fill: currentColor;
}
`

export const StyleToggleBtn = css`
.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	user-select: none;
}
/* Puts focus ring (border) above other buttons when selected */
sl-button[selected] { z-index: 3; }
sl-button[selected]::part(base) {
	border-color: var(--sl-color-primary-200);
	box-shadow: 0 0 10px 4px var(--sl-color-primary-100) inset; }
sl-button[selected]:hover::part(base) {
	border-color: var(--sl-color-primary-300);
	box-shadow: 0 0 10px 6px var(--sl-color-primary-100) inset; }
`

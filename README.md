## Theme Park
A pre-alpha app for creating GUI themes and exporting them to a target platform. Currently supports Shoelace as the only platform target, but may eventually work more broadly.

### TODO 1 - Gradients and Shadows
- Add sample components that use drop shadows or gradients
- Add gradient selection library
- Expand theme API to include dropshadows, including gradients
- Apply gradients to header/icons/bold/shadows using switches
- Build gradient importer; Recommend tools like [cssgradient.io](https://cssgradient.io/)

### TODO 2 - Cards
- Finalize list of card variants: subtle, outline, decorative
- Finalize list of card states: none, dragging, dragover, active
- Add preview for all card variants/states
- Add tooling to customize each state and variant
- Build a library of decorative card backgrounds

### TODO 3 - MVP
- Implement save/load raw theme spec
- Logo for `<meta property="og:image" content="">`

## Building
1. `npm install`
2. `npm run <script>` See package.json for scripts to run
3. Run a local server, ex. `cd Web_Root && php -S localhost:5000`
4. Load at localhost:5000/dist/index.html

## Problem
Apps document themes through a set of Design Tokens, typically CSS Custom Properties or JSON key-value pairs. Applying third party themes requires sharing tokens, but each design system uses different tokens.

Existing theme specification systems like [Style Dictionary](https://amzn.github.io/style-dictionary/) and [Theo](https://github.com/salesforce-ux/theo) define all the styling for apps, including sizing and spacing. That's because they're not meant for 3rd party replacement, and overriding stylesheets with 3rd party themes can [break apps](https://stopthemingmy.app/).

## Goal
Build **[all the themes](#themes-first-pass)**, bridging the gap between theme designers and app developers. Let users choose their preferred theme across multiple apps.

## Objectives
Provide a huge variety of themes to apps:
1. Define a theme format algorithmically mappable to multiple platforms.
2. Provide a GUI to theme designers for specifying themes.
3. Compile themes to CSS for [Shoelace](https://github.com/shoelace-style/shoelace).
4. Implement **[all the themes](#themes-first-pass)**.

Fonts, spacing, and icons are not in scope for Theme Park. The web already has fantastic support for including 3rd party fonts and icons in your apps, and applying a theme should never break an app.

Theme Park generates themes on-the-fly, but downstream apps will need pre-generated themes and a theme-picker element that code-splits them. App developers will eventually need a portable theme-picker element, complete with code splitting and persistence.

## Constraints
Some themes have complex backgrounds, such as SVG images or gradients. The API should use a [DDD](https://fsharpforfunandprofit.com/ddd/) type system to prevent broken results like `color: transparent;` without a corresponding `background-clip: text;`.

Shoelace requires more colour shades than themes supply as tokens, which requires interpolating colours. Theme Park uses Chroma.ts to [interpolate colours in LCH](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/#2-lch-and-lab-is-perceptually-uniform), and then uses code adapted from Color.js to map the result to sRGB colour space. Once web browsers and the colour picker support LCH, sRGB clamping will become optional.

### Themes First Pass
1. [Nord](https://nordtheme.com) Polar Night (dim), Snow Storm (light)
2. Vampire (dark) variants: purple, pink, cyan, yellow, red, black

#### Possible Future Themes
[Midnight](https://github.com/i-mint/midnight) GNOME theme with 12 accent colour variants

[Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) dark, dim, and light and [unofficial variant](https://github.com/huytd/vscode-tokyo-city) with reduced saturation

[Embark](https://embark-theme.github.io) is similar to vampire, but the palette offers both saturated and pastel colours. Technically has a Firefox port, although I'm still classifying it as an IDE theme due to limited GUI examples.

[Solarized](https://ethanschoonover.com/solarized/#usage-development) sepia, dim

[Gruvbox](https://github.com/morhetz/gruvbox) dark, sepia

[Gruvbox Material](https://github.com/sainnhe/gruvbox-material) palette swap with reduced saturation: dark, sepia

[Gruvbox Srcery](https://srcery-colors.github.io/) palette swap with increased saturation: dark

[Pinkmare](https://github.com/Matsuuu/pinkmare) dark. Pastel hues of red/pink/purple

[Everforest](https://github.com/sainnhe/everforest) sepia, dim. Green pastel (see its inspirations as well)

[Miramare](https://github.com/franbach/miramare) merges Everforest with Gruvbox, and in turn inspired Pinkmare

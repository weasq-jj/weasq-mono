# weasq-ui assets

- `logo/`: global brand assets (for example `logo-weasq.svg`)
- `icons/raw/`: source minified SVG icons to be packed into a sprite
- `icons/sprite.svg`: generated spritemap (run `pnpm --filter @weasq/weasq-ui icons:build`)

## Icon workflow

1. Add new SVGs to `icons/raw/`.
2. Run `pnpm --filter @weasq/weasq-ui icons:build`.
3. Use symbols via `<use href="/icons/sprite.svg#icon-your-name" />` or the `Icon` component.

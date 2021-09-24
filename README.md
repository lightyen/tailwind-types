# tailwind-types

Type declarations of Tailwind

## Install

```sh
npm install --save-dev tailwind-types
```

## Examples

- JavaScript

```js
// tailwind.config.js

/** @typedef {import("tailwind-types")} */

const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

/** @type {Tailwind.ConfigJS} */
module.exports = {
	theme: {
		extend: {
			colors,
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			//
		}),
	],
}
```

- TypeScript

```ts
// typings/demo.d.ts

/// <reference types="tailwind-types" />
```

```ts
// demo.ts

import colors from "tailwindcss/colors"

const config: Tailwind.ConfigJS = {
	theme: {
		extend: {
			colors,
		}
	}
}
```

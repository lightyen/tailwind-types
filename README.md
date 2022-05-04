# tailwind-types

[npm:latest]: https://www.npmjs.com/package/tailwind-types/v/latest
[npm:latest:badge]: https://img.shields.io/npm/v/tailwind-types/latest?style=flat-square

[![Latest Version][npm:latest:badge]][npm:latest]

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

export default {
	theme: {
		extend: {
			colors,
		}
	}
} as Tailwind.ConfigJS
```

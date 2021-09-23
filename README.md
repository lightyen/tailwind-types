# tailwind-types

Type declarations of Tailwind

## Install

```sh
npm install --save-dev tailwind-types
```

## Examples

**tailwind.config.js**:

```js
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

**demo.ts**:

```ts

import "tailwind-types"
import colors from "tailwindcss/colors"

const config: Tailwind.ConfigJS = {
	theme: {
		extend: {
			colors,
		}
	}
}
```

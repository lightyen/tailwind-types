const postcss = require("postcss")
const tailwindcss = require("tailwindcss")
const resolveConfig = require("tailwindcss/resolveConfig")
const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")
const defaultConfig = require("tailwindcss/defaultConfig")
const defaultTheme = require("tailwindcss/defaultTheme")

delete colors.lightBlue

/** @type {Tailwind.ConfigJS} */
const config = {
	theme: {
		opacity: {
			10: 0.1,
		},
		extend: {
			borderColor: theme => ({
				DEFAULT: theme("colors.gray.300", "currentColor"),
			}),
			colors: () => {
				return {
					custom: ({ opacityValue }) => {
						return `rgba(217, 245, 56, ${opacityValue})`
					},
				}
			},
			fill: {
				red: "red",
			},
			content: {
				DEFAULT: "''",
			},
		},
	},
}

/**
 * @param {string[]} classNames
 * @return {Promise<import("postcss").Result>} result
 */
async function jit(...classNames) {
	classNames = classNames.map(c => c.replace(/\s/g, ""))
	config.mode = "jit"
	config.purge = { content: [] }
	config.purge.safelist = classNames
	const processer = postcss([tailwindcss(config)])
	return processer.process("@tailwind components;@tailwind utilities;", {})
}

async function run() {
	const result = await jit(
		"grid-cols-[linear]",
		"leading-[1]",
		"animate-[black]",
	)
	console.log(result.content)
}

// run()

const resolved = resolveConfig(config)

console.log(defaultConfig.theme.aspectRatio)
console.log(Object.keys(colors))

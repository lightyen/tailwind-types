import postcss, { Result } from "postcss"
import tailwindcss = require("tailwindcss")
import resolveConfig = require("tailwindcss/resolveConfig")
import colors = require("tailwindcss/colors")
import plugin = require("tailwindcss/plugin")

delete colors.lightBlue

const config: Tailwind.ConfigJS = {
	theme: {
		extend: {
			colors: {
				...colors,
				custom: ({ opacityValue }) => {
					return `rgba(217, 245, 56, ${opacityValue})`
				},
			},
		},
	},
	plugins: [
		plugin(
			function ({ addUtilities, theme, variants }) {
				addUtilities(
					Object.fromEntries(
						Object.entries(theme("testPlugin")).map(([k, v]) => [
							`.test-${k}`,
							{ testProperty: v },
						]),
					) as any,
					variants("testPlugin" as any),
				)
			},
			{
				theme: {
					testPlugin: {
						sm: "1rem",
						md: "2rem",
						lg: "3rem",
					},
				},
			},
		),
	],
}

async function jit(...classNames: string[]): Promise<Result> {
	classNames = classNames.map(c => c.replace(/\s/g, ""))
	config.mode = "jit"
	config.purge = { content: [] }
	config.purge.safelist = classNames
	const processer = postcss([tailwindcss(config)])
	return processer.process("@tailwind components;@tailwind utilities;", {})
}

async function run() {
	const result = await jit("border-t-custom/30", "object-[50%,50%]")
}

run()

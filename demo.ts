import postcss, { Result } from "postcss"
import tailwindcss from "tailwindcss"
import resolveConfig from "tailwindcss/resolveConfig"
import colors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"
import {
	applyStateToMarker,
	transformAllClasses,
	transformAllSelectors,
	transformLastClasses,
	updateAllClasses,
	updateLastClasses,
} from "tailwindcss/lib/util/pluginUtils"

import expandApplyAtRules from "tailwindcss/lib/lib/expandApplyAtRules"
import prefixSelector from "tailwindcss/lib/util/prefixSelector"

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
	config.purge = { content: [] }
	config.purge.safelist = classNames
	const processer = postcss([tailwindcss(config)])
	return processer.process("@tailwind components;@tailwind utilities;", {})
}

async function run() {
	const result = await jit("border-t-custom/30", "object-[50%,50%]")
}

run()

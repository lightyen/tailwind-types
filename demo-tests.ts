import postcss, { Result } from "postcss"
import tailwindcss from "tailwindcss"
import resolveConfig from "tailwindcss/resolveConfig"
import colors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"

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
		plugin(({ addUtilities }) => {
			addUtilities({
				".abcde": {
					width: 10,
				},
			})
		}),
	],
}

async function jit(...classNames: string[]): Promise<Result> {
	classNames = classNames.map(c => c.replace(/\s/g, ""))
	config.mode = "jit"
	config.purge = { content: [] }
	config.purge.safelist = classNames
	const processer = postcss([tailwindcss(config)])
	return processer.process("@tailwind components;@tailwind utilities;", {
		from: undefined,
	})
}

async function run() {
	const result = await jit("border-t-custom/30", "object-[50%,50%]")
}

run()

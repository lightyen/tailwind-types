import postcss, { Result } from "postcss"
import tailwindcss from "tailwindcss"
import resolveConfig from "tailwindcss/resolveConfig"
import colors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"
import { updateAllClasses } from "tailwindcss/lib/util/pluginUtils"
import selectorParser from "postcss-selector-parser"
import expandApplyAtRules from "tailwindcss/lib/lib/expandApplyAtRules"
import prefixSelector from "tailwindcss/lib/util/prefixSelector"

delete colors.lightBlue

const config: Tailwind.ConfigJS = {
	theme: {
		extend: {
			container: {
				padding: { sm: 123 },
			},
			colors: {
				...colors,
				custom: ({ opacityValue }) => {
					return `rgba(217, 245, 56, ${opacityValue})`
				},
			},
		},
	},
	plugins: [
		{
			handler({ addUtilities, theme }) {
				addUtilities(
					Object.fromEntries(
						Object.entries(theme("testPlugin")).map(([k, v]) => [
							`.test-${k}`,
							{ testProperty: v },
						]),
					) as Tailwind.Styles,
				)
			},
			config: {
				theme: {
					testPlugin: {
						sm: "1rem",
						md: "2rem",
						lg: "3rem",
					},
				},
			},
		},
		plugin(
			function ({ addUtilities, theme }) {
				addUtilities(
					Object.fromEntries(
						Object.entries(theme("testPlugin")).map(([k, v]) => [
							`.test-${k}`,
							{ testProperty: v },
						]),
					) as Tailwind.Styles,
				)
				addUtilities({ color: "red" })
				addUtilities([{ color: "red" }])
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
		function ({ matchUtilities, matchComponents, matchVariant, theme, e }) {
			matchUtilities({
				tab(value) {
					return {
						tabSize: value,
					}
				},
			})
			matchComponents(
				{
					test(value) {
						return {
							"&.test": {
								backgroundColor: value,
							},
						}
					},
				},
				{ values: theme("colors.cyan") },
			)
			matchComponents({
				card: value => {
					return [
						{ color: value },
						{
							".card-header": {
								borderTopWidth: 3,
								borderTopColor: value,
							},
						},
						{
							".card-footer": {
								borderBottomWidth: 3,
								borderBottomColor: value,
							},
						},
					]
				},
			})
			matchVariant({
				tab(value) {
					if (value == null) return "& > *"
					return `&.${e(value ?? "")} > *`
				},
			})
		},
		function ({ addVariant }) {
			addVariant("test", "&::test")
			addVariant("test", ["& *::test", "&::test"])
		},
		function ({ addVariant }) {
			addVariant("test", () => "& *::test")
			addVariant("test", () => ["& *::test", "&::test"])
			addVariant("before", ({ container }) => {
				container.walkRules(rule => {
					let foundContent = false
					rule.walkDecls("content", () => {
						foundContent = true
					})

					if (!foundContent) {
						rule.prepend(
							postcss.decl({
								prop: "content",
								value: "var(--tw-content)",
							}),
						)
					}
				})

				return "&::before"
			})
			addVariant(
				"foo",
				({ container }) => {
					container.walkRules(rule => {
						rule.selector = `.foo\\:${rule.selector.slice(1)}`
						rule.walkDecls(decl => {
							decl.important = true
						})
					})
				},
				{ before: "sm" },
			)
			addVariant("foo", ({ modifySelectors, separator }) => {
				if (!modifySelectors) return
				modifySelectors(({ selector }) => {
					return selectorParser(selectors => {
						selectors.walkClasses(classNode => {
							classNode.value = `foo${separator}${classNode.value}`
							classNode.parent?.insertBefore(
								classNode,
								selectorParser().astSync(`.foo `),
							)
						})
					}).processSync(selector)
				})
			})
		},
		({ addUtilities, addDefaults }) => {
			addDefaults("my-type", {
				"--my-var": "proximity",
			})

			addUtilities({
				".my-none": { "my-type": "none" },
				".my-x": {
					"@defaults my-type": {},
					"my-type": "x var(--my-var)",
				},
			})
		},
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

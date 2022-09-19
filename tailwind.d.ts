// Type definitions for tailwindcss v3
// Project: https://github.com/tailwindlabs/tailwindcss
// Definitions by: lightyen <https://github.com/lightyen>

/// <reference path="base.d.ts" />
/// <reference path="colors.d.ts" />
/// <reference path="features.d.ts" />
/// <reference path="theme.d.ts" />
/// <reference path="plugin.d.ts" />

declare namespace Tailwind {
	interface ConfigJS extends StrictConfigJS, ConfigObject {}

	interface StrictConfigJS extends OtherConfigJS {
		presets?: (ConfigJS | PresetFunction)[]
		theme?: Theme & CustomTheme & ConfigObject
		plugins?: Plugin[]
		darkMode?: "media" | "class" | ["class", string]
		corePlugins?:
			| Partial<CorePluginFeatures>
			| Array<keyof CorePluginFeatures>
		separator?: string
		prefix?: string
		important?: boolean | string
	}

	interface ResolvedConfigJS extends StrictResolvedConfigJS, ConfigObject {}

	interface StrictResolvedConfigJS extends OtherConfigJS {
		presets: ConfigJS[]
		separator: string
		prefix: string
		important: boolean
		darkMode: "media" | "class" | ["class", string]
		plugins: (
			| UserPluginObject
			| UserPluginFunction
			| UserPluginFunctionWithOption
		)[]
		theme: ResolvedTheme & ConfigObject
	}

	interface PresetFunction {
		(): ConfigJS
	}

	interface Extractor {
		(content: string): RegExpMatchArray | null
	}

	type Extractors =
		| Extractor
		| (Partial<{ DEFAULT: Extractor }> & Record<string, Extractor>)

	type SafeList = Array<string | { pattern: RegExp; variants?: string[] }>

	interface Transformer {
		(content: string): string
	}

	type Transformers =
		| Transformer
		| (Partial<{ DEFAULT: Transformer }> & Record<string, Transformer>)

	/** @deprecated */
	interface PurgeConfig extends ConfigObject {
		mode?: "all"
		content?: Content
		transform?: Transformers & ConfigEntry
		preserveHtmlElements?: boolean
		layers?: Array<"base" | "components" | "utilities">
		enabled?: boolean
		safelist?: SafeList & ConfigEntry
		extract?: Extractors
		options?: ConfigEntry
	}

	type Content = Array<string | { raw: string }>

	interface ContentConfig extends ConfigObject {
		content?: Content
		files?: Content
		transform?: Transformers & ConfigEntry
		extract?: Extractors
		safelist?: SafeList & ConfigEntry
		options?: ConfigEntry
	}

	type Variant =
		| "first-letter"
		| "first-line"
		| "marker"
		| "selection"
		| "file"
		| "before"
		| "after"
		| "first"
		| "last"
		| "only"
		| "odd"
		| "even"
		| "first-of-type"
		| "last-of-type"
		| "only-of-type"
		| "visited"
		| "target"
		| "open"
		| "default"
		| "checked"
		| "indeterminate"
		| "placeholder-shown"
		| "autofill"
		| "required"
		| "valid"
		| "invalid"
		| "in-range"
		| "out-of-range"
		| "read-only"
		| "empty"
		| "focus-within"
		| "hover"
		| "focus"
		| "focus-visible"
		| "active"
		| "disabled"
		| "group-first"
		| "group-last"
		| "group-only"
		| "group-odd"
		| "group-even"
		| "group-first-of-type"
		| "group-last-of-type"
		| "group-only-of-type"
		| "group-visited"
		| "group-target"
		| "group-open"
		| "group-default"
		| "group-checked"
		| "group-indeterminate"
		| "group-placeholder-shown"
		| "group-autofill"
		| "group-required"
		| "group-valid"
		| "group-invalid"
		| "group-in-range"
		| "group-out-of-range"
		| "group-read-only"
		| "group-empty"
		| "group-focus-within"
		| "group-hover"
		| "group-focus"
		| "group-focus-visible"
		| "group-active"
		| "group-disabled"
		| "peer-first"
		| "peer-last"
		| "peer-only"
		| "peer-odd"
		| "peer-even"
		| "peer-first-of-type"
		| "peer-last-of-type"
		| "peer-only-of-type"
		| "peer-visited"
		| "peer-target"
		| "peer-open"
		| "peer-default"
		| "peer-checked"
		| "peer-indeterminate"
		| "peer-placeholder-shown"
		| "peer-autofill"
		| "peer-required"
		| "peer-valid"
		| "peer-invalid"
		| "peer-in-range"
		| "peer-out-of-range"
		| "peer-read-only"
		| "peer-empty"
		| "peer-focus-within"
		| "peer-hover"
		| "peer-focus"
		| "peer-focus-visible"
		| "peer-active"
		| "peer-disabled"
		| "ltr"
		| "rtl"
		| "motion-safe"
		| "motion-reduce"
		| "dark"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"

	interface OtherConfigJS {
		content?: Content | ContentConfig
		/** @deprecated */
		purge?: Content | PurgeConfig
		variantOrder?: Variant[]
		future?:
			| "all"
			| {
					hoverOnlyWhenSupported?: boolean
					respectDefaultRingColorOpacity?: boolean
			  }
		experimental?:
			| "all"
			| {
					optimizeUniversalDefaults?: boolean
					matchVariant?: boolean
			  }
	}
}

declare namespace Tailwind {
	type CandidateRule = [
		{
			sort: bigint
			layer: "base" | "components" | "utilities" | "user"
			options?: {
				values?: ConfigObject
				type?: ValueType | ValueType[]
				respectPrefix?: boolean
				respectImportant?: boolean
				supportsNegativeValues?: boolean
			}
		},
		(
			| import("postcss").Comment
			| import("postcss").Rule
			| import("postcss").AtRule
			| ((
					modifier: string,
					options: { isOnlyPlugin: boolean },
			  ) => Array<Record<string, Record<string, string>>>)
		),
	]

	interface Context {
		variantMap: Map<string, Array<[bigint, VariantFunc]>>
		getClassList(): string[]
		tailwindConfig: ResolvedConfigJS
		changedContent: Array<{ content: string; extension: string }>
		layerOrder: {
			base: bigint
			components: bigint
			utilities: bigint
			user: bigint
		}
		variantOrder: Map<string, bigint>
		minimumScreen: bigint
		candidateRuleMap: Map<string, CandidateRule[]>
		disposables: any
		stylesheetCache: any
		ruleCache: any
		classCache: any
		applyClassCache: any
		notClassCache: any
		postCssNodeCache: any
	}

	interface tailwindcss {
		(configOrPath?: ConfigJS | string): import("postcss").Plugin
	}

	interface resolveConfig {
		(...config: ConfigJS[]): ResolvedConfigJS
	}

	interface createContext {
		(
			config: ResolvedConfigJS,
			changedContent?: Array<{ content: string; extension: string }>,
			root?: import("postcss").Root,
		): Context
	}

	interface generateRules {
		(classnames: string[], context: Context): Array<
			[bigint, import("postcss").Rule]
		>
	}

	interface expandApplyAtRules {
		(context: Context): (root: import("postcss").Root) => void
	}

	interface updateClass {
		(
			classname: string,
			options: {
				withAttr?(className: string, attr: string): string
				withPseudo(className: string, pseudo: string): string
			},
		): string | null | undefined
	}

	interface transformOptions {
		wrap?(): import("postcss").Node
		withRule?(rule: import("postcss").Rule): void
	}

	interface pluginUtils {
		updateAllClasses(selectors: string, updateClass: updateClass): string
	}

	interface prefixSelector {
		(prefix: string, selector: string): string
	}
}

declare module "tailwindcss" {
	/**
	 * If param is not set, Tailwind will look for an optional `tailwind.config.js` file at
	 * the root of your project where you can define any customizations.
	 */
	function tailwindcss(
		configOrPath?: Tailwind.ConfigJS | string | undefined,
	): import("postcss").Plugin
	export = tailwindcss
}

declare module "tailwindcss/colors" {
	const colors: Tailwind.DefaultColors
	export = colors
}

declare module "tailwindcss/colors.js" {
	const colors: Tailwind.DefaultColors
	export = colors
}

declare module "tailwindcss/defaultConfig" {
	const config: Tailwind.ConfigJS
	export = config
}

declare module "tailwindcss/defaultConfig.js" {
	const config: Tailwind.ConfigJS
	export = config
}

declare module "tailwindcss/defaultTheme" {
	const theme: Tailwind.Theme & Tailwind.CustomTheme & Tailwind.ConfigObject
	export = theme
}

declare module "tailwindcss/defaultTheme.js" {
	const theme: Tailwind.Theme & Tailwind.CustomTheme & Tailwind.ConfigObject
	export = theme
}

declare module "tailwindcss/resolveConfig" {
	/** Generate a fully merged version of configuration. */
	function resolveConfig(
		...config: Tailwind.ConfigJS[]
	): Tailwind.ResolvedConfigJS
	export = resolveConfig
}

declare module "tailwindcss/resolveConfig.js" {
	/** Generate a fully merged version of configuration. */
	function resolveConfig(
		...config: Tailwind.ConfigJS[]
	): Tailwind.ResolvedConfigJS
	export = resolveConfig
}

declare module "tailwindcss/plugin" {
	const createPlugin: Tailwind.CreatePlugin
	export = createPlugin
}

declare module "tailwindcss/plugin.js" {
	const createPlugin: Tailwind.CreatePlugin
	export = createPlugin
}

declare module "tailwindcss/lib/util/resolveConfig" {
	function resolveConfig(
		configs: Tailwind.ConfigJS[],
	): Tailwind.ResolvedConfigJS
	export = resolveConfig
}

declare module "tailwindcss/lib/util/resolveConfig.js" {
	function resolveConfig(
		configs: Tailwind.ConfigJS[],
	): Tailwind.ResolvedConfigJS
	export = resolveConfig
}

declare module "tailwindcss/lib/corePluginList" {
	const corePluginList: Array<keyof Tailwind.CorePluginFeatures>
	export default corePluginList
}

declare module "tailwindcss/lib/corePluginList.js" {
	const corePluginList: Array<keyof Tailwind.CorePluginFeatures>
	export default corePluginList
}

declare module "tailwindcss/lib/util/pluginUtils" {
	export function updateAllClasses(
		selectors: string,
		updateClass: Tailwind.updateClass,
	): string
}

declare module "tailwindcss/lib/util/pluginUtils.js" {
	export function updateAllClasses(
		selectors: string,
		updateClass: Tailwind.updateClass,
	): string
}

declare module "tailwindcss/lib/util/prefixSelector" {
	export default function prefixSelector(
		prefix: string,
		selector: string,
	): string
}

declare module "tailwindcss/lib/util/prefixSelector.js" {
	export default function prefixSelector(
		prefix: string,
		selector: string,
	): string
}

declare module "tailwindcss/lib/lib/setupContextUtils" {
	export function createContext(
		config: Tailwind.ResolvedConfigJS,
		changedContent?:
			| Array<{ content: string; extension: string }>
			| undefined,
		root?: import("postcss").Root | undefined,
	): Tailwind.Context
}

declare module "tailwindcss/lib/lib/setupContextUtils.js" {
	export function createContext(
		config: Tailwind.ResolvedConfigJS,
		changedContent?:
			| Array<{ content: string; extension: string }>
			| undefined,
		root?: import("postcss").Root | undefined,
	): Tailwind.Context
}

declare module "tailwindcss/lib/lib/generateRules" {
	export function generateRules(
		classnames: string[],
		context: Tailwind.Context,
	): Array<[bigint, import("postcss").Rule]>
}

declare module "tailwindcss/lib/lib/generateRules.js" {
	export function generateRules(
		classnames: string[],
		context: Tailwind.Context,
	): Array<[bigint, import("postcss").Rule]>
}

declare module "tailwindcss/lib/lib/expandApplyAtRules" {
	function expandApplyAtRules(
		context: Tailwind.Context,
	): (root: import("postcss").Root) => void
	export = expandApplyAtRules
}

declare module "tailwindcss/lib/lib/expandApplyAtRules.js" {
	function expandApplyAtRules(
		context: Tailwind.Context,
	): (root: import("postcss").Root) => void
	export = expandApplyAtRules
}

declare module "tailwindcss/lib/util/escapeClassName" {
	function escapeClassName(classname: string): string
	export = escapeClassName
}

declare module "tailwindcss/lib/util/escapeClassName.js" {
	function escapeClassName(classname: string): string
	export = escapeClassName
}

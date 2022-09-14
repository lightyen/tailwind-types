// Type definitions for tailwindcss v3
// Project: https://github.com/tailwindlabs/tailwindcss
// Definitions by: lightyen <https://github.com/lightyen>

/// <reference path="colors.d.ts" />
/// <reference path="features.d.ts" />
/// <reference path="theme.d.ts" />

declare namespace Tailwind {
	type CSSValue = string | number

	type CSSTYPE = import("csstype").Properties<CSSValue>

	interface DefinedCSSProperties extends Customized, CSSTYPE {}

	interface CSSProperties extends Customized {
		[key: string | symbol]: CSSProperties | DefinedCSSProperties | CSSValue
	}

	type Styles = CSSProperties | import("postcss").Node

	type Primitive =
		| string
		| bigint
		| number
		| boolean
		| symbol
		| null
		| undefined

	interface Func {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(...args: any): any
	}

	type ConfigValue = Func | Primitive

	interface ConfigObject {
		[key: string]: ConfigEntry
	}

	type ConfigArray = Array<ConfigEntry>

	type ConfigEntry = ConfigValue | ConfigArray | ConfigObject

	interface ConfigUtils {
		colors: DefaultColors
		negative<T extends Record<string, string>>(
			value: T,
		): { [P in keyof T]: `-${T[P]}` }
		breakpoints<T extends Record<string, unknown>>(
			value: T,
		): { [K in keyof T as `screen-${string & K}`]: T[K] }
	}

	interface ResolvePath {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(path: string, defaultValue?: unknown): any
	}

	interface ResolveThemePath extends ResolvePath, ConfigUtils {
		theme: ResolvePath
	}

	type WithResolveThemePath<T> =
		| T
		| ((theme: ResolveThemePath, utils: ConfigUtils) => T)

	interface CustomPalette {
		[key: string | symbol]: ColorValue
	}

	interface ColorValueFunc {
		(options: {
			/** ex: `var(--tw-text-opacity)` */
			opacityValue?: string
			/** ex: `--tw-text-opacity` */
			opacityVariable?: string
		}): string
	}

	type ColorValue = ColorValueFunc | CustomPalette | string

	interface BaseColors {
		inherit?: ColorValue
		current?: ColorValue
		transparent?: ColorValue
		black?: ColorValue
		white?: ColorValue
		slate?: ColorValue
		gray?: ColorValue
		zinc?: ColorValue
		neutral?: ColorValue
		stone?: ColorValue
		red?: ColorValue
		orange?: ColorValue
		amber?: ColorValue
		yellow?: ColorValue
		lime?: ColorValue
		green?: ColorValue
		emerald?: ColorValue
		teal?: ColorValue
		cyan?: ColorValue
		sky?: ColorValue
		blue?: ColorValue
		indigo?: ColorValue
		violet?: ColorValue
		purple?: ColorValue
		fuchsia?: ColorValue
		pink?: ColorValue
		rose?: ColorValue
	}

	type Palette<T extends Record<string | symbol, unknown> = {}> = {
		[key: string | symbol]: ColorValue
	} & BaseColors & { [P in keyof T]?: ColorValue }

	type WithResolvePathPalette<
		T extends Record<string | symbol, unknown> = {},
	> = WithResolveThemePath<
		{
			[key: string | symbol]: ColorValue
		} & BaseColors & { [P in keyof T]?: ColorValue }
	>

	type CoreThemeObject<
		T extends Record<string | symbol, unknown> = {},
		V = ConfigEntry,
	> = WithResolveThemePath<
		{
			[key: string | symbol]: V
		} & {
			[P in keyof T]?: V
		}
	>

	interface UserPluginFunction {
		(options: UserPluginOptions): void
	}

	interface UserPluginObject {
		handler?: UserPluginFunction
		config?: ConfigJS
		name?: string
		[key: string | symbol]: ConfigEntry
	}

	interface UserPluginFunctionWithOption<Options = unknown> {
		(options?: Options): UserPluginObject
	}

	type Plugin = UserPluginObject | UserPluginFunction

	interface Customized {
		[key: string | symbol]: ConfigEntry
	}

	type ValueType =
		| "any"
		| "color"
		| "url"
		| "image"
		| "length"
		| "percentage"
		| "position"
		| "lookup"
		| "generic-name"
		| "family-name"
		| "number"
		| "line-width"
		| "absolute-size"
		| "relative-size"
		| "shadow"

	interface AddOption {
		respectPrefix?: boolean
		respectImportant?: boolean
	}

	interface MatchOption {
		values?: ConfigObject
		type?: ValueType | ValueType[]
		supportsNegativeValues?: boolean
		filterDefault?: boolean
		respectPrefix?: boolean
		respectImportant?: boolean
	}

	interface Generator {
		(options: {
			container: import("postcss").Root
			separator: string
			// Private API
			wrap?(node: import("postcss").AtRule): void
			format?(selectorFormat: string): void
			modifySelectors?(
				modifierFunction: (payload: {
					get className(): string
					selector: string
				}) => string,
			): import("postcss").Root
		}): any
	}

	interface UserPluginOptions {
		addDefaults(
			group: string,
			declarations: Record<string, string | string[]>,
		): void

		/** Register new base styles. */
		addBase(bases: Styles | Styles[]): void

		/** Register new utilities. */
		addUtilities(utilities: Styles | Styles[], options?: AddOption): void

		/** Register new components. */
		addComponents(components: Styles | Styles[], options?: AddOption): void

		/** Register new utilities. */
		matchUtilities(
			utilities: Record<string, (value: CSSValue) => Styles | Styles[]>,
			options?: MatchOption,
		): void

		/** Register new components. */
		matchComponents(
			components: Record<string, (value: CSSValue) => Styles | Styles[]>,
			options?: MatchOption,
		): void

		/** Register a custom variant. */
		addVariant(
			variantName: string,
			generator: string | string[] | Generator | Generator[],
			options?: {},
		): void

		/** Register an arbitrary variant */
		matchVariant(
			variants: Record<string, (value?: string) => string | string[]>,
			options?: { values?: ConfigObject },
		): void

		/** Look up values in the user's theme configuration. */
		theme: ResolvePath

		/** Look up values in the user's Tailwind configuration. */
		config: ResolvePath

		/** Escape strings meant to be used in class names. */
		e(classname: string): string

		/** Apply the user's configured prefix to parts of a selector. */
		prefix(selector: string): string

		variants(corePlugin: string): string[]

		corePlugins(feature: keyof CorePluginFeatures): boolean

		/** low-level manipulation with PostCSS directly */
		postcss: import("postcss").Postcss
	}

	interface ConfigJS extends StrictConfigJS, Customized {}

	interface PresetFunction {
		(): ConfigJS
	}

	interface Extractor {
		(content: string): RegExpMatchArray | null
	}

	type Extractors =
		| Extractor
		| (Partial<{ DEFAULT: Extractor }> & Record<string, Extractor>)

	type SafeList = Array<string | { pattern: RegExp; variants: string[] }>

	interface Transformer {
		(content: string): string
	}

	type Transformers =
		| Transformer
		| (Partial<{ DEFAULT: Transformer }> & Record<string, Transformer>)

	/** @deprecated */
	interface PurgeConfig extends Customized {
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

	interface ContentConfig extends Customized {
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

	interface StrictConfigJS extends OtherConfigJS {
		presets?: (ConfigJS | PresetFunction)[]
		theme?: Theme & CustomTheme
		plugins?: Plugin[]
		darkMode?: boolean | "media" | "class" | ["class", string]
		corePlugins?:
			| Partial<CorePluginFeatures>
			| Array<keyof CorePluginFeatures>
		separator?: string
		prefix?: string
		important?: boolean | string
	}

	interface ResolvedConfigJS extends StrictResolvedConfigJS, Customized {}

	interface StrictResolvedConfigJS extends OtherConfigJS {
		presets: ConfigJS[]
		separator: string
		prefix: string
		important: boolean
		darkMode: boolean | "media" | "class" | ["class", string]
		plugins: (
			| UserPluginObject
			| UserPluginFunction
			| UserPluginFunctionWithOption
		)[]
		theme: ResolvedTheme & Customized
	}

	interface PluginFunction<Options> {
		(options: Options): UserPluginFunction
	}
	interface ConfigFunction<Options> {
		(options: Options): ConfigJS
	}

	interface CreatePluginWithOptions {
		/** Create a tailwind plugin with options. */
		<Options = unknown>(
			pluginFunction: PluginFunction<Options>,
			configFunction?: ConfigFunction<Options>,
		): UserPluginFunctionWithOption<Options>
	}

	interface CreatePlugin {
		(handler: UserPluginFunction, config?: ConfigJS): Plugin
		/** Create a tailwind plugin with options. */
		withOptions: CreatePluginWithOptions
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
		variantMap: Map<string, Array<[bigint, Generator]>>
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
	const theme: Tailwind.Theme & Tailwind.CustomTheme
	export = theme
}

declare module "tailwindcss/defaultTheme.js" {
	const theme: Tailwind.Theme & Tailwind.CustomTheme
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

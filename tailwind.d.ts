// Type definitions for tailwindcss v3
// Project: https://github.com/tailwindlabs/tailwindcss
// Definitions by: lightyen <https://github.com/lightyen>

/// <reference path="colors.d.ts" />
/// <reference path="defaultConfig.d.ts" />

declare namespace Tailwind {
	type Value = unknown

	type BreakPoints<T extends Record<number | string, string>> = {
		[K in keyof T as `screen-${string & K}`]: T[K]
	}

	interface GetTheme {
		(key: string, defaultValue?: unknown): any
	}

	interface ResolvePath extends ConfigUtils {
		(key: string, defaultValue?: unknown): any
		theme: GetTheme
	}

	interface ConfigUtils {
		colors: Record<string, Record<string, string>>
		negative<T extends Record<string, string>>(
			value: T,
		): { [P in keyof T]: `-${T[P]}` }
		breakpoints<T extends Record<string, string>>(
			value: T,
		): { [K in keyof T as `screen-${string & K}`]: T[K] }
	}

	type WithTheme<T> = T | ((theme: ResolvePath, utils: ConfigUtils) => T)

	interface OpacityOptions {
		opacityValue?: Value // 'var(--tw-text-opacity)'
		opacityVariable?: Value // '--tw-text-opacity'
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

	export type ColorMap = {
		[key: string]: Value | ColorValueFunc | ColorMap | undefined
	}

	type ColorValueFunc = (opacity: OpacityOptions) => Value

	type ColorValue = Value | ColorValueFunc | ColorMap | undefined

	interface BuiltInColors<V> extends Record<string, V | undefined> {
		inherit?: V
		current?: V
		transparent?: V
		black?: V
		white?: V
		slate?: V
		gray?: V
		zinc?: V
		neutral?: V
		stone?: V
		red?: V
		orange?: V
		amber?: V
		yellow?: V
		lime?: V
		green?: V
		emerald?: V
		teal?: V
		cyan?: V
		sky?: V
		blue?: V
		indigo?: V
		violet?: V
		purple?: V
		fuchsia?: V
		pink?: V
		rose?: V
		lightBlue?: V
		warmGray?: V
		trueGray?: V
		coolGray?: V
		blueGray?: V
	}

	type Palette = BuiltInColors<ColorValue> & ColorMap

	interface CorePluginFeatures {
		accentColor: boolean
		accessibility: boolean
		alignContent: boolean
		alignItems: boolean
		alignSelf: boolean
		animation: boolean
		appearance: boolean
		aspectRatio: boolean
		backdropBlur: boolean
		backdropBrightness: boolean
		backdropContrast: boolean
		backdropFilter: boolean
		backdropGrayscale: boolean
		backdropHueRotate: boolean
		backdropInvert: boolean
		backdropOpacity: boolean
		backdropSaturate: boolean
		backdropSepia: boolean
		backgroundAttachment: boolean
		backgroundBlendMode: boolean
		backgroundClip: boolean
		backgroundColor: boolean
		backgroundImage: boolean
		backgroundOpacity: boolean
		backgroundOrigin: boolean
		backgroundPosition: boolean
		backgroundRepeat: boolean
		backgroundSize: boolean
		blur: boolean
		borderCollapse: boolean
		borderColor: boolean
		borderOpacity: boolean
		borderRadius: boolean
		borderStyle: boolean
		borderSpacing: boolean
		borderWidth: boolean
		boxDecorationBreak: boolean
		boxShadow: boolean
		boxShadowColor: boolean
		boxSizing: boolean
		breakAfter: boolean
		breakBefore: boolean
		breakInside: boolean
		brightness: boolean
		caretColor: boolean
		clear: boolean
		columns: boolean
		container: boolean
		content: boolean
		contrast: boolean
		cursor: boolean
		display: boolean
		divideColor: boolean
		divideOpacity: boolean
		divideStyle: boolean
		divideWidth: boolean
		dropShadow: boolean
		fill: boolean
		filter: boolean
		flex: boolean
		flexBasis: boolean
		flexDirection: boolean
		flexGrow: boolean
		flexShrink: boolean
		flexWrap: boolean
		float: boolean
		fontFamily: boolean
		fontSize: boolean
		fontSmoothing: boolean
		fontStyle: boolean
		fontVariantNumeric: boolean
		fontWeight: boolean
		gap: boolean
		gradientColorStops: boolean
		grayscale: boolean
		gridAutoColumns: boolean
		gridAutoFlow: boolean
		gridAutoRows: boolean
		gridColumn: boolean
		gridColumnEnd: boolean
		gridColumnStart: boolean
		gridRow: boolean
		gridRowEnd: boolean
		gridRowStart: boolean
		gridTemplateColumns: boolean
		gridTemplateRows: boolean
		height: boolean
		hueRotate: boolean
		inset: boolean
		invert: boolean
		isolation: boolean
		justifyContent: boolean
		justifyItems: boolean
		justifySelf: boolean
		letterSpacing: boolean
		lineHeight: boolean
		listStylePosition: boolean
		listStyleType: boolean
		margin: boolean
		maxHeight: boolean
		maxWidth: boolean
		minHeight: boolean
		minWidth: boolean
		mixBlendMode: boolean
		objectFit: boolean
		objectPosition: boolean
		opacity: boolean
		order: boolean
		outlineColor: boolean
		outlineOffset: boolean
		outlineStyle: boolean
		outlineWidth: boolean
		overflow: boolean
		overscrollBehavior: boolean
		padding: boolean
		placeContent: boolean
		placeholderColor: boolean
		placeholderOpacity: boolean
		placeItems: boolean
		placeSelf: boolean
		pointerEvents: boolean
		position: boolean
		preflight: boolean
		resize: boolean
		ringColor: boolean
		ringOffsetColor: boolean
		ringOffsetWidth: boolean
		ringOpacity: boolean
		ringWidth: boolean
		rotate: boolean
		saturate: boolean
		scale: boolean
		scrollBehavior: boolean
		scrollMargin: boolean
		scrollPadding: boolean
		scrollSnapAlign: boolean
		scrollSnapStop: boolean
		scrollSnapType: boolean
		sepia: boolean
		skew: boolean
		space: boolean
		stroke: boolean
		strokeWidth: boolean
		tableLayout: boolean
		textAlign: boolean
		textColor: boolean
		textDecoration: boolean
		textDecorationColor: boolean
		textDecorationStyle: boolean
		textDecorationThickness: boolean
		textIndent: boolean
		textOpacity: boolean
		textOverflow: boolean
		textTransform: boolean
		textUnderlineOffset: boolean
		touchAction: boolean
		transform: boolean
		transformOrigin: boolean
		transitionDelay: boolean
		transitionDuration: boolean
		transitionProperty: boolean
		transitionTimingFunction: boolean
		translate: boolean
		userSelect: boolean
		verticalAlign: boolean
		visibility: boolean
		whitespace: boolean
		width: boolean
		willChange: boolean
		wordBreak: boolean
		zIndex: boolean
	}

	type FontSizeValue =
		| Value
		| [fontSize: Value, lineHeight: Value]
		| [
				fontSize: Value,
				options: {
					lineHeight?: Value
					letterSpacing?: Value
					fontWeight?: Value
				},
		  ]

	type KeyframesValue = Record<string, CSSProperties>
	type DropShadowValue = unknown
	type FontFamilyValue = unknown

	interface Theme {
		extend?: Omit<Theme, "extend">
		accentColor?: WithTheme<Palette>
		animation?: WithTheme<Record<string, Value>>
		aspectRatio?: WithTheme<Record<string, Value>>
		backdropBlur?: WithTheme<Record<string, Value>>
		backdropBrightness?: WithTheme<Record<string, Value>>
		backdropContrast?: WithTheme<Record<string, Value>>
		backdropGrayscale?: WithTheme<Record<string, Value>>
		backdropHueRotate?: WithTheme<Record<string, Value>>
		backdropInvert?: WithTheme<Record<string, Value>>
		backdropOpacity?: WithTheme<Record<string, Value>>
		backdropSaturate?: WithTheme<Record<string, Value>>
		backdropSepia?: WithTheme<Record<string, Value>>
		backgroundColor?: WithTheme<Palette>
		backgroundImage?: WithTheme<Record<string, Value>>
		backgroundOpacity?: WithTheme<Record<string, Value>>
		backgroundPosition?: WithTheme<Record<string, Value>>
		backgroundSize?: WithTheme<Record<string, Value>>
		blur?: WithTheme<Record<string, Value>>
		borderColor?: WithTheme<Palette & { DEFAULT?: Value }>
		borderOpacity?: WithTheme<Record<string, Value>>
		borderRadius?: WithTheme<Record<string, Value>>
		borderSpacing?: WithTheme<Record<string, Value>>
		borderWidth?: WithTheme<Record<string, Value>>
		boxShadow?: WithTheme<Record<string, Value>>
		boxShadowColor?: WithTheme<Palette>
		brightness?: WithTheme<Record<string, Value>>
		caretColor?: WithTheme<Palette>
		colors?: WithTheme<Palette>
		columns?: WithTheme<Record<string, Value>>
		container?: WithTheme<{
			screens?: Record<string, unknown>
			padding?: unknown
			center?: unknown
		}>
		content?: WithTheme<Record<string, Value>>
		contrast?: WithTheme<Record<string, Value>>
		cursor?: WithTheme<Record<string, Value>>
		divideColor?: WithTheme<Palette & { DEFAULT?: Value }>
		divideOpacity?: WithTheme<Record<string, Value>>
		divideWidth?: WithTheme<Record<string, Value>>
		dropShadow?: WithTheme<Record<string, DropShadowValue>>
		fill?: WithTheme<Palette>
		flex?: WithTheme<Record<string, Value>>
		flexBasis?: WithTheme<Record<string, Value>>
		flexGrow?: WithTheme<Record<string, Value>>
		flexShrink?: WithTheme<Record<string, Value>>
		fontFamily?: WithTheme<Record<string, FontFamilyValue>>
		fontSize?: WithTheme<Record<string, FontSizeValue>>
		fontWeight?: WithTheme<Record<string, Value>>
		gap?: WithTheme<Record<string, Value>>
		gradientColorStops?: WithTheme<Palette>
		grayscale?: WithTheme<Record<string, Value>>
		gridAutoColumns?: WithTheme<Record<string, Value>>
		gridAutoRows?: WithTheme<Record<string, Value>>
		gridColumn?: WithTheme<Record<string, Value>>
		gridColumnEnd?: WithTheme<Record<string, Value>>
		gridColumnStart?: WithTheme<Record<string, Value>>
		gridRow?: WithTheme<Record<string, Value>>
		gridRowEnd?: WithTheme<Record<string, Value>>
		gridRowStart?: WithTheme<Record<string, Value>>
		gridTemplateColumns?: WithTheme<Record<string, Value>>
		gridTemplateRows?: WithTheme<Record<string, Value>>
		height?: WithTheme<Record<string, Value>>
		hueRotate?: WithTheme<Record<string, Value>>
		inset?: WithTheme<Record<string, Value>>
		invert?: WithTheme<Record<string, Value>>
		keyframes?: WithTheme<Record<string, KeyframesValue>>
		letterSpacing?: WithTheme<Record<string, Value>>
		lineHeight?: WithTheme<Record<string, Value>>
		listStyleType?: WithTheme<Record<string, Value>>
		margin?: WithTheme<Record<string, Value>>
		maxHeight?: WithTheme<Record<string, Value>>
		maxWidth?: WithTheme<Record<string, Value>>
		minHeight?: WithTheme<Record<string, Value>>
		minWidth?: WithTheme<Record<string, Value>>
		objectPosition?: WithTheme<Record<string, Value>>
		opacity?: WithTheme<Record<string, Value>>
		order?: WithTheme<Record<string, Value>>
		outlineColor?: WithTheme<Palette>
		outlineOffset?: WithTheme<Record<string, Value>>
		outlineWidth?: WithTheme<Record<string, Value>>
		padding?: WithTheme<Record<string, Value>>
		placeholderColor?: WithTheme<Palette>
		placeholderOpacity?: WithTheme<Record<string, Value>>
		ringColor?: WithTheme<Palette & { DEFAULT?: ColorValue }>
		ringOffsetColor?: WithTheme<Palette>
		ringOffsetWidth?: WithTheme<Record<string, Value>>
		ringOpacity?: WithTheme<Record<string, Value>>
		ringWidth?: WithTheme<Record<string, Value>>
		rotate?: WithTheme<Record<string, Value>>
		saturate?: WithTheme<Record<string, Value>>
		scale?: WithTheme<Record<string, Value>>
		screens?: WithTheme<Record<string, unknown>>
		scrollMargin?: WithTheme<Record<string, Value>>
		scrollPadding?: WithTheme<Record<string, Value>>
		sepia?: WithTheme<Record<string, Value>>
		skew?: WithTheme<Record<string, Value>>
		space?: WithTheme<Record<string, Value>>
		spacing?: WithTheme<Record<string, Value>>
		stroke?: WithTheme<Record<string, Value>>
		strokeWidth?: WithTheme<Record<string, Value>>
		textColor?: WithTheme<Palette>
		textDecorationColor?: WithTheme<Palette>
		textDecorationThickness?: WithTheme<Record<string, Value>>
		textIndent?: WithTheme<Record<string, Value>>
		textOpacity?: WithTheme<Record<string, Value>>
		textUnderlineOffset?: WithTheme<Record<string, Value>>
		transformOrigin?: WithTheme<Record<string, Value>>
		transitionDelay?: WithTheme<Record<string, Value>>
		transitionDuration?: WithTheme<Record<string, Value>>
		transitionProperty?: WithTheme<Record<string, Value>>
		transitionTimingFunction?: WithTheme<Record<string, Value>>
		translate?: WithTheme<Record<string, Value>>
		width?: WithTheme<Record<string, Value>>
		willChange?: WithTheme<Record<string, Value>>
		zIndex?: WithTheme<Record<string, Value>>
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

	interface VariantFuncOption {
		/** The `before` helper lets you add new variants to the beginning of a plugin's default variant list. */
		before: (variants: Variant[]) => Variant[]
		/** The `after` helper lets you add new variants to the end of a plugin's default variant list. */
		after: (variants: Variant[]) => Variant[]
		/** The `without` helper lets you disable a variant that is enabled by default. */
		without: (variants: Variant[]) => Variant[]
		/** The `variants` helper lets you retrieve the variants for a specific plugin to read from directly. */
		variants: (corePlugin: keyof CorePluginFeatures) => Variant[]
	}

	interface InnerCustomProperties {
		"--tw-translate-x": Value
		"--tw-translate-y": Value
		"--tw-rotate": Value
		"--tw-skew-x": Value
		"--tw-skew-y": Value
		"--tw-scale-x": Value
		"--tw-scale-y": Value
		"--tw-transform": Value
		"--tw-scroll-snap-strictness": Value
		"--tw-space-x-reverse": Value
		"--tw-space-y-reverse": Value
		"--tw-divide-x-reverse": Value
		"--tw-divide-y-reverse": Value
		"--tw-divide-opacity": Value
		"--tw-border-opacity": Value
		"--tw-bg-opacity": Value
		"--tw-gradient-from": Value
		"--tw-gradient-stops": Value
		"--tw-gradient-to": Value
		"--tw-content": Value
		"--tw-ordinal": Value
		"--tw-slashed-zero": Value
		"--tw-numeric-figure": Value
		"--tw-numeric-spacing": Value
		"--tw-numeric-fraction": Value
		"--tw-text-opacity": Value
		"--tw-placeholder-opacity": Value
		"--tw-shadow": Value
		"--tw-shadow-colored": Value
		"--tw-shadow-color": Value
		"--tw-ring-offset-shadow": Value
		"--tw-ring-shadow": Value
		"--tw-ring-inset": Value
		"--tw-ring-color": Value
		"--tw-ring-opacity": Value
		"--tw-ring-offset-width": Value
		"--tw-ring-offset-color": Value
		"--tw-blur": Value
		"--tw-brightness": Value
		"--tw-contrast": Value
		"--tw-drop-shadow": Value
		"--tw-grayscale": Value
		"--tw-hue-rotate": Value
		"--tw-invert": Value
		"--tw-saturate": Value
		"--tw-sepia": Value
		"--tw-backdrop-blur": Value
		"--tw-backdrop-brightness": Value
		"--tw-backdrop-contrast": Value
		"--tw-backdrop-grayscale": Value
		"--tw-backdrop-hue-rotate": Value
		"--tw-backdrop-invert": Value
		"--tw-backdrop-opacity": Value
		"--tw-backdrop-saturate": Value
		"--tw-backdrop-sepia": Value
		"--tw-border-spacing-x": Value
		"--tw-border-spacing-y": Value
	}

	type DefinedCSSProperties = Partial<InnerCustomProperties> &
		import("csstype").Properties<Value>

	type CSSProperties =
		| DefinedCSSProperties
		| Record<string, Value | DefinedCSSProperties>

	type Styles =
		| CSSProperties
		| Record<string, CSSProperties>
		| import("postcss").Node

	interface PresetFunction {
		(): ConfigJS
	}

	type SafeList = Array<string | { pattern: RegExp; variants: string[] }>

	type Content = Array<string | { raw: string }>

	interface Extractor {
		(content: string): RegExpMatchArray | null
	}

	type Extractors =
		| Extractor
		| (Partial<{ DEFAULT: Extractor }> & Record<string, Extractor>)

	interface Transformer {
		(content: string): string
	}

	type Transformers =
		| Transformer
		| (Partial<{ DEFAULT: Transformer }> & Record<string, Transformer>)

	interface ContentConfig {
		content?: Content
		files?: Content
		transform?: Transformers
		extract?: Extractors
		safelist?: SafeList
		options?: unknown
	}

	/** @deprecated */
	interface PurgeConfig {
		mode?: "all"
		content?: Content
		transform?: Transformers
		preserveHtmlElements?: boolean
		layers?: Array<"base" | "components" | "utilities">
		enabled?: boolean
		safelist?: SafeList
		extract?: Extractors
		options?: unknown
	}

	interface CustomTheme {
		[key: string]: WithTheme<any>
	}

	interface ConfigJS extends StrictConfigJS {
		[key: string]: unknown
	}

	interface StrictConfigJS {
		presets?: (ConfigJS | PresetFunction)[]
		theme?: Theme & CustomTheme
		plugins?: Plugin[]
		corePlugins?:
			| Partial<CorePluginFeatures>
			| Array<keyof CorePluginFeatures>

		content?: Content | ContentConfig | undefined
		/** @deprecated */
		purge?: Content | PurgeConfig
		safelist?: SafeList
		separator?: string
		prefix?: string
		important?: boolean
		darkMode?: boolean | "media" | "class" | ["class", string]
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

	type ResolvedResult<T, V = unknown> = Partial<T> & Record<string, V>

	type SpacingConfig = {
		0: unknown
		1: unknown
		2: unknown
		3: unknown
		4: unknown
		5: unknown
		6: unknown
		7: unknown
		8: unknown
		9: unknown
		10: unknown
		11: unknown
		12: unknown
		14: unknown
		16: unknown
		20: unknown
		24: unknown
		28: unknown
		32: unknown
		36: unknown
		40: unknown
		44: unknown
		48: unknown
		52: unknown
		56: unknown
		60: unknown
		64: unknown
		72: unknown
		80: unknown
		96: unknown
		px: unknown
		0.5: unknown
		1.5: unknown
		2.5: unknown
		3.5: unknown
	}

	interface OpacityConfig {
		0: string
		5: string
		10: string
		20: string
		25: string
		30: string
		40: string
		50: string
		60: string
		70: string
		75: string
		80: string
		90: string
		95: string
		100: string
	}

	interface ResolvedConfigJS extends StrictResolvedConfigJS {
		[key: string]: unknown
	}

	interface StrictResolvedConfigJS {
		presets: ConfigJS[]
		purge?: StrictConfigJS["purge"]
		content: StrictConfigJS["content"]
		safelist: string[]
		separator: string
		prefix: string
		important: boolean
		darkMode: boolean | "media" | "class" | ["class", string]
		corePlugins: Array<keyof CorePluginFeatures>
		variantOrder: Variant[]
		plugins: Array<PluginObject | PluginFunction | PluginFunctionWithOption>
		theme: {
			screens: ResolvedResult<{
				sm: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
			}>
			colors: Palette
			spacing: ResolvedResult<SpacingConfig>
			animation: ResolvedResult<{
				none: unknown
				spin: unknown
				ping: unknown
				pulse: unknown
				bounce: unknown
			}>
			backdropBlur: ResolvedResult<{
				0: unknown
				none: unknown
				sm: unknown
				DEFAULT: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				"3xl": unknown
			}>
			backdropBrightness: ResolvedResult<{
				0: unknown
				50: unknown
				75: unknown
				90: unknown
				95: unknown
				100: unknown
				105: unknown
				110: unknown
				125: unknown
				150: unknown
				200: unknown
			}>
			backdropContrast: ResolvedResult<{
				0: unknown
				50: unknown
				75: unknown
				100: unknown
				125: unknown
				150: unknown
				200: unknown
			}>
			backdropGrayscale: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			backdropHueRotate: ResolvedResult<{
				0: unknown
				15: unknown
				30: unknown
				60: unknown
				90: unknown
				180: unknown
				"-180": unknown
				"-90": unknown
				"-60": unknown
				"-30": unknown
				"-15": unknown
			}>
			backdropInvert: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			backdropOpacity: ResolvedResult<OpacityConfig>
			backdropSaturate: ResolvedResult<{
				0: unknown
				50: unknown
				100: unknown
				150: unknown
				200: unknown
			}>
			backdropSepia: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			backgroundColor: Palette
			backgroundImage: ResolvedResult<{
				none: unknown
				"gradient-to-t": unknown
				"gradient-to-tr": unknown
				"gradient-to-r": unknown
				"gradient-to-br": unknown
				"gradient-to-b": unknown
				"gradient-to-bl": unknown
				"gradient-to-l": unknown
				"gradient-to-tl": unknown
			}>
			backgroundOpacity: ResolvedResult<OpacityConfig>
			backgroundPosition: ResolvedResult<{
				bottom: unknown
				center: unknown
				left: unknown
				"left-bottom": unknown
				"left-top": unknown
				right: unknown
				"right-bottom": unknown
				"right-top": unknown
				top: unknown
			}>
			backgroundSize: ResolvedResult<{
				auto: unknown
				cover: unknown
				contain: unknown
			}>
			blur: ResolvedResult<{
				0: unknown
				none: unknown
				sm: unknown
				DEFAULT: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				"3xl": unknown
			}>
			brightness: ResolvedResult<{
				0: unknown
				50: unknown
				75: unknown
				90: unknown
				95: unknown
				100: unknown
				105: unknown
				110: unknown
				125: unknown
				150: unknown
				200: unknown
			}>
			borderColor: Palette &
				ResolvedResult<{
					DEFAULT: unknown
				}>
			borderOpacity: ResolvedResult<OpacityConfig>
			borderRadius: ResolvedResult<{
				none: unknown
				sm: unknown
				DEFAULT: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				"3xl": unknown
				full: unknown
			}>
			borderSpacing: ResolvedResult<SpacingConfig>
			borderWidth: ResolvedResult<{
				0: unknown
				2: unknown
				4: unknown
				8: unknown
				DEFAULT: unknown
			}>
			boxShadow: ResolvedResult<{
				sm: unknown
				DEFAULT: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				inner: unknown
				none: unknown
			}>
			boxShadowColor: Palette
			caretColor: Palette
			accentColor: Palette & { auto: unknown }
			contrast: ResolvedResult<{
				0: unknown
				50: unknown
				75: unknown
				100: unknown
				125: unknown
				150: unknown
				200: unknown
			}>
			container: ResolvedResult<{
				screens: Record<string, unknown>
				padding: unknown
				center: unknown
			}>
			content: ResolvedResult<{
				none: unknown
			}>
			cursor: ResolvedResult<{
				auto: unknown
				default: unknown
				pointer: unknown
				wait: unknown
				text: unknown
				move: unknown
				help: unknown
				"not-allowed": unknown
			}>
			divideColor: Palette &
				ResolvedResult<{
					DEFAULT: unknown
				}>
			divideOpacity: ResolvedResult<{
				0: unknown
				5: unknown
				10: unknown
				20: unknown
				25: unknown
				30: unknown
				40: unknown
				50: unknown
				60: unknown
				70: unknown
				75: unknown
				80: unknown
				90: unknown
				95: unknown
				100: unknown
			}>
			divideWidth: ResolvedResult<{
				0: unknown
				2: unknown
				4: unknown
				8: unknown
				DEFAULT: unknown
			}>
			dropShadow: ResolvedResult<{
				DEFAULT: unknown
				sm: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				none: unknown
			}>
			fill: Palette &
				ResolvedResult<{
					current: unknown
				}>
			grayscale: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			hueRotate: ResolvedResult<{
				0: unknown
				15: unknown
				30: unknown
				60: unknown
				90: unknown
				180: unknown
			}>
			invert: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			flex: ResolvedResult<{
				1: unknown
				auto: unknown
				initial: unknown
				none: unknown
			}>
			flexBasis: ResolvedResult<
				SpacingConfig & {
					auto: unknown
					"1/2": unknown
					"1/3": unknown
					"2/3": unknown
					"1/4": unknown
					"2/4": unknown
					"3/4": unknown
					"1/5": unknown
					"2/5": unknown
					"3/5": unknown
					"4/5": unknown
					"1/6": unknown
					"2/6": unknown
					"3/6": unknown
					"4/6": unknown
					"5/6": unknown
					"1/12": unknown
					"2/12": unknown
					"3/12": unknown
					"4/12": unknown
					"5/12": unknown
					"6/12": unknown
					"7/12": unknown
					"8/12": unknown
					"9/12": unknown
					"10/12": unknown
					"11/12": unknown
					full: unknown
				}
			>
			flexGrow: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			flexShrink: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			fontFamily: ResolvedResult<{
				sans: unknown
				serif: unknown
				mono: unknown
			}>
			fontSize: ResolvedResult<{
				xs: unknown
				sm: unknown
				base: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				"3xl": unknown
				"4xl": unknown
				"5xl": unknown
				"6xl": unknown
				"7xl": unknown
				"8xl": unknown
				"9xl": unknown
			}>
			fontWeight: ResolvedResult<{
				thin: unknown
				extralight: unknown
				light: unknown
				normal: unknown
				medium: unknown
				semibold: unknown
				bold: unknown
				extrabold: unknown
				black: unknown
			}>
			gap: ResolvedResult<SpacingConfig>
			gradientColorStops: Palette
			gridAutoColumns: ResolvedResult<{
				auto: unknown
				min: unknown
				max: unknown
				fr: unknown
			}>
			gridAutoRows: ResolvedResult<{
				auto: unknown
				min: unknown
				max: unknown
				fr: unknown
			}>
			gridColumn: ResolvedResult<{
				auto: unknown
				"span-1": unknown
				"span-2": unknown
				"span-3": unknown
				"span-4": unknown
				"span-5": unknown
				"span-6": unknown
				"span-7": unknown
				"span-8": unknown
				"span-9": unknown
				"span-10": unknown
				"span-11": unknown
				"span-12": unknown
				"span-full": unknown
			}>
			gridColumnEnd: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				8: unknown
				9: unknown
				10: unknown
				11: unknown
				12: unknown
				13: unknown
				auto: unknown
			}>
			gridColumnStart: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				8: unknown
				9: unknown
				10: unknown
				11: unknown
				12: unknown
				13: unknown
				auto: unknown
			}>
			gridRow: ResolvedResult<{
				auto: unknown
				"span-1": unknown
				"span-2": unknown
				"span-3": unknown
				"span-4": unknown
				"span-5": unknown
				"span-6": unknown
				"span-full": unknown
			}>
			gridRowStart: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				auto: unknown
			}>
			gridRowEnd: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				auto: unknown
			}>
			gridTemplateColumns: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				8: unknown
				9: unknown
				10: unknown
				11: unknown
				12: unknown
				none: unknown
			}>
			gridTemplateRows: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				none: unknown
			}>
			height: ResolvedResult<
				SpacingConfig & {
					auto: "auto"
					"1/2": "50%"
					"1/3": "33.333333%"
					"2/3": "66.666667%"
					"1/4": "25%"
					"2/4": "50%"
					"3/4": "75%"
					"1/5": "20%"
					"2/5": "40%"
					"3/5": "60%"
					"4/5": "80%"
					"1/6": "16.666667%"
					"2/6": "33.333333%"
					"3/6": "50%"
					"4/6": "66.666667%"
					"5/6": "83.333333%"
					full: "100%"
					screen: "100vh"
				}
			>
			inset: ResolvedResult<
				SpacingConfig &
					SpacingConfig & {
						auto: unknown
						"1/2": unknown
						"1/3": unknown
						"2/3": unknown
						"1/4": unknown
						"2/4": unknown
						"3/4": unknown
						full: unknown
					}
			>
			keyframes: ResolvedResult<
				{
					spin: KeyframesValue
					ping: KeyframesValue
					pulse: KeyframesValue
					bounce: KeyframesValue
				},
				KeyframesValue
			>
			letterSpacing: ResolvedResult<{
				tighter: unknown
				tight: unknown
				normal: unknown
				wide: unknown
				wider: unknown
				widest: unknown
			}>
			lineHeight: ResolvedResult<{
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				8: unknown
				9: unknown
				10: unknown
				none: unknown
				tight: unknown
				snug: unknown
				normal: unknown
				relaxed: unknown
				loose: unknown
			}>
			listStyleType: ResolvedResult<{
				none: unknown
				disc: unknown
				decimal: unknown
			}>
			margin: ResolvedResult<
				SpacingConfig &
					SpacingConfig & {
						auto: unknown
					}
			>
			maxHeight: ResolvedResult<
				SpacingConfig & {
					full: unknown
					screen: unknown
				}
			>
			maxWidth: ResolvedResult<{
				0: unknown
				none: unknown
				xs: unknown
				sm: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				"3xl": unknown
				"4xl": unknown
				"5xl": unknown
				"6xl": unknown
				"7xl": unknown
				full: unknown
				min: unknown
				max: unknown
				prose: unknown
				"screen-sm": unknown
				"screen-md": unknown
				"screen-lg": unknown
				"screen-xl": unknown
				"screen-2xl": unknown
			}>
			minHeight: ResolvedResult<{
				0: unknown
				full: unknown
				screen: unknown
			}>
			minWidth: ResolvedResult<{
				0: unknown
				full: unknown
				min: unknown
				max: unknown
			}>
			objectPosition: ResolvedResult<{
				bottom: unknown
				center: unknown
				left: unknown
				"left-bottom": unknown
				"left-top": unknown
				right: unknown
				"right-bottom": unknown
				"right-top": unknown
				top: unknown
			}>
			opacity: ResolvedResult<OpacityConfig>
			order: ResolvedResult<{
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				8: unknown
				9: unknown
				10: unknown
				11: unknown
				12: unknown
				first: unknown
				last: unknown
				none: unknown
			}>
			outlineOffset: ResolvedResult<{
				0: "0px"
				1: "1px"
				2: "2px"
				4: "4px"
				8: "8px"
			}>
			outlineWidth: ResolvedResult<{
				0: "0px"
				1: "1px"
				2: "2px"
				4: "4px"
				8: "8px"
			}>
			outlineColor: Palette
			padding: ResolvedResult<SpacingConfig>
			placeholderColor: Palette
			placeholderOpacity: ResolvedResult<OpacityConfig>
			ringColor: Palette &
				ResolvedResult<{
					DEFAULT: unknown
				}>
			ringOffsetColor: Palette
			ringOffsetWidth: ResolvedResult<{
				0: unknown
				1: unknown
				2: unknown
				4: unknown
				8: unknown
			}>
			ringOpacity: ResolvedResult<
				OpacityConfig & {
					DEFAULT: unknown
				}
			>
			ringWidth: ResolvedResult<{
				0: unknown
				1: unknown
				2: unknown
				4: unknown
				8: unknown
				DEFAULT: unknown
			}>
			rotate: ResolvedResult<{
				0: unknown
				1: unknown
				2: unknown
				3: unknown
				6: unknown
				12: unknown
				45: unknown
				90: unknown
				180: unknown
			}>
			saturate: ResolvedResult<{
				0: unknown
				50: unknown
				100: unknown
				150: unknown
				200: unknown
			}>
			scale: ResolvedResult<{
				0: unknown
				50: unknown
				75: unknown
				90: unknown
				95: unknown
				100: unknown
				105: unknown
				110: unknown
				125: unknown
				150: unknown
			}>
			sepia: ResolvedResult<{
				0: unknown
				DEFAULT: unknown
			}>
			skew: ResolvedResult<{
				0: unknown
				1: unknown
				2: unknown
				3: unknown
				6: unknown
				12: unknown
			}>
			space: ResolvedResult<SpacingConfig>
			stroke: Palette &
				ResolvedResult<{
					current: unknown
				}>
			strokeWidth: ResolvedResult<{
				0: unknown
				1: unknown
				2: unknown
			}>
			textColor: Palette
			textOpacity: ResolvedResult<OpacityConfig>
			textDecorationColor: Palette
			textDecorationThickness: ResolvedResult<{
				auto: unknown
				"from-font": unknown
				0: unknown
				1: unknown
				2: unknown
				4: unknown
				8: unknown
			}>
			textUnderlineOffset: ResolvedResult<{
				auto: unknown
				0: unknown
				1: unknown
				2: unknown
				4: unknown
				8: unknown
			}>
			textIndent: ResolvedResult<SpacingConfig>
			transformOrigin: ResolvedResult<{
				center: unknown
				top: unknown
				"top-right": unknown
				right: unknown
				"bottom-right": unknown
				bottom: unknown
				"bottom-left": unknown
				left: unknown
				"top-left": unknown
			}>
			transitionDelay: ResolvedResult<{
				75: unknown
				100: unknown
				150: unknown
				200: unknown
				300: unknown
				500: unknown
				700: unknown
				1000: unknown
			}>
			transitionDuration: ResolvedResult<{
				75: unknown
				100: unknown
				150: unknown
				200: unknown
				300: unknown
				500: unknown
				700: unknown
				1000: unknown
			}>
			transitionProperty: ResolvedResult<{
				none: unknown
				all: unknown
				DEFAULT: unknown
				colors: unknown
				opacity: unknown
				shadow: unknown
				transform: unknown
			}>
			transitionTimingFunction: ResolvedResult<{
				linear: unknown
				in: unknown
				out: unknown
				"in-out": unknown
			}>
			translate: ResolvedResult<
				SpacingConfig & {
					"1/2": unknown
					"1/3": unknown
					"2/3": unknown
					"1/4": unknown
					"2/4": unknown
					"3/4": unknown
					full: unknown
				}
			>
			width: ResolvedResult<
				SpacingConfig & {
					auto: unknown
					"1/2": unknown
					"1/3": unknown
					"2/3": unknown
					"1/4": unknown
					"2/4": unknown
					"3/4": unknown
					"1/5": unknown
					"2/5": unknown
					"3/5": unknown
					"4/5": unknown
					"1/6": unknown
					"2/6": unknown
					"3/6": unknown
					"4/6": unknown
					"5/6": unknown
					"1/12": unknown
					"2/12": unknown
					"3/12": unknown
					"4/12": unknown
					"5/12": unknown
					"6/12": unknown
					"7/12": unknown
					"8/12": unknown
					"9/12": unknown
					"10/12": unknown
					"11/12": unknown
					full: unknown
					screen: unknown
					min: unknown
					max: unknown
				}
			>
			zIndex: ResolvedResult<{
				0: unknown
				10: unknown
				20: unknown
				30: unknown
				40: unknown
				50: unknown
				auto: unknown
			}>
			aspectRatio: ResolvedResult<{
				auto: unknown
				square: unknown
				video: unknown
			}>
			columns: ResolvedResult<{
				auto: unknown
				1: unknown
				2: unknown
				3: unknown
				4: unknown
				5: unknown
				6: unknown
				7: unknown
				8: unknown
				9: unknown
				10: unknown
				11: unknown
				12: unknown
				"3xs": unknown
				"2xs": unknown
				xs: unknown
				sm: unknown
				md: unknown
				lg: unknown
				xl: unknown
				"2xl": unknown
				"3xl": unknown
				"4xl": unknown
				"5xl": unknown
				"6xl": unknown
				"7xl": unknown
			}>
			scrollMargin: ResolvedResult<
				SpacingConfig & {
					auto: unknown
				}
			>
			scrollPadding: ResolvedResult<SpacingConfig>
			willChange: ResolvedResult<{
				auto: unknown
				scroll: unknown
				contents: unknown
				transform: unknown
			}>
		}
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
		}): string | string[] | null | undefined | void
	}
}

declare namespace Tailwind {
	interface PluginOptions {
		/** Register new base styles. */
		addBase(styles: Styles | Styles[]): void

		/** Register new component styles. */
		addComponents(
			styles: Styles | Styles[],
			options?: {
				respectPrefix?: boolean
				respectImportant?: boolean
			},
		): void

		/** Register new utility styles. */
		addUtilities(
			styles: Styles | Styles[],
			options?: {
				respectPrefix?: boolean
				respectImportant?: boolean
			},
		): void

		/** Register custom variants. */
		addVariant(
			variantName: string,
			generator: string | string[] | Generator | Generator[],
			options?: unknown,
		): void

		addDefaults(
			group: string,
			declarations: Record<string, Value | Value[]>,
		): void

		/** Escape strings meant to be used in class names. */
		e(classname: string): string

		/** Look up values in the user's Tailwind configuration. */
		config(path: string, defaultValue?: unknown): any

		/** Look up values in the user's theme configuration. */
		theme(path: string, defaultValue?: unknown): any

		/** Apply the user's configured prefix to parts of a selector. */
		prefix(selector: string): string

		corePlugins(name: keyof CorePluginFeatures): boolean

		matchComponents(
			components: Record<
				string,
				(value: string) => CSSProperties | CSSProperties[]
			>,
			options?: {
				values?: Record<string, Value>
				type?: ValueType | ValueType[]
				respectPrefix?: boolean
				respectImportant?: boolean
				supportsNegativeValues?: boolean
			},
		): void

		matchUtilities(
			utilities: Record<
				string,
				(value: string) => CSSProperties | CSSProperties[]
			>,
			options?: {
				values?: Record<string, Value>
				type?: ValueType | ValueType[]
				respectPrefix?: boolean
				respectImportant?: boolean
				supportsNegativeValues?: boolean
			},
		): void

		matchVariant(
			variants: Record<string, (value?: string) => string | string[]>,
			options?: { values: Record<string, string> },
		): void

		/** low-level manipulation with PostCSS directly */
		postcss: import("postcss").Postcss
	}

	interface PluginFunction {
		(options: PluginOptions): void
		__isOptionsFunction?: boolean
	}

	interface PluginObject {
		handler?: PluginFunction
		config?: ConfigJS
	}

	type Plugin = PluginObject | PluginFunction

	type OptionType<F> = F extends (options: infer P) => any ? P : F

	interface PluginFunctionWithOption<Options = unknown> {
		(options?: Options): PluginObject & { __options?: Options }
		__isOptionsFunction: true
		__pluginFunction: (options?: Options) => PluginFunction
		__configFunction: (options?: Options) => ConfigJS
	}

	interface createPlugin {
		(
			handler: Tailwind.PluginFunction,
			config?: Tailwind.ConfigJS,
		): Tailwind.PluginObject

		withOptions<Options = any>(
			pluginFunction: (options?: Options) => Tailwind.PluginFunction,
			configFunction?: (options?: Options) => Tailwind.ConfigJS,
		): PluginFunctionWithOption<Options>
	}
}

declare namespace Tailwind {
	type CandidateRule = [
		{
			sort: bigint
			layer: "base" | "components" | "utilities" | "user"
			options?: {
				values?: Record<string, Value>
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
		tailwindConfig: Tailwind.ResolvedConfigJS
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
		(configOrPath?: Tailwind.ConfigJS | string): import("postcss").Plugin
	}

	interface resolveConfig {
		(...config: Tailwind.ConfigJS[]): Tailwind.ResolvedConfigJS
	}

	interface createContext {
		(
			config: Tailwind.ResolvedConfigJS,
			changedContent?: Array<{ content: string; extension: string }>,
			root?: import("postcss").Root,
		): Tailwind.Context
	}

	interface generateRules {
		(classnames: string[], context: Tailwind.Context): Array<
			[bigint, import("postcss").Rule]
		>
	}

	interface expandApplyAtRules {
		(context: Tailwind.Context): (root: import("postcss").Root) => void
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
	const colors: Tailwind.DefaultPalette
	export = colors
}

declare module "tailwindcss/colors.js" {
	const colors: Tailwind.DefaultPalette
	export = colors
}

declare module "tailwindcss/defaultConfig" {
	const config: Tailwind.DefaultConfig
	export = config
}

declare module "tailwindcss/defaultConfig.js" {
	const config: Tailwind.DefaultConfig
	export = config
}

declare module "tailwindcss/defaultTheme" {
	const theme: Tailwind.DefaultConfig["theme"]
	export = theme
}

declare module "tailwindcss/defaultTheme.js" {
	const theme: Tailwind.DefaultConfig["theme"]
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
	const createPlugin: Tailwind.createPlugin
	export = createPlugin
}

declare module "tailwindcss/plugin.js" {
	const createPlugin: Tailwind.createPlugin
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

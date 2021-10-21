// Type definitions for tailwindcss 2.2
// Project: https://github.com/tailwindlabs/tailwindcss
// Definitions by: lightyen <https://github.com/lightyen>

/// <reference path="colors.d.ts" />
/// <reference path="defaultConfig.d.ts" />

declare namespace Tailwind {
	type Value = string | number

	interface GetTheme {
		(key: string, defaultValue?: string): any
	}

	type Negative<T extends Record<number | string, string>> = {
		[P in keyof T as `-${(number | string) & P}`]: `-${T[P]}`
	}

	type BreakPoints<T extends Record<number | string, string>> = {
		[K in keyof T as `screen-${string & K}`]: T[K]
	}

	interface ResolvePathOptions {
		colors: Record<string, Record<string, string>>
		negative<T extends Record<string, string>>(
			value: T,
		): { [P in keyof T]: `-${T[P]}` }
		breakpoints<T extends Record<string, string>>(
			value: T,
		): { [K in keyof T as `screen-${string & K}`]: T[K] }
	}

	interface ResolvePath<T> {
		(theme: GetTheme, options: ResolvePathOptions): T
	}

	interface OpacityOptions {
		opacityValue: string
		opacityVariable: string
	}

	interface ColorConfig {
		50: Value
		100: Value
		200: Value
		300: Value
		400: Value
		500: Value
		600: Value
		700: Value
		800: Value
		900: Value
		DEFAULT: Value
	}

	interface ColorConfigFunc {
		50: (opacity: OpacityOptions) => Value
		100: (opacity: OpacityOptions) => Value
		200: (opacity: OpacityOptions) => Value
		300: (opacity: OpacityOptions) => Value
		400: (opacity: OpacityOptions) => Value
		500: (opacity: OpacityOptions) => Value
		600: (opacity: OpacityOptions) => Value
		700: (opacity: OpacityOptions) => Value
		800: (opacity: OpacityOptions) => Value
		900: (opacity: OpacityOptions) => Value
		DEFAULT: (opacity: OpacityOptions) => Value
	}

	type Colors<V> = Record<string, V> & {
		current?: V
		transparent?: V
		black?: V
		white?: V
		gray?: V
		red?: V
		yellow?: V
		green?: V
		blue?: V
		indigo?: V
		purple?: V
		pink?: V
		rose?: V
		fuchsia?: V
		violet?: V
		lightBlue?: V
		sky?: V
		cyan?: V
		teal?: V
		emerald?: V
		lime?: V
		amber?: V
		orange?: V
		warmGray?: V
		trueGray?: V
		coolGray?: V
		blueGray?: V
	}

	type Palette = Colors<
		| Value
		| (Partial<ColorConfig> & { [key: string]: Value })
		| (Partial<ColorConfigFunc> & {
				[key: string]: (opacity: OpacityOptions) => Value
		  })
		| ((
				opacity: OpacityOptions,
		  ) => Value | (Partial<ColorConfig> & { [key: string]: Value }))
	>

	type WithTheme<V> = V | ResolvePath<V>

	type ResolvedPalette = Colors<
		| Value
		| (Partial<ColorConfig> & { [key: string]: Value })
		| (Partial<ColorConfigFunc> & {
				[key: string]: (opacity: OpacityOptions) => Value
		  })
		| ((
				opacity: OpacityOptions,
		  ) => Value | (Partial<ColorConfig> & { [key: string]: Value }))
	>

	interface CorePluginFeatures {
		accessibility: boolean
		alignContent: boolean
		alignItems: boolean
		alignSelf: boolean
		animation: boolean
		appearance: boolean
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
		borderWidth: boolean
		boxDecorationBreak: boolean
		boxShadow: boolean
		boxSizing: boolean
		brightness: boolean
		caretColor: boolean
		clear: boolean
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
		outline: boolean
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
		sepia: boolean
		skew: boolean
		space: boolean
		stroke: boolean
		strokeWidth: boolean
		tableLayout: boolean
		textAlign: boolean
		textColor: boolean
		textDecoration: boolean
		textOpacity: boolean
		textOverflow: boolean
		textTransform: boolean
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
		wordBreak: boolean
		zIndex: boolean
	}

	type FontSizeValue =
		| Value
		| [
				fontSize: Value,
				options: { letterSpacing?: Value; lineHeight?: Value },
		  ]

	type FontSizeString = Value

	type KeyframesValue = Record<string, CSSProperties>
	type DropShadowValue = Value | Value[]
	type FontFamilyValue = Value | Value[]
	type OutlineValue = [outline: Value, outlineOffset: Value]

	interface Theme {
		extend?: Omit<Theme, "extend">
		fontSize?:
			| ResolvePath<Record<string, FontSizeValue>>
			| Record<string, FontSizeValue>
		keyframes?:
			| ResolvePath<Record<string, KeyframesValue>>
			| Record<string, KeyframesValue>
		dropShadow?:
			| ResolvePath<Record<string, DropShadowValue>>
			| Record<string, DropShadowValue>
		fontFamily?:
			| ResolvePath<Record<string, FontFamilyValue>>
			| Record<string, FontFamilyValue>
		outline?:
			| ResolvePath<Record<string, OutlineValue>>
			| Record<string, OutlineValue>
		colors?: WithTheme<Palette>
		backgroundColor?: WithTheme<Palette>
		borderColor?: WithTheme<Palette & { DEFAULT?: Value }>
		caretColor?: WithTheme<Palette>
		divideColor?: WithTheme<Palette & { DEFAULT?: Value }>
		gradientColorStops?: WithTheme<Palette>
		placeholderColor?: WithTheme<Palette>
		ringColor?: WithTheme<Palette & { DEFAULT?: Value }>
		ringOffsetColor?: WithTheme<Palette>
		textColor?: WithTheme<Palette>
		fill?: WithTheme<Palette>
		borderWidth?: ResolvePath<Record<string, Value>> | Record<string, Value>
		screens?: ResolvePath<Record<string, Value>> | Record<string, Value>
		spacing?: ResolvePath<Record<string, Value>> | Record<string, Value>
		animation?: ResolvePath<Record<string, Value>> | Record<string, Value>
		backdropBlur?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropBrightness?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropContrast?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropGrayscale?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropHueRotate?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropInvert?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropOpacity?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropSaturate?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backdropSepia?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backgroundImage?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backgroundOpacity?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backgroundPosition?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		backgroundSize?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		blur?: ResolvePath<Record<string, Value>> | Record<string, Value>
		brightness?: ResolvePath<Record<string, Value>> | Record<string, Value>
		borderOpacity?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		borderRadius?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		boxShadow?: ResolvePath<Record<string, Value>> | Record<string, Value>
		contrast?: ResolvePath<Record<string, Value>> | Record<string, Value>
		container?: ResolvePath<Record<string, Value>> | Record<string, Value>
		content?: ResolvePath<Record<string, Value>> | Record<string, Value>
		cursor?: ResolvePath<Record<string, Value>> | Record<string, Value>
		divideOpacity?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		divideWidth?: ResolvePath<Record<string, Value>> | Record<string, Value>
		grayscale?: ResolvePath<Record<string, Value>> | Record<string, Value>
		hueRotate?: ResolvePath<Record<string, Value>> | Record<string, Value>
		invert?: ResolvePath<Record<string, Value>> | Record<string, Value>
		flex?: ResolvePath<Record<string, Value>> | Record<string, Value>
		flexGrow?: ResolvePath<Record<string, Value>> | Record<string, Value>
		flexShrink?: ResolvePath<Record<string, Value>> | Record<string, Value>
		fontWeight?: ResolvePath<Record<string, Value>> | Record<string, Value>
		gap?: ResolvePath<Record<string, Value>> | Record<string, Value>
		gridAutoColumns?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		gridAutoRows?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		gridColumn?: ResolvePath<Record<string, Value>> | Record<string, Value>
		gridColumnEnd?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		gridColumnStart?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		gridRow?: ResolvePath<Record<string, Value>> | Record<string, Value>
		gridRowStart?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		gridRowEnd?: ResolvePath<Record<string, Value>> | Record<string, Value>
		gridTemplateColumns?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		gridTemplateRows?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		height?: ResolvePath<Record<string, Value>> | Record<string, Value>
		inset?: ResolvePath<Record<string, Value>> | Record<string, Value>
		letterSpacing?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		lineHeight?: ResolvePath<Record<string, Value>> | Record<string, Value>
		listStyleType?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		margin?: ResolvePath<Record<string, Value>> | Record<string, Value>
		maxHeight?: ResolvePath<Record<string, Value>> | Record<string, Value>
		maxWidth?: ResolvePath<Record<string, Value>> | Record<string, Value>
		minHeight?: ResolvePath<Record<string, Value>> | Record<string, Value>
		minWidth?: ResolvePath<Record<string, Value>> | Record<string, Value>
		objectPosition?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		opacity?: ResolvePath<Record<string, Value>> | Record<string, Value>
		order?: ResolvePath<Record<string, Value>> | Record<string, Value>
		padding?: ResolvePath<Record<string, Value>> | Record<string, Value>
		placeholderOpacity?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		ringOffsetWidth?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		ringOpacity?: ResolvePath<Record<string, Value>> | Record<string, Value>
		ringWidth?: ResolvePath<Record<string, Value>> | Record<string, Value>
		rotate?: ResolvePath<Record<string, Value>> | Record<string, Value>
		saturate?: ResolvePath<Record<string, Value>> | Record<string, Value>
		scale?: ResolvePath<Record<string, Value>> | Record<string, Value>
		sepia?: ResolvePath<Record<string, Value>> | Record<string, Value>
		skew?: ResolvePath<Record<string, Value>> | Record<string, Value>
		space?: ResolvePath<Record<string, Value>> | Record<string, Value>
		stroke?: ResolvePath<Record<string, Value>> | Record<string, Value>
		strokeWidth?: ResolvePath<Record<string, Value>> | Record<string, Value>
		textOpacity?: ResolvePath<Record<string, Value>> | Record<string, Value>
		transformOrigin?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		transitionDelay?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		transitionDuration?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		transitionProperty?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		transitionTimingFunction?:
			| ResolvePath<Record<string, Value>>
			| Record<string, Value>
		translate?: ResolvePath<Record<string, Value>> | Record<string, Value>
		width?: ResolvePath<Record<string, Value>> | Record<string, Value>
		zIndex?: ResolvePath<Record<string, Value>> | Record<string, Value>
	}

	interface CustomTheme {
		[key: string]: any
	}

	type Variant =
		| "responsive"
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
		"--tw-ordinal": Value
		"--tw-slashed-zero": Value
		"--tw-numeric-figure": Value
		"--tw-numeric-spacing": Value
		"--tw-numeric-fraction": Value
		"--tw-text-opacity": Value
		"--tw-placeholder-opacity": Value
		"--tw-shadow": Value
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
	}

	type DefinedCSSProperties = Partial<InnerCustomProperties> &
		import("csstype").Properties<Value>

	type CSSProperties = DefinedCSSProperties &
		Record<string, Value | DefinedCSSProperties>

	type Styles = Record<string, CSSProperties> | import("postcss").Node

	type PresetVariants = Partial<
		Record<
			keyof CorePluginFeatures,
			Variant[] | ((options: VariantFuncOption) => Variant[])
		>
	>

	interface Preset {
		presets?: Preset[]
		theme?: Theme | CustomTheme
		plugins?: Plugin[]
		corePlugins?:
			| Partial<CorePluginFeatures>
			| Array<keyof CorePluginFeatures>
		variants?: PresetVariants & { extend?: PresetVariants }
	}

	type SafeList = Array<string | { pattern: RegExp; variants: string[] }>
	type Content = Array<string | { raw: string }>
	type Extract =
		| ((content: string) => string)
		| Record<string, (content: string) => string>
	type Transform =
		| ((content: string) => string)
		| Record<string, (content: string) => string>

	interface PurgeConfig {
		mode?: "all"
		content?: Content
		transform?: Transform | { DEFAULT: Transform }
		preserveHtmlElements?: boolean
		layers?: Array<"base" | "components" | "utilities">
		enabled?: boolean
		safelist?: SafeList
		extract?: Extract | { DEFAULT: Extract }
		options?: any
	}

	interface ConfigJS extends Preset {
		mode?: "jit" | "aot"
		purge?: string[] | PurgeConfig
		separator?: string
		prefix?: string | ((classname: string) => string)
		important?: boolean
		darkMode?: false | "media" | "class"
		variantOrder?: Variant[]
		future?: "all" | Record<string, boolean>
		experimental?: "all" | Record<string, boolean>
	}

	type ResolvedResult<T, V = string> = Partial<T> & Record<string, V>

	type SpacingConfig = {
		0: string
		1: string
		2: string
		3: string
		4: string
		5: string
		6: string
		7: string
		8: string
		9: string
		10: string
		11: string
		12: string
		14: string
		16: string
		20: string
		24: string
		28: string
		32: string
		36: string
		40: string
		44: string
		48: string
		52: string
		56: string
		60: string
		64: string
		72: string
		80: string
		96: string
		px: string
		0.5: string
		1.5: string
		2.5: string
		3.5: string
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

	interface ResolvedConfigJS {
		mode?: ConfigJS["mode"]
		purge?: ConfigJS["purge"]
		separator: string
		prefix: string | ((classname: string) => string)
		important: boolean
		darkMode: false | "media" | "class"
		corePlugins: Array<keyof CorePluginFeatures>
		variantOrder: Variant[]
		presets: Preset[]
		plugins: Plugin[]
		theme: {
			screens: ResolvedResult<{
				sm: string
				md: string
				lg: string
				xl: string
				"2xl": string
			}>
			colors: ResolvedPalette
			spacing: ResolvedResult<SpacingConfig>
			animation: ResolvedResult<{
				none: string
				spin: string
				ping: string
				pulse: string
				bounce: string
			}>
			backdropBlur: ResolvedResult<{
				0: string
				none: string
				sm: string
				DEFAULT: string
				md: string
				lg: string
				xl: string
				"2xl": string
				"3xl": string
			}>
			backdropBrightness: ResolvedResult<{
				0: string
				50: string
				75: string
				90: string
				95: string
				100: string
				105: string
				110: string
				125: string
				150: string
				200: string
			}>
			backdropContrast: ResolvedResult<{
				0: string
				50: string
				75: string
				100: string
				125: string
				150: string
				200: string
			}>
			backdropGrayscale: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			backdropHueRotate: ResolvedResult<{
				0: string
				15: string
				30: string
				60: string
				90: string
				180: string
				"-180": string
				"-90": string
				"-60": string
				"-30": string
				"-15": string
			}>
			backdropInvert: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			backdropOpacity: ResolvedResult<OpacityConfig>
			backdropSaturate: ResolvedResult<{
				0: string
				50: string
				100: string
				150: string
				200: string
			}>
			backdropSepia: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			backgroundColor: ResolvedPalette
			backgroundImage: ResolvedResult<{
				none: string
				"gradient-to-t": string
				"gradient-to-tr": string
				"gradient-to-r": string
				"gradient-to-br": string
				"gradient-to-b": string
				"gradient-to-bl": string
				"gradient-to-l": string
				"gradient-to-tl": string
			}>
			backgroundOpacity: ResolvedResult<OpacityConfig>
			backgroundPosition: ResolvedResult<{
				bottom: string
				center: string
				left: string
				"left-bottom": string
				"left-top": string
				right: string
				"right-bottom": string
				"right-top": string
				top: string
			}>
			backgroundSize: ResolvedResult<{
				auto: string
				cover: string
				contain: string
			}>
			blur: ResolvedResult<{
				0: string
				none: string
				sm: string
				DEFAULT: string
				md: string
				lg: string
				xl: string
				"2xl": string
				"3xl": string
			}>
			brightness: ResolvedResult<{
				0: string
				50: string
				75: string
				90: string
				95: string
				100: string
				105: string
				110: string
				125: string
				150: string
				200: string
			}>
			borderColor: ResolvedPalette &
				ResolvedResult<{
					DEFAULT: string
				}>
			borderOpacity: ResolvedResult<OpacityConfig>
			borderRadius: ResolvedResult<{
				none: string
				sm: string
				DEFAULT: string
				md: string
				lg: string
				xl: string
				"2xl": string
				"3xl": string
				full: string
			}>
			borderWidth: ResolvedResult<{
				0: string
				2: string
				4: string
				8: string
				DEFAULT: string
			}>
			boxShadow: ResolvedResult<{
				sm: string
				DEFAULT: string
				md: string
				lg: string
				xl: string
				"2xl": string
				inner: string
				none: string
			}>
			caretColor: ResolvedPalette
			contrast: ResolvedResult<{
				0: string
				50: string
				75: string
				100: string
				125: string
				150: string
				200: string
			}>
			container: ResolvedResult<{}>
			content: ResolvedResult<{
				none: string
			}>
			cursor: ResolvedResult<{
				auto: string
				default: string
				pointer: string
				wait: string
				text: string
				move: string
				help: string
				"not-allowed": string
			}>
			divideColor: ResolvedPalette &
				ResolvedResult<{
					DEFAULT: string
				}>
			divideOpacity: ResolvedResult<{
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
			}>
			divideWidth: ResolvedResult<{
				0: string
				2: string
				4: string
				8: string
				DEFAULT: string
			}>
			dropShadow: ResolvedResult<{
				DEFAULT: string | string[]
				sm: string | string[]
				md: string | string[]
				lg: string | string[]
				xl: string | string[]
				"2xl": string | string[]
				none: string | string[]
			}>
			fill: ResolvedPalette &
				ResolvedResult<{
					current: string
				}>
			grayscale: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			hueRotate: ResolvedResult<{
				0: string
				15: string
				30: string
				60: string
				90: string
				180: string
				"-180": string
				"-90": string
				"-60": string
				"-30": string
				"-15": string
			}>
			invert: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			flex: ResolvedResult<{
				1: string
				auto: string
				initial: string
				none: string
			}>
			flexGrow: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			flexShrink: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			fontFamily: ResolvedResult<{
				sans: string | string[]
				serif: string | string[]
				mono: string | string[]
			}>
			fontSize: ResolvedResult<
				{
					xs: FontSizeValue
					sm: FontSizeValue
					base: FontSizeValue
					lg: FontSizeValue
					xl: FontSizeValue
					"2xl": FontSizeValue
					"3xl": FontSizeValue
					"4xl": FontSizeValue
					"5xl": FontSizeValue
					"6xl": FontSizeValue
					"7xl": FontSizeValue
					"8xl": FontSizeValue
					"9xl": FontSizeValue
				},
				FontSizeValue
			>
			fontWeight: ResolvedResult<{
				thin: string
				extralight: string
				light: string
				normal: string
				medium: string
				semibold: string
				bold: string
				extrabold: string
				black: string
			}>
			gap: ResolvedResult<SpacingConfig>
			gradientColorStops: ResolvedPalette
			gridAutoColumns: ResolvedResult<{
				auto: string
				min: string
				max: string
				fr: string
			}>
			gridAutoRows: ResolvedResult<{
				auto: string
				min: string
				max: string
				fr: string
			}>
			gridColumn: ResolvedResult<{
				auto: string
				"span-1": string
				"span-2": string
				"span-3": string
				"span-4": string
				"span-5": string
				"span-6": string
				"span-7": string
				"span-8": string
				"span-9": string
				"span-10": string
				"span-11": string
				"span-12": string
				"span-full": string
			}>
			gridColumnEnd: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				7: string
				8: string
				9: string
				10: string
				11: string
				12: string
				13: string
				auto: string
			}>
			gridColumnStart: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				7: string
				8: string
				9: string
				10: string
				11: string
				12: string
				13: string
				auto: string
			}>
			gridRow: ResolvedResult<{
				auto: string
				"span-1": string
				"span-2": string
				"span-3": string
				"span-4": string
				"span-5": string
				"span-6": string
				"span-full": string
			}>
			gridRowStart: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				7: string
				auto: string
			}>
			gridRowEnd: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				7: string
				auto: string
			}>
			gridTemplateColumns: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				7: string
				8: string
				9: string
				10: string
				11: string
				12: string
				none: string
			}>
			gridTemplateRows: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				none: string
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
					Negative<SpacingConfig> & {
						auto: string
						"1/2": string
						"1/3": string
						"2/3": string
						"1/4": string
						"2/4": string
						"3/4": string
						full: string
						"-1/2": string
						"-1/3": string
						"-2/3": string
						"-1/4": string
						"-2/4": string
						"-3/4": string
						"-full": string
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
				tighter: string
				tight: string
				normal: string
				wide: string
				wider: string
				widest: string
			}>
			lineHeight: ResolvedResult<{
				3: string
				4: string
				5: string
				6: string
				7: string
				8: string
				9: string
				10: string
				none: string
				tight: string
				snug: string
				normal: string
				relaxed: string
				loose: string
			}>
			listStyleType: ResolvedResult<{
				none: string
				disc: string
				decimal: string
			}>
			margin: ResolvedResult<
				SpacingConfig &
					Negative<SpacingConfig> & {
						auto: string
					}
			>
			maxHeight: ResolvedResult<
				SpacingConfig & {
					full: string
					screen: string
				}
			>
			maxWidth: ResolvedResult<{
				0: string
				none: string
				xs: string
				sm: string
				md: string
				lg: string
				xl: string
				"2xl": string
				"3xl": string
				"4xl": string
				"5xl": string
				"6xl": string
				"7xl": string
				full: string
				min: string
				max: string
				prose: string
				"screen-sm": string
				"screen-md": string
				"screen-lg": string
				"screen-xl": string
				"screen-2xl": string
			}>
			minHeight: ResolvedResult<{
				0: string
				full: string
				screen: string
			}>
			minWidth: ResolvedResult<{
				0: string
				full: string
				min: string
				max: string
			}>
			objectPosition: ResolvedResult<{
				bottom: string
				center: string
				left: string
				"left-bottom": string
				"left-top": string
				right: string
				"right-bottom": string
				"right-top": string
				top: string
			}>
			opacity: ResolvedResult<OpacityConfig>
			order: ResolvedResult<{
				1: string
				2: string
				3: string
				4: string
				5: string
				6: string
				7: string
				8: string
				9: string
				10: string
				11: string
				12: string
				first: string
				last: string
				none: string
			}>
			outline: ResolvedResult<
				{
					none: OutlineValue
					white: OutlineValue
					black: OutlineValue
				},
				OutlineValue
			>
			padding: ResolvedResult<SpacingConfig>
			placeholderColor: ResolvedPalette
			placeholderOpacity: ResolvedResult<OpacityConfig>
			ringColor: ResolvedPalette &
				ResolvedResult<{
					DEFAULT: string
				}>
			ringOffsetColor: ResolvedPalette
			ringOffsetWidth: ResolvedResult<{
				0: string
				1: string
				2: string
				4: string
				8: string
			}>
			ringOpacity: ResolvedResult<
				OpacityConfig & {
					DEFAULT: string
				}
			>
			ringWidth: ResolvedResult<{
				0: string
				1: string
				2: string
				4: string
				8: string
				DEFAULT: string
			}>
			rotate: ResolvedResult<{
				0: string
				1: string
				2: string
				3: string
				6: string
				12: string
				45: string
				90: string
				180: string
				"-180": string
				"-90": string
				"-45": string
				"-12": string
				"-6": string
				"-3": string
				"-2": string
				"-1": string
			}>
			saturate: ResolvedResult<{
				0: string
				50: string
				100: string
				150: string
				200: string
			}>
			scale: ResolvedResult<{
				0: string
				50: string
				75: string
				90: string
				95: string
				100: string
				105: string
				110: string
				125: string
				150: string
			}>
			sepia: ResolvedResult<{
				0: string
				DEFAULT: string
			}>
			skew: ResolvedResult<{
				0: string
				1: string
				2: string
				3: string
				6: string
				12: string
				"-12": string
				"-6": string
				"-3": string
				"-2": string
				"-1": string
			}>
			space: ResolvedResult<SpacingConfig & Negative<SpacingConfig>>
			stroke: ResolvedPalette &
				ResolvedResult<{
					current: string
				}>
			strokeWidth: ResolvedResult<{
				0: string
				1: string
				2: string
			}>
			textColor: ResolvedPalette
			textOpacity: ResolvedResult<OpacityConfig>
			transformOrigin: ResolvedResult<{
				center: string
				top: string
				"top-right": string
				right: string
				"bottom-right": string
				bottom: string
				"bottom-left": string
				left: string
				"top-left": string
			}>
			transitionDelay: ResolvedResult<{
				75: string
				100: string
				150: string
				200: string
				300: string
				500: string
				700: string
				1000: string
			}>
			transitionDuration: ResolvedResult<{
				75: string
				100: string
				150: string
				200: string
				300: string
				500: string
				700: string
				1000: string
			}>
			transitionProperty: ResolvedResult<{
				none: string
				all: string
				DEFAULT: string
				colors: string
				opacity: string
				shadow: string
				transform: string
			}>
			transitionTimingFunction: ResolvedResult<{
				linear: string
				in: string
				out: string
				"in-out": string
			}>
			translate: ResolvedResult<
				SpacingConfig &
					Negative<SpacingConfig> & {
						"1/2": string
						"1/3": string
						"2/3": string
						"1/4": string
						"2/4": string
						"3/4": string
						full: string
						"-1/2": string
						"-1/3": string
						"-2/3": string
						"-1/4": string
						"-2/4": string
						"-3/4": string
						"-full": string
					}
			>
			width: ResolvedResult<
				SpacingConfig & {
					auto: string
					"1/2": string
					"1/3": string
					"2/3": string
					"1/4": string
					"2/4": string
					"3/4": string
					"1/5": string
					"2/5": string
					"3/5": string
					"4/5": string
					"1/6": string
					"2/6": string
					"3/6": string
					"4/6": string
					"5/6": string
					"1/12": string
					"2/12": string
					"3/12": string
					"4/12": string
					"5/12": string
					"6/12": string
					"7/12": string
					"8/12": string
					"9/12": string
					"10/12": string
					"11/12": string
					full: string
					screen: string
					min: string
					max: string
				}
			>
			zIndex: ResolvedResult<{
				0: string
				10: string
				20: string
				30: string
				40: string
				50: string
				auto: string
			}>
		}
	}

	interface Generator {
		(opts: {
			container: import("postcss").Root
			separator?: string
			modifySelectors?(
				modifierFunction: (opts: {
					className: string
					selector: string
				}) => string,
			): import("postcss").Root
		}): void
	}
}

declare namespace Tailwind {
	interface PluginOptions {
		/** Register new base styles. */
		addBase(styles: Styles | Styles[]): void

		/** Register new component styles. */
		addComponents(
			styles: Styles | Styles[],
			options?:
				| Variant[]
				| {
						variants?: Variant[]
						respectPrefix?: boolean
						respectImportant?: boolean
				  },
		): void

		/** Register new utility styles. */
		addUtilities(
			styles: Styles | Styles[],
			options?:
				| Variant[]
				| {
						variants?: Variant[]
						respectPrefix?: boolean
						respectImportant?: boolean
				  },
		): void

		/** Register custom variants. */
		addVariant(
			variantName: string,
			generator: Generator | Generator[],
			options?: any,
		): void

		/** Escape strings meant to be used in class names. */
		e(classname: string): string

		/** Look up values in the user's Tailwind configuration. */
		config(path: string, defaultValue?: any): any

		/** Look up values in the user's theme configuration. */
		theme(path: string, defaultValue?: any): any

		/** Apply the user's configured prefix to parts of a selector. */
		prefix(prefix: string): string

		corePlugins(name: keyof CorePluginFeatures): boolean

		matchUtilities(
			param: Record<string, (value: Value) => CSSProperties>,
			options?: {
				values: string[]
				type?: string | string[] | undefined
			},
		): void

		/** @deprecated Look up values in the user's variants configuration. */
		variants(features: keyof CorePluginFeatures): Variant[]

		/** low-level manipulation with PostCSS directly */
		postcss: import("postcss").Postcss
	}

	interface PluginFunction {
		(options: PluginOptions): void
	}

	interface PluginObject {
		handler?: PluginFunction
		config?: ConfigJS
	}

	type Plugin = PluginFunction | PluginObject

	type OptionType<F> = F extends (options: infer P) => any ? P : F

	interface createPlugin {
		(
			handler: Tailwind.PluginFunction,
			config?: Tailwind.ConfigJS,
		): Tailwind.PluginObject
		withOptions<P extends (options: any) => Tailwind.PluginFunction>(
			pluginFunction: P,
			configFunction?: (options: OptionType<P>) => Tailwind.ConfigJS,
		): (options: OptionType<P>) => PluginObject & {
			__options: OptionType<P>
			__isOptionsFunction: true
			__pluginFunction: P
			__configFunction?: (options: OptionType<P>) => Tailwind.ConfigJS
		}
	}
}

declare namespace Tailwind {
	interface Context {
		variantMap: Map<string, Array<[bigint, Generator]>>
		tailwindConfig: Tailwind.ResolvedConfigJS
		changedContent: Array<{ content: string; extension: string }>
		candidateRuleMap: Map<string, Array<any>>
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
			tailwindDirectives?: Set<string>,
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
}

declare module "tailwindcss" {
	/**
	 * If param is not set, Tailwind will look for an optional `tailwind.config.js` file at
	 * the root of your project where you can define any customizations.
	 */
	const tailwindcss: Tailwind.tailwindcss
	export = tailwindcss
}

declare module "tailwindcss/colors" {
	const colors: Tailwind.DefaultPalette
	export = colors
}

declare module "tailwindcss/defaultConfig" {
	const config: Tailwind.DefaultConfig
	export = config
}

declare module "tailwindcss/defaultTheme" {
	const theme: Tailwind.DefaultConfig["theme"]
	export = theme
}

declare module "tailwindcss/resolveConfig" {
	/** Generate a fully merged version of configuration. */
	const resolveConfig: Tailwind.resolveConfig
	export = resolveConfig
}

declare module "tailwindcss/plugin" {
	const createPlugin: Tailwind.createPlugin
	export = createPlugin
}

declare module "tailwindcss/lib/corePluginList" {
	const corePluginList: Array<keyof Tailwind.CorePluginFeatures>
	export default corePluginList
}

declare module "tailwindcss/lib/jit/lib/setupContextUtils" {
	export const createContext: Tailwind.createContext
}
declare module "tailwindcss/lib/jit/lib/generateRules" {
	export const generateRules: Tailwind.generateRules
}
declare module "tailwindcss/lib/jit/lib/expandApplyAtRules" {
	const expandApplyAtRules: Tailwind.expandApplyAtRules
	export = expandApplyAtRules
}

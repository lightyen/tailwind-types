declare namespace Tailwind {
	type CSSValue = string | number

	type CSSTYPE = import("csstype").Properties<CSSValue>

	interface DefinedCSSProperties extends ConfigObject, CSSTYPE {}

	interface CSSProperties extends ConfigObject {
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
}

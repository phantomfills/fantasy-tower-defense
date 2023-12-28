export type Possible<ValueType> =
	| {
			exists: true;
			value: ValueType;
	  }
	| {
			exists: false;
	  };

export function possible<ValueType>(value: ValueType | undefined): Possible<ValueType> {
	return value === undefined ? { exists: false } : { exists: true, value };
}

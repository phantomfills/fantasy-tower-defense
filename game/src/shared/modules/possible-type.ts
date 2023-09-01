export type Possible<T> =
	| {
			exists: true;
			value: T;
	  }
	| {
			exists: false;
	  };

export const optionalToPossible = <T>(value: T | undefined): Possible<T> => {
	const valueAsType = value as T;
	if (valueAsType === undefined)
		return {
			exists: false,
		};
	return {
		exists: true,
		value: valueAsType,
	};
};

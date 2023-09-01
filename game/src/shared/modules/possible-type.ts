export type Possible<T> =
	| {
			exists: true;
			value: T;
	  }
	| {
			exists: false;
	  };

export const optionalToPossible = <T>(value: T): Possible<T> => {
	if (value === undefined)
		return {
			exists: false,
		};
	return {
		exists: true,
		value: value,
	};
};

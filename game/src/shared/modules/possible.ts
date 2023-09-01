export type Possible<T> =
	| {
			exists: true;
			value: T;
	  }
	| {
			exists: false;
	  };

export const possible = <T>(value: T | undefined): Possible<T> => {
	if (value === undefined)
		return {
			exists: false,
		};
	const castedValue = value as T;
	return {
		exists: true,
		value: castedValue,
	};
};

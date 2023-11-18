export type Possible<T> =
	| {
			exists: true;
			value: T;
	  }
	| {
			exists: false;
	  };

export function possible<T>(value: T | undefined): Possible<T> {
	return value !== undefined ? { exists: true, value } : { exists: false };
}

export type Possible<T> =
	| {
			exists: true;
			value: T;
	  }
	| {
			exists: false;
	  };

export function holdFor(milliseconds: number) {
	task.wait(milliseconds / 1000);
}

export function holdForPromise(milliseconds: number): Promise<void> {
	return new Promise((resolve) => {
		holdFor(milliseconds);
		resolve();
	});
}

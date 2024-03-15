export function holdFor(milliseconds: number) {
	task.wait(milliseconds / 1000);
}

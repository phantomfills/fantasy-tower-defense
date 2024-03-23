export function abbreviateNumber(value: number): string {
	let newValue = value;
	if (value >= 1000000) {
		newValue = math.floor((value / 1000000) * 10) / 10;
		return tostring(newValue) + "M";
	} else if (value >= 1000) {
		newValue = math.floor((value / 1000) * 10) / 10;
		return tostring(newValue) + "K";
	}
	return tostring(newValue);
}

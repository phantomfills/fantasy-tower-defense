export function formatNumberWithCommas(number: number): string {
	const numberString = tostring(number);
	let result = "";
	let count = 0;

	for (let i = numberString.size(); i > 0; i--) {
		if (count % 3 === 0 && count !== 0) {
			result = "," + result;
		}
		result = numberString.sub(i, i) + result;
		count++;
	}

	return result;
}

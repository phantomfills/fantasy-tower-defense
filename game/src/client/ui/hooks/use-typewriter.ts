import { useEffect, useState } from "@rbxts/roact";
import { setInterval } from "@rbxts/set-timeout";

export function useTypewriter(text: string, speed: number = 50) {
	const [displayText, setDisplayText] = useState("");

	useEffect(() => {
		setDisplayText("");

		let index = 0;

		const disconnectTypingInterval = setInterval(() => {
			if (index > text.size()) {
				disconnectTypingInterval();
				return;
			}

			setDisplayText((previousText) => previousText + text.sub(index, index));
			index++;
		}, speed / 1000);

		return () => {
			disconnectTypingInterval();
		};
	}, [text, speed]);

	return displayText;
}

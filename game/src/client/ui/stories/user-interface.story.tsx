import Roact from "@rbxts/roact";
import { UserInterface } from "../user-interface";
import { createRoot } from "@rbxts/react-roblox";

export = (target: Frame) => {
	const userInterface = (
		<UserInterface
			towers={[
				{
					number: 1,
					callback: () => {
						print("Hello");
					},
					cost: 100,
					icon: `rbxassetid://1022613008`,
				},
			]}
		/>
	);

	const root = createRoot(target);
	root.render(userInterface);

	return () => {
		root.unmount();
	};
};

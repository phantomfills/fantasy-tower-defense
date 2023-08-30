import Roact, { useState } from "@rbxts/roact";
import Maid from "@rbxts/maid";
import { useUnmountEffect } from "@rbxts/pretty-react-hooks";
import { UserInputService } from "@rbxts/services";

type Possible<T> =
	| {
			exists: true;
			value: T;
	  }
	| {
			exists: false;
	  };

interface HotbarSlotProps {
	slotNumber: number;
}

const slotNumberToKeyCode = [
	Enum.KeyCode.One,
	Enum.KeyCode.Two,
	Enum.KeyCode.Three,
	Enum.KeyCode.Four,
	Enum.KeyCode.Five,
	Enum.KeyCode.Six,
	Enum.KeyCode.Seven,
	Enum.KeyCode.Eight,
	Enum.KeyCode.Nine,
	Enum.KeyCode.Zero,
] as const;

const getKeyCodeFromSlotNumber = (slotNumber: number): Possible<Enum.KeyCode> => {
	const keyCode = slotNumberToKeyCode[slotNumber];
	if (!keyCode)
		return {
			exists: false,
		};

	return {
		exists: true,
		value: keyCode,
	};
};

export const HotbarSlot = (props: HotbarSlotProps) => {
	const { slotNumber } = props;

	const [hovering, updateHovering] = useState(false);
	const maid = new Maid();

	useUnmountEffect(() => {
		maid.Destroy();
	});

	const keyCode = getKeyCodeFromSlotNumber(slotNumber - 1);

	maid.GiveTask(
		UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;
			if (!keyCode.exists) return;
			if (keyCode.value !== input.KeyCode) return;

			updateHovering(true);
		}),
	);

	maid.GiveTask(
		UserInputService.InputEnded.Connect((input, processed) => {
			if (processed) return;
			if (!keyCode.exists) return;
			if (keyCode.value !== input.KeyCode) return;

			updateHovering(false);
		}),
	);

	return (
		<textbutton
			BackgroundColor3={Color3.fromRGB(32, 32, 32)}
			BackgroundTransparency={0.12}
			Text=""
			AutoButtonColor={false}
			Event={{
				MouseEnter: () => {
					updateHovering(true);
				},
				MouseLeave: () => {
					updateHovering(false);
				},
				MouseButton1Down: () => {
					updateHovering(false);
				},
				MouseButton1Up: () => {
					updateHovering(true);
				},
			}}
		>
			<uiaspectratioconstraint DominantAxis={Enum.DominantAxis.Height} AspectRatio={1} />
			<uicorner CornerRadius={new UDim(0.5, 0)} />
			<uistroke
				Color={hovering ? Color3.fromRGB(255, 255, 255) : Color3.fromRGB(80, 80, 80)}
				Thickness={1}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			/>
			<textlabel
				Size={new UDim2(0.3, 0, 0.3, 0)}
				BackgroundTransparency={1}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				Text={tostring(slotNumber)}
				Font={Enum.Font.GothamBold}
			>
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</textlabel>
		</textbutton>
	);
};

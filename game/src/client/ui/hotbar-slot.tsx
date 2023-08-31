import Roact, { useEffect, useState } from "@rbxts/roact";
import { useMotor, Spring, lerpBinding } from "@rbxts/pretty-react-hooks";
import { CashLabel } from "./cash-label";

interface HotbarSlotProps {
	slotNumber: number;
	callback: () => void;
	imageId: number;
	children?: ReadonlyArray<Roact.Element>;
}

export const HotbarSlot = (props: HotbarSlotProps) => {
	const { slotNumber, imageId, children, callback } = props;

	const [hovering, setHovering] = useState(false);
	const [transition, setTransition] = useMotor(0);

	useEffect(() => {
		setTransition(
			new Spring(hovering ? 1 : 0, {
				dampingRatio: 0.9,
				frequency: 5,
			}),
		);
	}, [hovering]);

	return (
		<textbutton
			BackgroundColor3={lerpBinding(transition, Color3.fromRGB(25, 25, 25), Color3.fromRGB(60, 60, 60))}
			BackgroundTransparency={0.12}
			Text=""
			AutoButtonColor={false}
			Event={{
				MouseEnter: () => {
					setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
				},
				MouseButton1Down: () => {
					callback();
					setHovering(false);
				},
				MouseButton1Up: () => {
					setHovering(true);
				},
			}}
		>
			{children}
			<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={`rbxassetid://${imageId}`} />
			<uiaspectratioconstraint DominantAxis={Enum.DominantAxis.Height} AspectRatio={1} />
			<uicorner CornerRadius={new UDim(0.5, 0)} />
			<uistroke
				Color={hovering ? Color3.fromRGB(255, 255, 255) : Color3.fromRGB(80, 80, 80)}
				Thickness={2}
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
				<uistroke Color={Color3.fromRGB(0, 0, 0)} Thickness={2} />
			</textlabel>
			<CashLabel position={new UDim2(0, 0, 0.7, 0)} size={new UDim2(1, 0, 0.3, 0)} value={2000} />
		</textbutton>
	);
};

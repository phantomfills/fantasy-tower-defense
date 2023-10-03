import { Spring, lerp, lerpBinding, useMotor } from "@rbxts/pretty-react-hooks";
import Roact, { useEffect, useState } from "@rbxts/roact";

export interface TowerSlotProps {
	number: number;
	callback: () => void;
	icon: string;
}

export const TowerSlot = (props: TowerSlotProps) => {
	const { number, callback } = props;

	const [hovering, setHovering] = useState(false);
	const [transition, setTransition] = useMotor(0);

	useEffect(() => {
		setTransition(
			new Spring(hovering ? 1 : 0, {
				dampingRatio: 0.6,
				frequency: 3,
			}),
		);
	}, [hovering]);

	return (
		<textbutton
			Size={new UDim2(1, 0, 1, 0)}
			BackgroundColor3={Color3.fromRGB(25, 25, 25)}
			Position={lerpBinding(transition, new UDim2(0, 0, 0, 0), new UDim2(0, 0, -0.1, 0))}
			Text=""
			AutoButtonColor={false}
			Event={{
				MouseEnter: () => {
					setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
				},
				MouseButton1Click: () => {
					callback();
				},
			}}
		>
			<imagelabel
				Image={props.icon}
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				ZIndex={2}
				Position={lerpBinding(transition, new UDim2(0, 0, 0, 0), new UDim2(0, 0, -0.1, 0))}
			/>
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<uistroke
				Color={Color3.fromRGB(255, 255, 255)}
				Thickness={1}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			/>
			<frame
				Size={new UDim2(0.4, 0, 0.4, 0)}
				BackgroundColor3={lerpBinding(transition, Color3.fromRGB(0, 120, 255), Color3.fromRGB(0, 190, 255))}
				Position={new UDim2(-0.125, 0, -0.125, 0)}
				Rotation={lerpBinding(transition, -10, 10)}
			>
				<uistroke Color={Color3.fromRGB(255, 255, 255)} Thickness={lerpBinding(transition, 2, 4)} />
				<uicorner CornerRadius={new UDim(1, 0)} />
				<textlabel
					TextScaled={true}
					Text={tostring(number)}
					Font={Enum.Font.GothamBold}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Center}
					BackgroundTransparency={1}
					Size={new UDim2(1, 0, 1, 0)}
				/>
			</frame>
		</textbutton>
	);
};

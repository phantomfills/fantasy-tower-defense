import Roact, { useEffect } from "@rbxts/roact";
import { Frame } from "../utils/frame";
import { Spring, lerpBinding, useMotor } from "@rbxts/pretty-react-hooks";

interface TowerLoadoutProps extends Roact.PropsWithChildren {
	visible: boolean;
	children?: Roact.Children;
}

export function TowerLoadout({ children, visible }: TowerLoadoutProps) {
	const [transition, setTransition] = useMotor(visible ? 1 : 0);

	useEffect(() => {
		setTransition(
			visible
				? new Spring(0, {
						frequency: 8,
						dampingRatio: 4,
				  })
				: new Spring(1, {
						frequency: 2,
						dampingRatio: 2.25,
				  }),
		);
	});

	return (
		<Frame
			position={lerpBinding(transition, new UDim2(0, 0, 0.8, -5), new UDim2(0, 0, 1.5, -5))}
			size={new UDim2(1, 0, 0.2, 0)}
		>
			<uigridlayout
				CellSize={new UDim2(0.075, 0, 1, 0)}
				CellPadding={new UDim2(0.025, 0, 0, 0)}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			{children}
		</Frame>
	);
}

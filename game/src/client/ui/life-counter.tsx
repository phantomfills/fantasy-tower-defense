import Roact from "@rbxts/roact";

interface LifeCounterProps {
	lives: number;
}

export const LifeCounter = ({ lives }: LifeCounterProps) => {
	return (
		<textlabel
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Text={`Lives: ${lives}`}
		></textlabel>
	);
};

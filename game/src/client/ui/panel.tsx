import Roact from "@rbxts/roact";

interface PanelProps extends Roact.PropsWithChildren {
	children?: Roact.Children;
}

export function Panel({ children }: PanelProps) {
	return (
		<screengui IgnoreGuiInset={true} ResetOnSpawn={false}>
			{children}
		</screengui>
	);
}
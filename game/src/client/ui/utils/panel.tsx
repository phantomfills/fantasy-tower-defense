import React from "@rbxts/react";

interface PanelProps extends React.PropsWithChildren {}

export function Panel({ children }: PanelProps) {
	return (
		<screengui IgnoreGuiInset={true} ResetOnSpawn={false}>
			{children}
		</screengui>
	);
}

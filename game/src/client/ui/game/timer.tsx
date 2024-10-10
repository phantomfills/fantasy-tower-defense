import React from "@rbxts/react";
import { style } from "client/constants/style";
import { fonts } from "../constants/fonts";
import { Label } from "../utils/label";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { Frame } from "../utils/frame";

interface TimerProps {
	time?: number;
	alpha: React.Binding<number>;
	size: UDim2;
	position: UDim2;
}

export function Timer({ time, alpha, size, position }: TimerProps) {
	const rotationDegrees = alpha.map((a) => a * 360);

	return (
		<Frame size={size} position={position} backgroundTransparency={1}>
			<Frame size={new UDim2(1, 0, 1, 0)} backgroundTransparency={0} backgroundColor={style.black}>
				<uicorner CornerRadius={new UDim(0.5, 0)} />
			</Frame>

			<Frame
				size={new UDim2(0.8, 0, 0.8, 0)}
				position={new UDim2(0.1, 0, 0.1, 0)}
				backgroundTransparency={0}
				backgroundColor={style.black}
				zIndex={3}
			>
				<Label
					size={new UDim2(0.75, 0, 0.75, 0)}
					position={new UDim2(0.125, 0, 0.15, 0)}
					text={tostring(time ?? 0)}
					font={fonts.inter.bold}
					textColor={style.white}
					zIndex={4}
				/>
				<uicorner CornerRadius={new UDim(0.5, 0)} />
			</Frame>

			<Frame size={new UDim2(0.5, 0, 1, 0)} backgroundTransparency={1} key="left" clipsDescendants>
				<Frame
					size={new UDim2(1, 0, 1, 0)}
					backgroundTransparency={0}
					backgroundColor={Color3.fromRGB(255, 255, 255)}
					sizeConstraint={Enum.SizeConstraint.RelativeYY}
				>
					<uigradient
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, style.white),
								new ColorSequenceKeypoint(0.5, style.white),
								new ColorSequenceKeypoint(0.501, style.black),
								new ColorSequenceKeypoint(1, style.black),
							])
						}
						Rotation={rotationDegrees.map((r) => math.clamp(r, 180, 360))}
					/>
					<uicorner CornerRadius={new UDim(0.5, 0)} />
				</Frame>
			</Frame>

			<Frame
				size={new UDim2(0.5, 0, 1, 0)}
				position={new UDim2(0.5, 0, 0, 0)}
				backgroundTransparency={1}
				key="right"
				clipsDescendants
			>
				<Frame
					size={new UDim2(1, 0, 1, 0)}
					position={new UDim2(-1, 0, 0, 0)}
					backgroundTransparency={0}
					backgroundColor={Color3.fromRGB(255, 255, 255)}
					sizeConstraint={Enum.SizeConstraint.RelativeYY}
				>
					<uigradient
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(0, style.white),
								new ColorSequenceKeypoint(0.5, style.white),
								new ColorSequenceKeypoint(0.501, style.black),
								new ColorSequenceKeypoint(1, style.black),
							])
						}
						Rotation={rotationDegrees.map((r) => math.clamp(r, 0, 180))}
					/>
					<uicorner CornerRadius={new UDim(0.5, 0)} />
				</Frame>
			</Frame>
		</Frame>
	);
}

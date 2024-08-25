import React from "@rbxts/react";
import { Frame } from "../utils/frame";
import { Label } from "../utils/label";
import { fonts } from "../constants/fonts";
import { OneThickWhiteStroke } from "../utils/one-thick-white-stroke";
import { producer } from "client/store";
import { ObjectiveCards } from "./objective-cards";
import { images } from "shared/assets";
import { Overlay } from "./overlay";
import { style } from "client/constants/style";
import { Blur } from "./blur";

export function ObjectivesButton() {
	return (
		<Frame
			size={new UDim2(0, 30, 0, 30)}
			position={new UDim2(0, 0, 1, -65)}
			backgroundTransparency={0.5}
			backgroundColor={style.black}
		>
			<textbutton
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				Text=""
				Event={{
					MouseButton1Click: () => {
						producer.setPage("OBJECTIVES");
					},
				}}
			/>
			<imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={images.objectives} />
			<uicorner CornerRadius={new UDim(0, 10)} />
			<OneThickWhiteStroke />
		</Frame>
	);
}

interface ObjectiveProps extends React.PropsWithChildren {}

export function Objectives({ children }: ObjectiveProps) {
	return (
		<Frame
			size={new UDim2(0.5, 0, 0.5, 0)}
			position={new UDim2(0.5, 0, 0.5, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
			backgroundTransparency={1}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 15)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>

			<Label
				text="<u>Objectives</u> 📜"
				textColor={style.white}
				font={fonts.inter.bold}
				backgroundTransparency={1}
				size={new UDim2(1, 0, 0.12, 0)}
				richText={true}
				layoutOrder={0}
			/>

			<ObjectiveCards />

			{children}
		</Frame>
	);
}

export function ObjectivesPage() {
	return (
		<>
			<Overlay />
			<Blur />

			<Objectives>
				<textbutton
					Size={new UDim2(0.3, 0, 0, 30)}
					BackgroundTransparency={0}
					BackgroundColor3={style.red}
					LayoutOrder={2}
					Text=""
					Event={{
						MouseButton1Click: () => {
							producer.setPage("GAME");
						},
					}}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
					<Label
						size={new UDim2(1, 0, 1, 0)}
						text="Back"
						font={fonts.inter.bold}
						textColor={Color3.fromRGB(255, 255, 255)}
					/>
					<OneThickWhiteStroke />
				</textbutton>
			</Objectives>
		</>
	);
}

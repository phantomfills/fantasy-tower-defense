import React from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { Lighting } from "@rbxts/services";

export function Blur() {
	return createPortal(<blureffect Size={10} />, Lighting);
}

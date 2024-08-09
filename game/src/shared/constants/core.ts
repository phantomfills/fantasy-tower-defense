import { Players } from "@rbxts/services";

export const USER_ID = Players.LocalPlayer ? tostring(Players.LocalPlayer.UserId) : "0";

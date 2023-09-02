import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower-type";

interface ServerEvents {
	placeTower(towerType: TowerType, cframe: CFrame): void;
}

interface ClientEvents {
	placeTower(towerType: TowerType, cframe: CFrame): void;
}

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();

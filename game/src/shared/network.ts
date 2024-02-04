import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower/tower-type";
import { EnemyType } from "./modules/enemy/enemy-type";
import { BroadcastAction } from "@rbxts/reflex";

/**
 * Stores the precision multiplier for syncing enemy positions to client.
 * Tuned to prevent integer overflow when using Vector3Int16s.
 */
export const POSITION_PRECISION_MULTIPLIER = 50;

export interface ClientEnemyInfo {
	id: string;
	/**
	 * Vector3int16 used to decrease payload size.
	 */
	position: Vector3int16;
	rotation: CFrame;
}

type EnemyList = ClientEnemyInfo[];

interface SharedEvents {
	placeTower(towerType: TowerType, cframe: CFrame): void;
	upgradeTower(id: string): void;

	dispatch(actions: BroadcastAction[]): void;
	start(): void;
}

interface ServerEvents extends SharedEvents {}

interface ClientEvents extends SharedEvents {}

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();

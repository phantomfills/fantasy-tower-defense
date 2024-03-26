import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower/tower-type";
import { BroadcastAction } from "@rbxts/reflex";
import { Attack } from "./modules/attack";

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

interface SharedEvents {
	dispatch(actions: BroadcastAction[]): void;
	start(): void;
}

interface ServerToClientEvents extends SharedEvents {
	towerAttack: Networking.Unreliable<(attack: Attack) => void>;
}

interface ClientToServerEvents extends SharedEvents {
	placeTower(towerType: TowerType, cframe: CFrame): void;
	upgradeTower(id: string): void;
	sellTower(id: string): void;
}

interface ServerToClientFunctions {}

interface ClientToServerFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();

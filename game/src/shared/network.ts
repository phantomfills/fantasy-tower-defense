import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower-type";
import { EnemyType } from "./modules/enemy-type";

/**
 * Stores the precision multiplier for syncing position to client
 */
export const POSITION_PRECISION_MULTIPLIER = 50;

export interface ClientEnemyInfo {
	id: string;
	/**
	 * Vector3int16 used to decrease payload size
	 */
	position: Vector3int16;
	rotation: CFrame;
}

type EnemyList = ClientEnemyInfo[];

interface SharedEvents {
	createEnemy(enemyType: EnemyType, id: string, startCFrame: CFrame): void;
	updateEnemy(enemyInfo: ClientEnemyInfo): void;
	updateEnemies(enemies: EnemyList): void;
	destroyEnemy(id: string): void;
	placeTower(towerType: TowerType, cframe: CFrame): void;
}

interface ServerEvents extends SharedEvents {}

interface ClientEvents extends SharedEvents {}

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();

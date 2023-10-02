import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower-type";
import { EnemyType } from "./modules/enemy-type";

/**
 * Used to calculate the precision of a position.
 * Default is 50
 * Higher is more precise
 * Lower is less precise
 * Position values are limited so this cannot be too large
 */
export const positionPrecisionMultiplier = 50;

export interface ClientEnemyInfo {
	id: string;
	// using vector3int16 to save on payload size
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

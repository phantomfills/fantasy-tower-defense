import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower-type";
import { EnemyType } from "./modules/enemy-type";

interface ClientEnemyInfo {
	id: string;
	cframe: CFrame;
	rotation: CFrame;
}

type EnemyList = ClientEnemyInfo[];

interface SharedEvents {
	createEnemy(enemyType: EnemyType, id: string): void;
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

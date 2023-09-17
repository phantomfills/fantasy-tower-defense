import { Networking } from "@flamework/networking";
import { TowerType } from "./modules/tower-type";
import { EnemyType } from "./modules/enemy-type";
import { PathWaypoint } from "./modules/path-waypoint";

interface ClientEnemyInfo {
	id: string;
	lastPathWaypoint: PathWaypoint;
	nextPathWaypoint: PathWaypoint;
	waypointAlpha: number;
}

type EnemyList = ClientEnemyInfo[];

interface SharedEvents {
	createEnemy(enemyType: EnemyType, id: string, startPathWaypoint: PathWaypoint): void;
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

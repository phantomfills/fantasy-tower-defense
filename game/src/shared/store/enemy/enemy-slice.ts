import { createProducer } from "@rbxts/reflex";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { getEnemyStatsFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats";
import { PathWaypoint } from "shared/modules/map/path-waypoint";

export interface Enemy {
	id: string;
	type: EnemyType;
	path: PathWaypoint[];
	currentWaypointIndex: number;
	timestampAtLastWaypoint: number;
	health: number;
	cframe: CFrame;
}

export type EnemyState = Enemy[];

const initialState: EnemyState = [];

export const enemySlice = createProducer(initialState, {
	addEnemy: (state, enemyToAdd: Enemy) => [...state, enemyToAdd],

	removeEnemy: (state, enemyIdToRemove: string) => state.filter((enemy) => enemy.id !== enemyIdToRemove),

	dealDamageToEnemy: (state, enemyIdToDamage: string, damage: number) => {
		const updatedState: EnemyState = [];

		state.forEach((enemy) => {
			if (enemy.id === enemyIdToDamage) {
				const updatedEnemyHealth = enemy.health - damage;
				if (updatedEnemyHealth <= 0) return;

				updatedState.push({ ...enemy, health: enemy.health - damage });
				return;
			}

			updatedState.push(enemy);
		});

		return updatedState;
	},

	enemyTick: (state) => {
		const updatedState = state
			.map((enemy) => {
				const enemyStats = getEnemyStatsFromType(enemy.type);

				const previousWaypoint = enemy.path[enemy.currentWaypointIndex];
				const previousWaypointCFrame = previousWaypoint.waypointAttachment.WorldCFrame;

				const nextWaypoint = enemy.path[enemy.currentWaypointIndex + 1];
				const nextWaypointCFrame = nextWaypoint.waypointAttachment.WorldCFrame;

				const distanceBetweenWaypoints = previousWaypoint.Position.sub(nextWaypoint.Position).Magnitude;

				const totalMovementTimeInMilliseconds = (distanceBetweenWaypoints / enemyStats.speed) * 1000;

				const currentTimeInMilliseconds = DateTime.now().UnixTimestampMillis;
				const elapsedTimeInMilliseconds = currentTimeInMilliseconds - enemy.timestampAtLastWaypoint;

				const waypointLerpAlpha = math.clamp(elapsedTimeInMilliseconds / totalMovementTimeInMilliseconds, 0, 1);

				const cframe = previousWaypointCFrame.Lerp(nextWaypointCFrame, waypointLerpAlpha);

				if (waypointLerpAlpha === 1) {
					return {
						...enemy,
						cframe,
						currentWaypointIndex: enemy.currentWaypointIndex + 1,
						timestampAtLastWaypoint: currentTimeInMilliseconds,
					};
				}

				return { ...enemy, cframe };
			})
			.filter((enemy) => {
				return enemy.currentWaypointIndex + 1 < enemy.path.size();
			});

		return [...updatedState];
	},
});

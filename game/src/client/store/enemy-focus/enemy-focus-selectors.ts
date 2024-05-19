import { Possible } from "shared/modules/utils/possible";
import { RootState } from "..";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import {
	getCFrameFromPathCompletionAlpha,
	getPathCompletionAlpha,
	getPathLength,
} from "shared/modules/utils/path-utils";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";

export function selectFocusEnemyId(state: RootState) {
	return state.enemyFocus.possibleEnemyFocusId;
}

export function selectEnemyFocusDetails(
	id: string,
	currentTime: number,
): (state: RootState) => Possible<{ enemyType: EnemyType; health: number; position: Vector3 }> {
	return (state: RootState) => {
		const enemy = state.enemy[id];
		if (!enemy) return { exists: false };

		const path = state.map.map.path;
		const { speed } = describeEnemyFromType(enemy.enemyType);
		const pathLength = getPathLength(path);

		return {
			exists: true,
			value: {
				enemyType: enemy.enemyType,
				health: enemy.health,
				position: getCFrameFromPathCompletionAlpha(
					path,
					getPathCompletionAlpha(speed, pathLength, enemy.spawnTimestamp, currentTime),
				).Position,
			},
		};
	};
}

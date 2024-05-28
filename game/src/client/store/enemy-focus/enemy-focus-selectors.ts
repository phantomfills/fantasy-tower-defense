import { Possible } from "shared/modules/utils/possible";
import { RootState } from "..";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { selectEnemyPathCompletionAlpha } from "shared/store/enemy";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";

export function selectFocusEnemyId(state: RootState) {
	return state.enemyFocus.possibleEnemyFocusId;
}

export function selectEnemyFocusDetails(
	id: string,
	currentTimestamp: number,
): (state: RootState) => Possible<{ enemyType: EnemyType; health: number; position: Vector3 }> {
	return (state: RootState) => {
		const enemy = state.enemy[id];
		if (!enemy) return { exists: false };

		const path = getGameMapFromMapType(state.level.mapType).paths[0];

		return {
			exists: true,
			value: {
				enemyType: enemy.enemyType,
				health: enemy.health,
				position: getCFrameFromPathCompletionAlpha(
					path,
					selectEnemyPathCompletionAlpha(id, currentTimestamp)(state),
				).Position,
			},
		};
	};
}

import { Possible } from "shared/modules/utils/possible";
import { RootState } from "..";
import { EnemyType } from "shared/modules/enemy/enemy-type";
import { getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";

export function selectFocusEnemyId(state: RootState) {
	return state.enemyFocus.possibleEnemyFocusId;
}

export function selectEnemyFocusDetails(
	id: string,
): (state: RootState) => Possible<{ _type: EnemyType; health: number; position: Vector3 }> {
	return (state: RootState) => {
		const enemy = state.enemy[id];
		if (!enemy) return { exists: false };

		return {
			exists: true,
			value: {
				_type: enemy.enemyType,
				health: enemy.health,
				position: getCFrameFromPathCompletionAlpha(enemy.path, enemy.pathCompletionAlpha).Position,
			},
		};
	};
}

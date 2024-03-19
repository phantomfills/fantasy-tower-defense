import { Possible } from "shared/modules/utils/possible";
import { RootState } from "..";
import { EnemyType } from "shared/modules/enemy/enemy-type";

export function getHoveringEnemyId(state: RootState) {
	return state.enemyHover.possibleEnemyHoverId;
}

export function getEnemyHoverDetailsFromId(
	id: string,
): (state: RootState) => Possible<{ _type: EnemyType; health: number }> {
	return (state: RootState) => {
		const enemy = state.enemy[id];
		if (!enemy) return { exists: false };

		return {
			exists: true,
			value: {
				_type: enemy.enemyType,
				health: enemy.health,
			},
		};
	};
}

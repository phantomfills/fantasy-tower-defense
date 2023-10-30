import { Possible, possible } from "shared/modules/util/possible";
import { RootState } from "..";
import { GenericEnemy } from "server/modules/enemy/enemy";

export function getEnemyFromId(state: RootState, id: string): Possible<GenericEnemy> {
	const enemy = possible<GenericEnemy>(state.enemy.find((enemy) => enemy.getId() === id));
	return enemy;
}

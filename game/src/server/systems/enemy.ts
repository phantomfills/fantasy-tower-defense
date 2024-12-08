import { World, useDeltaTime } from "@rbxts/matter";
import { getPathLength, getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { producer } from "server/store";
import { selectMapType } from "shared/store/level";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";

export function enemiesProgressThroughPath(world: World) {
	for (const [id, enemy, model] of world) {
		const path = getGameMapFromMapType(producer.getState(selectMapType)).paths[enemy.path];
		const pathLength = getPathLength(path);
		const enemyStats = describeEnemyFromType(enemy.enemyType);

		const progressIncrement = (enemyStats.speed / pathLength) * useDeltaTime();
		const newProgress = math.clamp(enemy.progress + progressIncrement, 0, 1);

		// Update enemy position along path
		const newCFrame = getCFrameFromPathCompletionAlpha(path, newProgress);
		model.PivotTo(newCFrame);

		// Update enemy state
		world.insert(id, enemy.patch({ progress: newProgress }));
	}
}


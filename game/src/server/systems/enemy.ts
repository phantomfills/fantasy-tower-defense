import { World, useDeltaTime } from "@rbxts/matter";
import { getPathLength, getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { producer } from "server/store";
import { selectMapType } from "shared/store/level";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { enemyComponent } from "shared/components/enemy";
import { modelComponent } from "shared/components/model";
import { Workspace } from "@rbxts/services";

export const enemiesProgressThroughPath = (world: World) => {
	for (const [id, enemy, model] of world.query(enemyComponent, modelComponent)) {
		const path = getGameMapFromMapType(producer.getState(selectMapType)).paths[enemy.path];
		const pathLength = getPathLength(path);
		const enemyStats = describeEnemyFromType(enemy.enemyType);

		const progressIncrement = (enemyStats.speed / pathLength) * useDeltaTime();
		const newProgress = math.clamp(enemy.pathProgress + progressIncrement, 0, 1);

		const newCFrame = getCFrameFromPathCompletionAlpha(path, newProgress);
		model.model.PivotTo(newCFrame);

		world.insert(id, enemy.patch({ pathProgress: newProgress }));
	}
};

export const createEnemyModel = (world: World) => {
	for (const [id] of world.query(enemyComponent).without(modelComponent)) {
		const model = new Instance("Model");
		model.Parent = Workspace;
		model.Name = "Zombie";

		const part = new Instance("Part");
		part.Size = new Vector3(1, 1, 1);
		part.Anchored = true;
		part.CanCollide = false;
		part.Position = new Vector3(0, 0, 0);
		part.Parent = model;

		world.insert(
			id,
			modelComponent({
				model,
			}),
		);
	}
};

import { World, useDeltaTime } from "@rbxts/matter";
import { getPathLength, getCFrameFromPathCompletionAlpha } from "shared/modules/utils/path-utils";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { producer } from "server/store";
import { selectMapType } from "shared/store/level";
import { describeEnemyFromType } from "shared/modules/enemy/enemy-type-to-enemy-stats-map";
import { enemyComponent, enemyModelComponent } from "shared/components/enemy";
import { Workspace } from "@rbxts/services";
import { getEnemyModelFromType } from "shared/constants/enemy";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";
import { healthComponent, pathFollowerComponent, traitsComponent } from "shared/components/util";

const enemiesProgressThroughPath = (world: World) => {
	for (const [id, model, pathFollower] of world.query(enemyModelComponent, pathFollowerComponent, enemyComponent)) {
		const path = getGameMapFromMapType(producer.getState(selectMapType)).paths[pathFollower.index];
		const pathLength = getPathLength(path);

		const progressIncrement = (pathFollower.speed / pathLength) * useDeltaTime() * pathFollower.speed;
		const newProgress = math.clamp(pathFollower.progressionAlpha + progressIncrement, 0, 1);

		const newCFrame = getCFrameFromPathCompletionAlpha(path, newProgress);
		snapToCFrameWithAttachmentOffset(model.model, model.model.humanoidRootPart.rootAttachment, newCFrame);

		world.insert(id, pathFollower.patch({ progressionAlpha: newProgress, cframe: newCFrame }));
	}
};

const createEnemyModels = (world: World) => {
	for (const [id, enemy] of world.query(enemyComponent).without(enemyModelComponent)) {
		const model = getEnemyModelFromType(enemy.enemyType);
		model.Parent = Workspace;

		world.insert(
			id,
			enemyModelComponent({
				model,
			}),
		);
	}
};

const createEnemyHealth = (world: World) => {
	for (const [id, enemy] of world.query(enemyComponent).without(healthComponent)) {
		const health = describeEnemyFromType(enemy.enemyType).maxHealth;

		world.insert(
			id,
			healthComponent({
				value: health,
				max: health,
			}),
		);
	}
};

const createEnemyPathFollower = (world: World) => {
	for (const [id, enemy] of world.query(enemyComponent).without(pathFollowerComponent)) {
		const speed = describeEnemyFromType(enemy.enemyType).speed;

		world.insert(
			id,
			pathFollowerComponent({
				index: 0,
				progressionAlpha: 0,
				cframe: new CFrame(0, -1000, 0),
				speed,
			}),
		);
	}
};

const createEnemyTraits = (world: World) => {
	for (const [id, enemy] of world.query(enemyComponent).without(traitsComponent)) {
		const traits = describeEnemyFromType(enemy.enemyType).traits;

		world.insert(
			id,
			traitsComponent({
				traits,
			}),
		);
	}
};

const enemiesDespawn = (world: World) => {
	for (const [id, pathFollower, health, model] of world.query(
		pathFollowerComponent,
		healthComponent,
		enemyModelComponent,
		enemyComponent,
	)) {
		if (pathFollower.progressionAlpha < 1) continue;

		producer.deductLives(health.value);

		model.model.Destroy();

		world.despawn(id);
	}
};

const enemiesDie = (world: World) => {
	for (const [id, enemy, health, model] of world.query(enemyComponent, healthComponent, enemyModelComponent)) {
		if (health.value > 0) continue;

		const { money } = describeEnemyFromType(enemy.enemyType);
		producer.awardBonusToAll(money);

		model.model.Destroy();

		world.despawn(id);
	}
};

export const enemySystems = [
	enemiesProgressThroughPath,
	createEnemyModels,
	createEnemyHealth,
	createEnemyTraits,
	createEnemyPathFollower,
	enemiesDespawn,
	enemiesDie,
];

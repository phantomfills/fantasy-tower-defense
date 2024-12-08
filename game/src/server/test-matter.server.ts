import { component, Loop, useDeltaTime, World } from "@rbxts/matter";
import { RunService, Workspace } from "@rbxts/services";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { selectEnemyCFrameFromId, selectEnemyIdsInRange } from "shared/store/enemy";
import { producer } from "./store";
import { attackEnemy } from "./events";
import { createBasicTowerAttack } from "shared/modules/attack";
import { createId } from "shared/modules/utils/id-utils";
import { modelComponent } from "shared/components/model";
import { enemyComponent } from "shared/components/enemy";
import { createEnemyModel, enemiesProgressThroughPath } from "./systems/enemy";

const world = new World();
const loop = new Loop(world);

const helicopterLoops = () => {
	for (const [id, helicopter, model] of world.query(helicopterComponent, modelComponent)) {
		const { radius, origin, alpha, firerate, range, damage, lastAttackTimestamp } = helicopter;

		const angle = alpha * 2 * math.pi;
		const updatedPosition = new Vector3(
			radius * math.sin(angle) + origin.X,
			origin.Y + 5,
			radius * math.cos(angle) + origin.Z,
		);

		world.insert(
			id,
			helicopter.patch({
				alpha: (alpha + 0.25 * useDeltaTime()) % 1,
				position: updatedPosition,
			}),
		);

		model.model;

		const currentTimestamp = getCurrentTimeInMilliseconds();
		if (currentTimestamp - lastAttackTimestamp > firerate * 1000) {
			const updatedPositionWithOriginY = new Vector3(updatedPosition.X, origin.Y, updatedPosition.Z);
			const enemyIds = producer.getState(
				selectEnemyIdsInRange(updatedPositionWithOriginY, range, currentTimestamp),
			);
			if (enemyIds.size() > 0) {
				const enemyId = enemyIds[0];
				producer.dealDamageToEnemy(enemyId, damage);

				world.insert(
					id,
					helicopter.patch({
						lastAttackTimestamp: currentTimestamp,
					}),
				);

				const possibleEnemyPosition = producer.getState(selectEnemyCFrameFromId(enemyId, currentTimestamp));
				if (!possibleEnemyPosition.exists) return;

				const enemyPosition = possibleEnemyPosition.value.Position;

				const attackId = createId();

				const attack = createBasicTowerAttack(attackId, enemyId, enemyPosition, "a", damage);
				attackEnemy.Fire(attack);
			}
		}
	}
};

loop.scheduleSystems([helicopterLoops, enemiesProgressThroughPath, createEnemyModel]);

loop.begin({
	default: RunService.Heartbeat,
});

const helicopterComponent = component<{
	radius: number;
	origin: Vector3;
	alpha: number;
	position: Vector3;
	firerate: number;
	range: number;
	damage: number;
	lastAttackTimestamp: number;
}>();

const helicopterModel = new Instance("Model");
helicopterModel.Parent = Workspace;

const part = new Instance("Part");
part.Size = new Vector3(3, 3, 3);
part.Anchored = true;
part.Parent = helicopterModel;

const helicopter = world.spawn(
	helicopterComponent({
		radius: 15,
		origin: new Vector3(15, 1.597, -1),
		alpha: 0,
		position: new Vector3(0, 0, 0),
		firerate: 0.1,
		range: 6,
		damage: 18,
		lastAttackTimestamp: getCurrentTimeInMilliseconds(),
	}),
	modelComponent({
		model: helicopterModel,
	}),
);

const zombie = world.spawn(
	enemyComponent({
		enemyType: "ZOMBIE",
		health: 100,
		path: 0,
		pathProgress: 0,
		speed: 0,
	}),
);

print("hi!");

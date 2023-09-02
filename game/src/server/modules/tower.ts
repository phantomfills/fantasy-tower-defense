import { GenericEnemy } from "./enemy";
import Maid from "@rbxts/maid";
import { Signal } from "@rbxts/beacon";
import { TowerModel } from "shared/modules/tower-model";

export interface GenericTowerStats {
	damage: number;
	firerate: number;
	range: number;
	cframe: CFrame;
}

export type GenericTower = Tower<GenericTowerStats>;

export type DamageDealtInfo = {
	damage: number;
};

export class Tower<T extends GenericTowerStats> {
	readonly dealDamage: Signal<[tower: GenericTower, info: DamageDealtInfo]>;

	private maid: Maid;

	constructor(private model: TowerModel, private readonly stats: T) {
		this.model.PivotTo(stats.cframe);

		this.dealDamage = new Signal();

		this.maid = new Maid();
		this.maid.GiveTask(this.model);
		this.maid.GiveTask(this.dealDamage);

		this.start();
	}

	getStat<T extends keyof GenericTowerStats>(stat: T): GenericTowerStats[T] {
		return this.stats[stat];
	}

	pointTowardsEnemy(enemy: GenericEnemy) {
		const towerCFrame = this.getStat("cframe");
		const enemyCFrame = enemy.getCFrame();

		const towerPosition = towerCFrame.Position;
		const enemyPosition = enemyCFrame.Position;

		const enemyPositionWithTowerY = new Vector3(enemyPosition.X, towerPosition.Y, enemyPosition.Z);

		this.model.PivotTo(new CFrame(towerPosition, enemyPositionWithTowerY));
	}

	private async start() {
		for (;;) {
			task.wait(this.stats.firerate);

			this.dealDamage.Fire(this, {
				damage: this.getStat("damage"),
			});
		}
	}

	private destroy() {
		this.maid.Destroy();
	}
}

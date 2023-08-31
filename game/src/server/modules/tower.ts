import { TowerService } from "server/services/tower-service";
import { Enemy, GenericEnemy, GenericEnemyStats } from "./enemy";
import { RunService } from "@rbxts/services";
import Maid from "@rbxts/maid";
import { Signal } from "@rbxts/beacon";

export interface TowerModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

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
	private rootPart: BasePart & {
		rootAttachment: Attachment;
	};

	readonly dealDamage: Signal<[tower: GenericTower, info: DamageDealtInfo]>;

	private maid: Maid;

	constructor(private model: TowerModel, private readonly stats: T) {
		this.rootPart = this.model.humanoidRootPart;

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

import { TowerService } from "server/services/tower-service";
import { Enemy, GenericEnemyStats } from "./enemy";
import { RunService } from "@rbxts/services";
import Maid from "@rbxts/maid";

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

export class Tower<T extends GenericTowerStats> {
	private model: TowerModel;
	private rootPart: BasePart & {
		rootAttachment: Attachment;
	};
	private rootAttachment: Attachment;

	private readonly stats: T;

	private maid: Maid;

	constructor(model: TowerModel, stats: T, private towerService: TowerService) {
		this.model = model;
		this.rootPart = this.model.humanoidRootPart;
		this.rootAttachment = this.rootPart.rootAttachment;

		this.model.PivotTo(stats.cframe);

		this.stats = stats;

		this.maid = new Maid();
		this.maid.GiveTask(this.model);

		this.start();
	}

	getStat<T extends keyof GenericTowerStats>(stat: T): GenericTowerStats[T] {
		return this.stats[stat];
	}

	private async start() {
		for (;;) {
			task.wait(1);

			const target = this.towerService.getClosestTarget(this);
			if (!target) continue;

			print(target.id);
		}
	}

	private dealDamage<T extends GenericEnemyStats>(enemy: Enemy<T>, damage: number) {
		enemy.takeDamage(damage);
	}

	private destroy() {
		this.maid.Destroy();
	}
}

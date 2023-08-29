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
	private rootPart: BasePart & {
		rootAttachment: Attachment;
	};
	private rootAttachment: Attachment;

	private maid: Maid;

	constructor(private model: TowerModel, private readonly stats: T, private towerService: TowerService) {
		this.rootPart = this.model.humanoidRootPart;
		this.rootAttachment = this.rootPart.rootAttachment;

		this.model.PivotTo(stats.cframe);

		this.maid = new Maid();
		this.maid.GiveTask(this.model);

		this.start();
	}

	getStat<T extends keyof GenericTowerStats>(stat: T): GenericTowerStats[T] {
		return this.stats[stat];
	}

	private async start() {
		for (;;) {
			task.wait(this.stats.firerate);

			const target = this.towerService.getClosestTarget(this);
			if (!target) continue;

			print(`${target.getId()} taking damage...`);

			target.takeDamage(this.stats.damage);
		}
	}

	private dealDamage<T extends GenericEnemyStats>(enemy: Enemy<T>, damage: number) {
		enemy.takeDamage(damage);
	}

	private destroy() {
		this.maid.Destroy();
	}
}

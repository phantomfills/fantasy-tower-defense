import { Enemy, GenericEnemyStats } from "./enemy";

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

export class Tower<T extends GenericTowerStats> {
	private model: TowerModel;
	private rootPart: BasePart & {
		rootAttachment: Attachment;
	};
	private rootAttachment: Attachment;

	private stats: T;

	constructor(model: TowerModel, stats: T) {
		this.model = model;
		this.rootPart = this.model.humanoidRootPart;
		this.rootAttachment = this.rootPart.rootAttachment;

		this.model.PivotTo(stats.cframe);

		this.stats = stats;
	}

	dealDamage<T extends GenericEnemyStats>(enemy: Enemy<T>, damage: number) {
		enemy.takeDamage(damage);
	}
}

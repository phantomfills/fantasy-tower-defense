import { GenericEnemy } from "./enemy";
import Maid from "@rbxts/maid";
import { Signal } from "@rbxts/beacon";
import { TowerModel } from "shared/modules/tower-model";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";

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
		this.snapToCFrame(stats.cframe);

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

		const enemyPositionWithTowerY = this.getPositionWithTowerY(enemyPosition);

		this.snapToCFrame(new CFrame(towerPosition, enemyPositionWithTowerY));
	}

	getPositionInRange(position: Vector3) {
		const towerCframe = this.getStat("cframe");
		const towerPosition = towerCframe.Position;

		const positionWithTowerY = this.getPositionWithTowerY(position);

		const distance = towerPosition.sub(positionWithTowerY).Magnitude;

		return distance < this.getStat("range");
	}

	private getPositionWithTowerY(position: Vector3) {
		const towerCFrame = this.getStat("cframe");
		const towerPosition = towerCFrame.Position;

		const positionWithTowerY = new Vector3(position.X, towerPosition.Y, position.Z);

		return positionWithTowerY;
	}

	private snapToCFrame(cframe: CFrame) {
		snapToCFrameWithAttachmentOffset(this.model, this.model.humanoidRootPart.rootAttachment, cframe);
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

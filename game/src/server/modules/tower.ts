import { GenericEnemy } from "./enemy";
import Maid from "@rbxts/maid";
import { Signal } from "@rbxts/beacon";
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

	constructor(private readonly stats: T) {
		this.dealDamage = new Signal();

		this.maid = new Maid();
		this.maid.GiveTask(this.dealDamage);

		this.start();
	}

	getStat<T extends keyof GenericTowerStats>(stat: T): GenericTowerStats[T] {
		return this.stats[stat];
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

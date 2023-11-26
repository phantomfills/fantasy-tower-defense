import { TowerType } from "./tower-type";
import { HttpService } from "@rbxts/services";

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
	private readonly id: string;

	constructor(private readonly towerType: TowerType, private readonly stats: T) {
		this.id = HttpService.GenerateGUID();

		this.start();
	}

	getId(): string {
		return this.id;
	}

	getTowerType(): TowerType {
		return this.towerType;
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

	private async start() {}
}

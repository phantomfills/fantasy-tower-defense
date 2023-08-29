import { OnStart, Service } from "@flamework/core";
import { GenericTower, GenericTowerStats, Tower } from "server/modules/tower";
import { Workspace, ServerStorage } from "@rbxts/services";
import { EnemyService } from "./enemy-service";
import { GenericEnemy } from "server/modules/enemy";

@Service({})
export class TowerService implements OnStart {
	private towers: GenericTower[];

	constructor(private enemyService: EnemyService) {
		this.towers = [];
	}

	private addTower(tower: GenericTower) {
		this.towers.push(tower);
	}

	private getTowers() {
		return this.towers;
	}

	getClosestTarget(tower: GenericTower): GenericEnemy | undefined {
		const cframe = tower.getStat("cframe");
		const position = cframe.Position;

		const enemies = this.enemyService.getEnemies();
		enemies.sort((last, current) => {
			const lastPosition = last.getCFrame().Position;
			const distanceToLast = position.sub(lastPosition).Magnitude;

			const currentPosition = current.getCFrame().Position;
			const distanceToCurrent = position.sub(currentPosition).Magnitude;

			return distanceToLast < distanceToCurrent;
		});

		return enemies[0];
	}

	onStart() {
		const towerCFrame = new CFrame(11, 4, -13);

		const archerTemplate = ServerStorage.assets.towers.archer.models.archer;

		const archerModel = archerTemplate.Clone();
		archerModel.Parent = Workspace;

		const archer = new Tower<GenericTowerStats>(
			archerModel,
			{
				damage: 10,
				firerate: 1,
				range: 1,
				cframe: towerCFrame,
			},
			this,
		);

		this.addTower(archer);
	}
}

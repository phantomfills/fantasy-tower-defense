import { Controller, OnStart, OnTick } from "@flamework/core";
import { ClientTowerRenderController } from "./client-tower-render-controller";
import { UserInputService, Workspace } from "@rbxts/services";
import { Possible, possible } from "shared/modules/utils/possible";
import { GenericClientTower } from "client/modules/tower/client-tower";
import { producer } from "client/store";
import { getPossibleTowerFromId, getPossibleTowerLevelFromId, towerDoesNotExistFromId } from "shared/store/tower";
import { getPossibleTowerId, getTowerIsNotFocused } from "client/store/tower-action-menu/tower-action-selectors";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { createRangeModel } from "client/modules/tower/range-model";
import { selectPlayersCanUpgradeTower } from "shared/store/dialog";

const MAX_TOWER_HOVER_DISTANCE = 100;

@Controller({})
export class TowerActionController implements OnStart, OnTick {
	private highlight: Possible<Highlight>;
	private rangeIndicator: Possible<Model>;
	private enabled: boolean;

	constructor(readonly clientTowerRenderController: ClientTowerRenderController) {
		this.highlight = {
			exists: false,
		};
		this.rangeIndicator = {
			exists: false,
		};
		this.enabled = true;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	private getHoveringTower(): Possible<GenericClientTower> {
		const possibleCamera = possible<Camera>(Workspace.CurrentCamera);
		if (!possibleCamera.exists)
			return {
				exists: false,
			};

		const camera = possibleCamera.value;

		const mousePosition = UserInputService.GetMouseLocation();
		const ray = camera.ViewportPointToRay(mousePosition.X, mousePosition.Y);
		const origin = ray.Origin;
		const direction = ray.Direction.mul(MAX_TOWER_HOVER_DISTANCE);

		const possibleRaycastResult = possible<RaycastResult>(Workspace.Raycast(origin, direction));
		if (!possibleRaycastResult.exists)
			return {
				exists: false,
			};

		const raycastResult = possibleRaycastResult.value;
		const instance = raycastResult.Instance;
		const possibleModel = possible<Model>(instance.FindFirstAncestorWhichIsA("Model"));
		if (!possibleModel.exists)
			return {
				exists: false,
			};

		const model = possibleModel.value;
		const clientTowers = this.clientTowerRenderController.getClientTowers();

		const possibleClientTower = possible<GenericClientTower>(
			clientTowers.find((clientTower) => {
				const towerModel = clientTower.getModel();
				return towerModel === model;
			}),
		);
		return possibleClientTower;
	}

	private destroyHighlight() {
		if (!this.highlight.exists) return;

		this.highlight.value.Destroy();
		this.highlight = {
			exists: false,
		};
	}

	private createHighlight(parent: Instance) {
		this.destroyHighlight();

		const highlight = new Instance("Highlight");
		highlight.Parent = parent;
		highlight.OutlineColor = Color3.fromRGB(255, 255, 255);
		highlight.FillColor = Color3.fromRGB(255, 255, 255);
		highlight.FillTransparency = 0.6;

		this.highlight = {
			exists: true,
			value: highlight,
		};
	}

	private destroyRangeIndicator() {
		if (!this.rangeIndicator.exists) return;

		this.rangeIndicator.value.Destroy();
		this.rangeIndicator = {
			exists: false,
		};
	}

	private createRangeIndicator(parent: Instance, range: number, position: Vector3) {
		this.destroyRangeIndicator();

		const rangeIndicatorModel = createRangeModel(range, position);
		rangeIndicatorModel.Parent = parent;

		this.rangeIndicator = {
			exists: true,
			value: rangeIndicatorModel,
		};
	}

	onStart(): void {
		UserInputService.InputBegan.Connect((input) => {
			if (!this.enabled) return;

			if (
				input.UserInputType === Enum.UserInputType.MouseButton1 ||
				input.UserInputType === Enum.UserInputType.Touch
			) {
				const possibleClientTower = this.getHoveringTower();
				if (!possibleClientTower.exists) return;

				const clientTower = possibleClientTower.value;
				const id = clientTower.getId();

				producer.setTowerId(id);
			}
		});

		producer.subscribe(getPossibleTowerId, (possibleTowerId) => {
			const playersCanUpgradeTower = producer.getState(selectPlayersCanUpgradeTower);
			if (!playersCanUpgradeTower) return;

			if (!possibleTowerId.exists) {
				this.destroyRangeIndicator();
				return;
			}

			const towerId = possibleTowerId.value;

			const possibleTower = producer.getState(getPossibleTowerFromId(towerId));
			if (!possibleTower.exists) return;

			const { towerType, level } = possibleTower.value;
			const towerStats = describeTowerFromType(towerType, level);

			const possibleClientTower = this.clientTowerRenderController.getClientTowerFromId(towerId);
			if (!possibleClientTower.exists) return;

			const clientTower = possibleClientTower.value;
			const model = clientTower.getModel();

			const rootPosition = model.humanoidRootPart.rootAttachment.WorldPosition;
			this.createRangeIndicator(Workspace, towerStats.range, rootPosition);

			const towerLevelSelector = getPossibleTowerLevelFromId(towerId);

			const unsubscribeLevelSelector = producer.subscribe(towerLevelSelector, (possibleLevel) => {
				if (!possibleLevel.exists) return;

				const level = possibleLevel.value;
				const towerStats = describeTowerFromType(towerType, level);
				this.createRangeIndicator(Workspace, towerStats.range, rootPosition);
			});

			const unsubscribeTowerDoesNotExist = producer.once(towerDoesNotExistFromId(towerId), () => {
				producer.clearTowerId();
			});

			producer.once(getTowerIsNotFocused(towerId), () => {
				if (!producer.getState(getPossibleTowerId).exists) {
					this.destroyRangeIndicator();
				}
				unsubscribeLevelSelector();
				unsubscribeTowerDoesNotExist();
			});
		});
	}

	onTick(): void {
		if (!this.enabled) {
			this.destroyHighlight();
			return;
		}

		const possibleClientTower = this.getHoveringTower();
		if (!possibleClientTower.exists) {
			this.destroyHighlight();
			return;
		}

		const clientTower = possibleClientTower.value;
		const model = clientTower.getModel();
		if (this.highlight.exists && this.highlight.value.Parent === model) {
			return;
		}

		this.createHighlight(model);
	}
}

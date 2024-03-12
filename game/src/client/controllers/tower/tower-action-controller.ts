import { Controller, OnStart, OnTick } from "@flamework/core";
import { ClientTowerRenderController } from "./client-tower-render-controller";
import { UserInputService, Workspace } from "@rbxts/services";
import { Possible, possible } from "shared/modules/utils/possible";
import { GenericClientTower } from "client/modules/tower/client-tower";
import { producer } from "client/store";
import { getPossibleTowerFromId, getPossibleTowerLevelFromId, towerDoesNotExistFromId } from "shared/store/tower";
import { getPossibleTowerId } from "client/store/tower-action-menu/tower-action-selectors";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";

const MAX_TOWER_HOVER_DISTANCE = 100;

@Controller({})
export class TowerActionController implements OnStart, OnTick {
	private highlight: Possible<Highlight>;
	private rangeIndicator: Possible<Model>;

	constructor(readonly clientTowerRenderController: ClientTowerRenderController) {
		this.highlight = {
			exists: false,
		};
		this.rangeIndicator = {
			exists: false,
		};
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

		// containing range indicator in a model to allow for a highlight (transparent parts do not support highlights)
		const rangeIndicatorModel = new Instance("Model");
		rangeIndicatorModel.Parent = parent;
		rangeIndicatorModel.Name = "Range Indicator Model";

		const rangeIndicator = new Instance("Part");
		rangeIndicator.Shape = Enum.PartType.Cylinder;
		rangeIndicator.Size = new Vector3(0.1, range * 2, range * 2);
		rangeIndicator.Anchored = true;
		rangeIndicator.CanCollide = false;
		rangeIndicator.Transparency = 0.75;
		rangeIndicator.BrickColor = new BrickColor("Light grey");
		rangeIndicator.CFrame = new CFrame(position).mul(CFrame.Angles(0, 0, math.rad(90)));
		rangeIndicator.Parent = rangeIndicatorModel;

		const highlight = new Instance("Highlight");
		highlight.Parent = rangeIndicatorModel;
		highlight.OutlineColor = Color3.fromRGB(255, 255, 255);
		highlight.FillColor = Color3.fromRGB(255, 255, 255);
		highlight.FillTransparency = 0.6;

		this.rangeIndicator = {
			exists: true,
			value: rangeIndicatorModel,
		};
	}

	onStart(): void {
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				const possibleClientTower = this.getHoveringTower();
				if (!possibleClientTower.exists) return;

				const clientTower = possibleClientTower.value;
				const id = clientTower.getId();

				producer.setTowerId(id);
			}
		});

		producer.subscribe(getPossibleTowerId, (possibleTowerId) => {
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

			const unsubscribe = producer.subscribe(towerLevelSelector, (possibleLevel) => {
				if (!possibleLevel.exists) return;
				const level = possibleLevel.value;
				const towerStats = describeTowerFromType(towerType, level);
				this.createRangeIndicator(Workspace, towerStats.range, rootPosition);
			});

			producer.once(towerDoesNotExistFromId(towerId), () => {
				this.destroyRangeIndicator();
				unsubscribe();
			});
		});
	}

	onTick(dt: number): void {
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

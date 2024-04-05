import { Controller, OnStart, OnTick } from "@flamework/core";
import { ClientTowerRenderController } from "./client-tower-render-controller";
import { UserInputService, Workspace } from "@rbxts/services";
import { Possible, possible } from "shared/modules/utils/possible";
import { GenericClientTower } from "client/modules/tower/client-tower";
import { producer } from "client/store";
import { selectPlayersCanUpgradeTower } from "shared/store/dialog";

const MAX_TOWER_HOVER_DISTANCE = 100;

@Controller({})
export class TowerActionController implements OnStart, OnTick {
	private highlight: Possible<Highlight>;
	private enabled: boolean;

	constructor(readonly clientTowerRenderController: ClientTowerRenderController) {
		this.highlight = {
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

	onStart(): void {
		UserInputService.InputBegan.Connect((input) => {
			const playersCanUpgradeTower = producer.getState(selectPlayersCanUpgradeTower);
			if (!playersCanUpgradeTower) return;

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

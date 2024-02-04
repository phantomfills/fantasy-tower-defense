import { Controller, OnStart, OnTick } from "@flamework/core";
import { ClientTowerRenderController } from "./client-tower-render-controller";
import { UserInputService, Workspace } from "@rbxts/services";
import { Possible, possible } from "shared/modules/utils/possible";
import { ClientTower } from "client/modules/tower/client-tower";
import { producer } from "client/store";
import { getTowerFromId } from "shared/store/tower";

const MAX_TOWER_HOVER_DISTANCE = 100;

@Controller({})
export class TowerActionController implements OnStart, OnTick {
	private readonly highlight: Highlight;
	private hoveringTower: Possible<ClientTower>;

	constructor(readonly clientTowerRenderController: ClientTowerRenderController) {
		this.highlight = new Instance("Highlight");
		this.highlight.FillTransparency = 0.8;

		this.hoveringTower = {
			exists: false,
		};
	}

	private getHoveringTower(): Possible<ClientTower> {
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

		const possibleClientTower = possible<ClientTower>(
			clientTowers.find((clientTower) => {
				const towerModel = clientTower.getModel();
				return towerModel === model;
			}),
		);
		return possibleClientTower;
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
	}

	onTick(dt: number): void {
		const possibleClientTower = this.getHoveringTower();
		this.hoveringTower = possibleClientTower;
		if (!possibleClientTower.exists) {
			this.highlight.Parent = undefined;
			return;
		}

		const clientTower = possibleClientTower.value;
		const model = clientTower.getModel();
		this.highlight.Parent = model;
	}
}

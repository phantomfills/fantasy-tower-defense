import { Controller, OnStart } from "@flamework/core";
import { Possible, possible } from "shared/modules/util/possible";
import { TowerModel } from "../../../shared/modules/tower/tower-model";
import { TowerType } from "../../../shared/modules/tower/tower-type";
import { UserInputService, Workspace, RunService, Players } from "@rbxts/services";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/util/snap-to-cframe";
import { Events } from "client/network";
import { store } from "client/store";
import Maid from "@rbxts/maid";

const TOWER_PLACEMENT_DISTANCE = 1000;

@Controller({})
export class TowerPlacementController implements OnStart {
	private towerPlacement: Possible<{
		model: TowerModel;
		type: TowerType;
		cframe: CFrame;
		updatePlacementConnection: RBXScriptConnection;
		maid: Maid;
	}>;

	constructor() {
		this.towerPlacement = {
			exists: false,
		};
	}

	onStart() {
		UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;

			switch (input.KeyCode) {
				case Enum.KeyCode.Q: {
					this.clearTower();
					break;
				}
			}

			switch (input.UserInputType) {
				case Enum.UserInputType.MouseButton1: {
					this.placeTower();
				}
			}
		});
	}

	private getTowerPlacementRaycastResultWithFilter(filterDescendantsInstances: Instance[]): Possible<RaycastResult> {
		const camera = Workspace.CurrentCamera;
		if (!camera)
			return {
				exists: false,
			};

		const mousePosition = UserInputService.GetMouseLocation();
		const mouseRay = camera.ViewportPointToRay(mousePosition.X, mousePosition.Y);

		const origin = mouseRay.Origin;
		const direction = mouseRay.Direction.mul(TOWER_PLACEMENT_DISTANCE);

		const raycastParameters = new RaycastParams();
		raycastParameters.FilterDescendantsInstances = filterDescendantsInstances;
		raycastParameters.FilterType = Enum.RaycastFilterType.Exclude;

		const raycastResult = possible<RaycastResult>(Workspace.Raycast(origin, direction, raycastParameters));

		return raycastResult;
	}

	private getTowerPlacementCFrame(towerPrefabModel: TowerModel): Possible<CFrame> {
		const possibleTowerPlacementRaycast = this.getTowerPlacementRaycastResultWithFilter([towerPrefabModel]);
		if (!possibleTowerPlacementRaycast.exists)
			return {
				exists: false,
			};

		const towerPlacementRaycast = possibleTowerPlacementRaycast.value;

		const position = towerPlacementRaycast.Position;
		const cframe = new CFrame(position);

		return {
			exists: true,
			value: cframe,
		};
	}

	private updateTowerPlacementCFrame() {
		const possibleTowerPlacement = this.towerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		const towerPrefabModel = towerPlacement.model;

		const possibleTowerPlacementRaycast = this.getTowerPlacementRaycastResultWithFilter([towerPrefabModel]);
		if (!possibleTowerPlacementRaycast.exists) return;

		const towerPlacementRaycast = possibleTowerPlacementRaycast.value;

		const position = towerPlacementRaycast.Position;
		const cframe = new CFrame(position);

		towerPlacement.cframe = cframe;

		snapToCFrameWithAttachmentOffset(towerPrefabModel, towerPrefabModel.humanoidRootPart.rootAttachment, cframe);
	}

	setTower(towerType: TowerType, towerPrefabModel: TowerModel) {
		this.clearTower();

		const possibleTowerPlacementCFrame = this.getTowerPlacementCFrame(towerPrefabModel);
		if (!possibleTowerPlacementCFrame.exists) return;

		const towerModel = towerPrefabModel.Clone();
		towerModel.Parent = Workspace;

		store.setTowerPlacement(towerType);

		const towerPlacementCFrame = possibleTowerPlacementCFrame.value;

		const updateTowerPlacementConnection = RunService.RenderStepped.Connect(() =>
			this.updateTowerPlacementCFrame(),
		);

		const maid = new Maid();
		maid.GiveTask(() => {
			store.clearTowerPlacement();
			updateTowerPlacementConnection.Disconnect();
			towerModel.Destroy();
		});

		this.towerPlacement = {
			exists: true,
			value: {
				model: towerModel,
				cframe: towerPlacementCFrame,
				type: towerType,
				updatePlacementConnection: updateTowerPlacementConnection,
				maid: maid,
			},
		};
	}

	private clearTower() {
		const possibleTowerPlacement = this.towerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		towerPlacement.maid.Destroy();

		this.towerPlacement = {
			exists: false,
		};
	}

	private placeTower() {
		const possibleTowerPlacement = this.towerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		const towerType = towerPlacement.type;
		const towerCFrame = towerPlacement.cframe;

		Events.placeTower.fire(towerType, towerCFrame);

		this.clearTower();
	}
}

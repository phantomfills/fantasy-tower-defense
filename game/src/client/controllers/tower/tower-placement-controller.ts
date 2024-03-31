import { Controller, OnStart } from "@flamework/core";
import { Possible, possible } from "shared/modules/utils/possible";
import { TowerModel } from "shared/modules/tower/tower-model";
import { TowerType } from "shared/modules/tower/tower-type";
import { UserInputService, Workspace, RunService, CollectionService } from "@rbxts/services";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";
import { Events } from "client/network";
import { producer } from "client/store";
import Maid from "@rbxts/maid";
import { describeTowerFromType } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { tags } from "shared/modules/utils/tags";
import { selectIsValidPlacementPosition } from "shared/store/map";
import { RangeIndicator } from "client/modules/tower/range-indicator";
import { removeShadows } from "client/modules/rig/remove-shadows";
import { TowerActionController } from "./tower-action-controller";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

const TOWER_PLACEMENT_DISTANCE = 1000;
const EXIT_DOUBLE_TAP_THRESHOLD = 500;

@Controller({})
export class TowerPlacementController implements OnStart {
	private possibleTowerPlacement: Possible<{
		model: TowerModel;
		type: TowerType;
		cframe: CFrame;
		rotation: number;
		updatePlacementConnection: RBXScriptConnection;
		maid: Maid;
	}>;
	private possibleRangeIndicator: Possible<RangeIndicator>;
	private lastTapTime: number;

	constructor(private towerActionController: TowerActionController) {
		this.possibleTowerPlacement = {
			exists: false,
		};
		this.possibleRangeIndicator = {
			exists: false,
		};
		this.lastTapTime = getCurrentTimeInMilliseconds();
	}

	onStart() {
		UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;

			switch (input.KeyCode) {
				case Enum.KeyCode.Q: {
					this.clearTower();
					break;
				}

				case Enum.KeyCode.R: {
					const possibleTowerPlacement = this.possibleTowerPlacement;
					if (!possibleTowerPlacement.exists) return;

					const towerPlacement = possibleTowerPlacement.value;
					towerPlacement.rotation += 90;

					break;
				}
			}

			switch (input.UserInputType) {
				case Enum.UserInputType.MouseButton1: {
					this.placeTower();
					break;
				}
				case Enum.UserInputType.Touch: {
					const currentTime = getCurrentTimeInMilliseconds();

					if (currentTime - this.lastTapTime < EXIT_DOUBLE_TAP_THRESHOLD) {
						this.placeTower();
						return;
					}
					this.lastTapTime = currentTime;

					break;
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
		const towers = CollectionService.GetTagged(tags.TOWER);
		const enemies = CollectionService.GetTagged(tags.ENEMY);
		const projectiles = CollectionService.GetTagged(tags.PROJECTILE);
		const characters = CollectionService.GetTagged(tags.CHARACTER);

		const possibleTowerPlacementRaycast = this.getTowerPlacementRaycastResultWithFilter([
			...towers,
			...enemies,
			...projectiles,
			...characters,
			towerPrefabModel,
		]);
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

	private updateTowerPlacementCFrame(snap: boolean = true) {
		const possibleTowerPlacement = this.possibleTowerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		const towerPrefabModel = towerPlacement.model;

		const possibleTowerPlacementCFrame = this.getTowerPlacementCFrame(towerPrefabModel);
		if (!possibleTowerPlacementCFrame.exists) return;

		const cframe = possibleTowerPlacementCFrame.value;

		this.possibleTowerPlacement = {
			exists: true,
			value: {
				...towerPlacement,
				cframe: cframe,
			},
		};

		const cframeWithRotation = cframe.mul(CFrame.Angles(0, math.rad(towerPlacement.rotation), 0));

		if (snap) {
			snapToCFrameWithAttachmentOffset(
				towerPrefabModel,
				towerPrefabModel.humanoidRootPart.rootAttachment,
				cframeWithRotation,
			);
		} else {
			snapToCFrameWithAttachmentOffset(
				towerPrefabModel,
				towerPrefabModel.humanoidRootPart.rootAttachment,
				towerPrefabModel.humanoidRootPart.rootAttachment.WorldCFrame.Lerp(cframeWithRotation, 0.25), // Use lerp to smooth out the movement
			);
		}

		if (!this.possibleRangeIndicator.exists) return;
		const rangeIndicator = this.possibleRangeIndicator.value;

		const isValidPlacementPosition = producer.getState(
			selectIsValidPlacementPosition(cframe.Position, [towerPrefabModel]),
		);

		const enabled = rangeIndicator.getEnabled();
		if (enabled === isValidPlacementPosition) return;

		rangeIndicator.setEnabled(isValidPlacementPosition);
	}

	setTower(towerType: TowerType, towerPrefabModel: TowerModel) {
		this.clearTower();

		const possibleTowerPlacementCFrame = this.getTowerPlacementCFrame(towerPrefabModel);
		if (!possibleTowerPlacementCFrame.exists) return;

		const { range } = describeTowerFromType(towerType, 0);

		const towerModel = towerPrefabModel.Clone();
		removeShadows(towerModel);
		towerModel.Parent = Workspace;

		const isValidPlacementPosition = producer.getState(
			selectIsValidPlacementPosition(towerModel.humanoidRootPart.rootAttachment.WorldPosition, [towerModel]),
		);

		const rangeIndicator = new RangeIndicator(range, isValidPlacementPosition, towerModel);
		this.possibleRangeIndicator = {
			exists: true,
			value: rangeIndicator,
		};

		producer.setTowerPlacement(towerType);

		const towerPlacementCFrame = possibleTowerPlacementCFrame.value;

		const updateTowerPlacementConnection = RunService.RenderStepped.Connect(() =>
			this.updateTowerPlacementCFrame(false),
		);

		const maid = new Maid();
		maid.GiveTask(() => {
			producer.clearTowerPlacement();
			updateTowerPlacementConnection.Disconnect();
			towerModel.Destroy();
		});

		this.possibleTowerPlacement = {
			exists: true,
			value: {
				model: towerModel,
				cframe: towerPlacementCFrame,
				rotation: 0,
				type: towerType,
				updatePlacementConnection: updateTowerPlacementConnection,
				maid: maid,
			},
		};

		this.updateTowerPlacementCFrame();

		producer.clearTowerId();
		this.towerActionController.disable();
	}

	private clearTower() {
		const possibleTowerPlacement = this.possibleTowerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		towerPlacement.maid.Destroy();

		this.possibleTowerPlacement = {
			exists: false,
		};

		this.towerActionController.enable();
	}

	private placeTower() {
		const possibleTowerPlacement = this.possibleTowerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		const towerType = towerPlacement.type;
		const towerCFrame = towerPlacement.cframe;
		const towerRotation = towerPlacement.rotation;

		Events.placeTower.fire(towerType, towerCFrame.mul(CFrame.Angles(0, math.rad(towerRotation), 0)));

		this.clearTower();
	}
}

import { Controller, OnStart } from "@flamework/core";
import { Possible, possible } from "shared/modules/utils/possible";
import { TowerModel } from "shared/modules/tower/tower-model";
import { TowerType } from "shared/modules/tower/tower-type";
import { UserInputService, Workspace, RunService, CollectionService, Debris } from "@rbxts/services";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/utils/snap-to-cframe";
import { Events, Functions } from "client/network";
import { producer } from "client/store";
import Maid from "@rbxts/maid";
import { describeTowerFromType, getTowerObstructionRadius } from "shared/modules/tower/tower-type-to-tower-stats-map";
import { tags } from "shared/modules/utils/tags";
import { RangeIndicator } from "client/modules/tower/range-indicator";
import { removeShadows } from "client/modules/rig/remove-shadows";
import { TowerActionController } from "./tower-action-controller";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";
import { createSound } from "client/modules/utils/sound";
import { sounds } from "shared/modules/sounds/sounds";
import { MapModel } from "shared/modules/map/map-type-to-game-map-map";
import { isValidPlacementPosition } from "shared/modules/tower/valid-placement-position";
import { selectDoesTowerObstructionBoxCollideWithAnother } from "shared/store/tower";

const TOWER_PLACEMENT_DISTANCE = 1000;
const EXIT_DOUBLE_TAP_THRESHOLD = 500;

const canPlaceAtPosition = (map: MapModel, position: Vector3, obstructionBox: number) => {
	return (
		isValidPlacementPosition(map, position) &&
		!producer.getState(selectDoesTowerObstructionBoxCollideWithAnother(position, obstructionBox))
	);
};

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
	private gameMap: MapModel | undefined;

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

		if (!this.gameMap) return;

		const isValid = canPlaceAtPosition(
			this.gameMap,
			cframe.Position,
			getTowerObstructionRadius(possibleTowerPlacement.value.type),
		);

		const enabled = rangeIndicator.getEnabled();
		if (enabled === isValid) return;

		rangeIndicator.setEnabled(isValid);
	}

	setTower(towerType: TowerType, towerPrefabModel: TowerModel) {
		this.clearTower();

		const possibleTowerPlacementCFrame = this.getTowerPlacementCFrame(towerPrefabModel);
		if (!possibleTowerPlacementCFrame.exists) return;

		const { range } = describeTowerFromType(towerType, 0);

		const towerModel = towerPrefabModel.Clone();
		removeShadows(towerModel);
		towerModel.Parent = Workspace;

		Functions.getMap()
			.then((map) => {
				if (!map) return;

				producer.setPage("PLACING");

				this.gameMap = map;

				const isValid = canPlaceAtPosition(
					map,
					towerModel.humanoidRootPart.rootAttachment.WorldPosition,
					getTowerObstructionRadius(towerType),
				);

				const rangeIndicator = new RangeIndicator(
					range,
					getTowerObstructionRadius(towerType),
					isValid,
					towerModel,
				);
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
			})
			.catch(warn);
	}

	private clearTower() {
		const possibleTowerPlacement = this.possibleTowerPlacement;
		if (!possibleTowerPlacement.exists) return;

		producer.setPage("GAME");

		const towerPlacement = possibleTowerPlacement.value;
		towerPlacement.maid.Destroy();

		this.possibleTowerPlacement = {
			exists: false,
		};

		this.towerActionController.enable();
	}

	private placeTower() {
		if (!this.gameMap) return;

		const possibleTowerPlacement = this.possibleTowerPlacement;
		if (!possibleTowerPlacement.exists) return;

		const towerPlacement = possibleTowerPlacement.value;
		const towerType = towerPlacement.type;
		const towerCFrame = towerPlacement.cframe;
		const towerRotation = towerPlacement.rotation;

		const isValid = canPlaceAtPosition(this.gameMap, towerCFrame.Position, getTowerObstructionRadius(towerType));
		if (!isValid) return;

		producer.setPage("GAME");

		const placeSound = createSound(sounds.tower_place, { volume: 0.2 });
		placeSound.Play();

		Debris.AddItem(placeSound, 2);

		Events.placeTower.fire(towerType, towerCFrame.mul(CFrame.Angles(0, math.rad(towerRotation), 0)));

		this.clearTower();
	}
}

import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { ReplicatedStorage, Workspace, RunService, UserInputService } from "@rbxts/services";
import { TowerModel } from "shared/modules/tower-model";
import { Possible, possible } from "shared/modules/possible";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";
import { Events } from "client/network";
import { TowerType } from "shared/modules/tower-type";
import { TowerLoadout } from "client/ui/tower-loadout";

const TOWER_PLACEMENT_DISTANCE = 1000;

const localPlayer = Players.LocalPlayer;

const assets = ReplicatedStorage.assets;
const towers = assets.towers;
const archer = towers.archer;
const archerModel = archer.models.archer;
const images = archer.images;
const placementImage = images.placement;

const camera = Workspace.Camera;

@Controller({})
export class TowerController implements OnStart {
	private tower: Possible<{
		model: TowerModel;
		type: TowerType;
	}>;
	private cframe: CFrame;

	constructor() {
		this.tower = {
			exists: false,
		};

		this.cframe = new CFrame();
	}

	onStart() {
		this.renderHotbar();

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
					break;
				}
			}
		});

		RunService.BindToRenderStep("UpdateTowerModel", Enum.RenderPriority.Camera.Value - 1, () => {
			this.updateTowerModel();
		});
	}

	private renderHotbar() {
		const playerGui = localPlayer.FindFirstChildOfClass("PlayerGui");
		if (!playerGui) return;

		const root = createRoot(playerGui);
		root.render(
			<screengui ResetOnSpawn={false}>
				<TowerLoadout
					towerSlots={[
						{
							number: 1,
							callback: () => {
								const archerClone = archerModel.Clone();
								archerClone.Parent = Workspace;

								this.setTower(archerClone, "ARCHER");
							},
							icon: `rbxassetid://${placementImage.Value}`,
							cost: 100,
						},
					]}
				/>
			</screengui>,
		);
	}

	private placeTower() {
		const possibleTower = this.tower;
		if (!possibleTower.exists) return;

		const tower = possibleTower.value;

		Events.placeTower(tower.type, this.cframe);
		this.clearTower();
	}

	private clearTower() {
		const possibleTower = this.tower;
		if (!possibleTower.exists) return;

		const tower = possibleTower.value;

		tower.model.Destroy();
		this.tower = {
			exists: false,
		};
	}

	private setTower(towerModel: TowerModel, towerType: TowerType) {
		this.clearTower();

		this.tower = {
			exists: true,
			value: {
				model: towerModel,
				type: towerType,
			},
		};
	}

	private getTowerPlacementRaycastResult(): Possible<RaycastResult> {
		const possibleTower = this.tower;
		if (!possibleTower.exists)
			return {
				exists: false,
			};

		const tower = possibleTower.value;
		const model = tower.model;

		const mousePosition = UserInputService.GetMouseLocation();
		const mouseRay = camera.ViewportPointToRay(mousePosition.X, mousePosition.Y);

		const origin = mouseRay.Origin;
		const direction = mouseRay.Direction.mul(TOWER_PLACEMENT_DISTANCE);

		const raycastParameters = new RaycastParams();
		raycastParameters.FilterDescendantsInstances = [model];
		raycastParameters.FilterType = Enum.RaycastFilterType.Blacklist;

		const raycastResult = possible<RaycastResult>(Workspace.Raycast(origin, direction, raycastParameters));

		return raycastResult;
	}

	private updateTowerModel() {
		const possibleTower = this.tower;
		if (!possibleTower.exists) return;

		const tower = possibleTower.value;
		const model = tower.model;
		const rootAttachment = model.humanoidRootPart.rootAttachment;

		const raycastResult = this.getTowerPlacementRaycastResult();
		if (!raycastResult.exists) return;

		this.cframe = new CFrame(raycastResult.value.Position);

		snapToCFrameWithAttachmentOffset(model, rootAttachment, this.cframe);
	}
}

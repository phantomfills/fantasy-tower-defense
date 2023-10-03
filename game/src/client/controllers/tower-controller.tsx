import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Hotbar } from "client/ui/hotbar";
import { ReplicatedStorage, Workspace, RunService, UserInputService } from "@rbxts/services";
import { TowerModel } from "shared/modules/tower-model";
import { Possible, possible } from "shared/modules/possible";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";
import { Events } from "client/network";
import { TowerType } from "shared/modules/tower-type";

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
	private tower: Possible<TowerModel>;
	private towerType: Possible<TowerType>;
	private cframe: CFrame;

	constructor() {
		this.tower = {
			exists: false,
		};
		this.towerType = {
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
			<Hotbar
				towers={[
					{
						placementImageId: placementImage.Value,
						callback: () => {
							const archerClone = archerModel.Clone();
							archerClone.Parent = Workspace;

							this.setTower(archerClone, "ARCHER");
						},
					},
				]}
			/>,
		);
	}

	private placeTower() {
		if (!this.tower.exists) return;
		if (!this.towerType.exists) return;

		Events.placeTower(this.towerType.value, this.cframe);
		this.clearTower();
	}

	private clearTower() {
		if (!this.tower.exists) return;

		this.tower.value.Destroy();
		this.tower = {
			exists: false,
		};
		this.towerType = {
			exists: false,
		};
	}

	private setTower(towerModel: TowerModel, towerType: TowerType) {
		this.clearTower();

		this.tower = {
			exists: true,
			value: towerModel,
		};
		this.towerType = {
			exists: true,
			value: towerType,
		};
	}

	private updateTowerModel() {
		if (!this.tower.exists) return;

		const tower = this.tower.value;

		const raycastParams = new RaycastParams();
		raycastParams.FilterDescendantsInstances = [tower];
		raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;

		const mousePosition = UserInputService.GetMouseLocation();
		const mouseRay = camera.ViewportPointToRay(mousePosition.X, mousePosition.Y);
		const raycastResult = possible<RaycastResult>(
			Workspace.Raycast(mouseRay.Origin, mouseRay.Direction.mul(TOWER_PLACEMENT_DISTANCE), raycastParams),
		);
		if (!raycastResult.exists) return;

		this.cframe = new CFrame(raycastResult.value.Position);

		snapToCFrameWithAttachmentOffset(tower, tower.humanoidRootPart.rootAttachment, this.cframe);
	}
}

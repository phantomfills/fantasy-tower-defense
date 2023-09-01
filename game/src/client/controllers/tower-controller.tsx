import { Controller, OnStart } from "@flamework/core";
import { createRoot } from "@rbxts/react-roblox";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Hotbar } from "client/ui/hotbar";
import { ReplicatedStorage, Workspace, RunService, UserInputService } from "@rbxts/services";
import { TowerModel } from "shared/modules/tower-model-type";
import { Possible, optionalToPossible } from "shared/modules/possible-type";
import { snapToCFrameWithAttachmentOffset } from "shared/modules/snap-to-cframe";

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

	constructor() {
		this.tower = {
			exists: false,
		};
	}

	onStart() {
		this.renderHotbar();

		UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;
			if (input.KeyCode !== Enum.KeyCode.Q) return;
			this.clearTower();
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
							this.setTower(archerClone);
						},
					},
				]}
			/>,
		);
	}

	private clearTower() {
		if (!this.tower.exists) return;

		this.tower.value.Destroy();
		this.tower = {
			exists: false,
		};
	}

	private setTower(towerModel: TowerModel) {
		this.clearTower();

		this.tower = {
			exists: true,
			value: towerModel,
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
		const raycastResult = optionalToPossible<RaycastResult>(
			Workspace.Raycast(mouseRay.Origin, mouseRay.Direction.mul(TOWER_PLACEMENT_DISTANCE), raycastParams),
		);
		if (!raycastResult.exists) return;

		snapToCFrameWithAttachmentOffset(
			tower,
			tower.humanoidRootPart.rootAttachment,
			new CFrame(raycastResult.value.Position),
		);
	}
}

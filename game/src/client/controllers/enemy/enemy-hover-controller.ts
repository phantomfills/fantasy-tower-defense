import { Controller, OnTick } from "@flamework/core";
import { UserInputService, Workspace } from "@rbxts/services";
import { store } from "client/store";
import { getHoveringEnemyId } from "client/store/enemy-hover";
import { Possible, possible } from "shared/modules/util/possible";

const MAX_ENEMY_HOVER_DISTANCE = 100;

@Controller({})
export class EnemyHoverController implements OnTick {
	private getHoveringEnemyId(): Possible<string> {
		const possibleCamera = possible<Camera>(Workspace.CurrentCamera);
		if (!possibleCamera.exists)
			return {
				exists: false,
			};

		const camera = possibleCamera.value;

		const mousePosition = UserInputService.GetMouseLocation();
		const ray = camera.ViewportPointToRay(mousePosition.X, mousePosition.Y);
		const origin = ray.Origin;
		const direction = ray.Direction.mul(MAX_ENEMY_HOVER_DISTANCE);

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
		const possibleId = possible<AttributeValue>(model.GetAttribute("id"));
		if (!possibleId.exists)
			return {
				exists: false,
			};

		const id = possibleId.value;
		if (!typeIs(id, "string"))
			return {
				exists: false,
			};

		return {
			exists: true,
			value: id,
		};
	}

	onTick() {
		const possibleEnemyHoverId = this.getHoveringEnemyId();
		if (!possibleEnemyHoverId.exists) {
			store.clearEnemyHoverId();
			return;
		}

		store.setEnemyHoverId(possibleEnemyHoverId.value);
	}
}

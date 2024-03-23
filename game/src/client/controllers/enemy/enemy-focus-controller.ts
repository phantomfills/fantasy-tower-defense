import { Controller, OnTick } from "@flamework/core";
import { Players, UserInputService, Workspace } from "@rbxts/services";
import { producer } from "client/store";
import { selectEnemyDetailViewType } from "client/store/settings";
import { Possible, possible } from "shared/modules/utils/possible";
import { selectClosestEnemyIdToPosition } from "shared/store/enemy";

const MAX_ENEMY_HOVER_DISTANCE = 100;

const player = Players.LocalPlayer;

@Controller({})
export class EnemyFocusController implements OnTick {
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

	private getClosestEnemyId(): Possible<string> {
		const character = player.Character;
		if (!character) return { exists: false };

		const characterPosition = character.GetPivot().Position;

		const closestEnemy = producer.getState(selectClosestEnemyIdToPosition(characterPosition));
		if (!closestEnemy.exists) return { exists: false };

		return {
			exists: true,
			value: closestEnemy.value[0],
		};
	}

	onTick() {
		const enemyDetailViewType = producer.getState(selectEnemyDetailViewType);

		switch (enemyDetailViewType) {
			case "HOVER": {
				const possibleEnemyHoverId = this.getHoveringEnemyId();
				if (!possibleEnemyHoverId.exists) {
					producer.clearEnemyFocusId();
					return;
				}

				producer.setEnemyFocusId(possibleEnemyHoverId.value);

				break;
			}
			case "CLOSEST": {
				const possibleClosestEnemyId = this.getClosestEnemyId();
				if (!possibleClosestEnemyId.exists) {
					producer.clearEnemyFocusId();
					return;
				}

				producer.setEnemyFocusId(possibleClosestEnemyId.value);

				break;
			}
		}
	}
}

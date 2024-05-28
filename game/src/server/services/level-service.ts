import { Service, OnStart } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { Functions } from "server/network";
import { producer } from "server/store";
import { getGameMapFromMapType, MapModel } from "shared/modules/map/map-type-to-game-map-map";
import { isValidPlacementPosition } from "shared/modules/tower/valid-placement-position";
import { E_Maps, selectMapType } from "shared/store/level";

@Service({})
export class LevelService implements OnStart {
	private gameMap: MapModel | undefined;
	private placementArea:
		| (Folder & {
				ground: Folder;
		  })
		| undefined;

	onStart() {
		Functions.getMap.setCallback(() => {
			return this.gameMap;
		});

		this.updateMap(producer.getState(selectMapType));

		producer.subscribe(selectMapType, (mapType) => {
			this.updateMap(mapType);
		});
	}

	private updateMap(mapType: E_Maps) {
		if (this.gameMap !== undefined) this.gameMap.Destroy();

		this.gameMap = getGameMapFromMapType(mapType).template.Clone();
		this.gameMap.Parent = Workspace;

		this.placementArea = this.gameMap.placementArea;
	}

	isValidPlacementPosition(position: Vector3): boolean {
		if (!this.gameMap || !this.placementArea) return false;
		return isValidPlacementPosition(this.gameMap, position);
	}
}

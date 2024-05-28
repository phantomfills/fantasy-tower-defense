import { ReplicatedStorage } from "@rbxts/services";
import { E_Maps } from "shared/store/level";
import { PathWaypoint } from "./path-waypoint";

export type MapModel = Model & {
	placementArea: Folder & {
		ground: Folder;
	};
};

interface GameMap {
	template: MapModel;
	paths: PathWaypoint[][];
}

const mapTypeToGameMapMap: Record<E_Maps, GameMap> = {
	TUTORIAL: {
		template: ReplicatedStorage.assets.maps.tutorial,
		paths: [
			ReplicatedStorage.assets.maps.tutorial.path
				.GetChildren()
				.sort((a, b) => (tonumber(a.Name) ?? 0) < (tonumber(b.Name) ?? 0)) as PathWaypoint[],
		],
	},
};

export function getGameMapFromMapType(mapType: E_Maps) {
	return mapTypeToGameMapMap[mapType];
}

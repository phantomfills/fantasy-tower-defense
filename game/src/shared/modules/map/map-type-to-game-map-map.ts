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
	DOUBLE_LANE: {
		template: ReplicatedStorage.assets.maps["tutorial-double-lane-test"],
		paths: [
			ReplicatedStorage.assets.maps["tutorial-double-lane-test"].path["0"]
				.GetChildren()
				.sort((a, b) => (tonumber(a.Name) ?? 0) < (tonumber(b.Name) ?? 0)) as PathWaypoint[],
			ReplicatedStorage.assets.maps["tutorial-double-lane-test"].path["1"]
				.GetChildren()
				.sort((a, b) => (tonumber(a.Name) ?? 0) < (tonumber(b.Name) ?? 0)) as PathWaypoint[],
		],
	},
	WACKY_WEATHER: {
		template: ReplicatedStorage.assets.maps.wacky_weather,
		paths: [
			ReplicatedStorage.assets.maps.wacky_weather.paths["0"]
				.GetChildren()
				.sort((a, b) => (tonumber(a.Name) ?? 0) < (tonumber(b.Name) ?? 0)) as PathWaypoint[],
		],
	},
};

export function getGameMapFromMapType(mapType: E_Maps) {
	return mapTypeToGameMapMap[mapType];
}

import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";

function initPlayerObjectives(player: Player) {
	const userId = tostring(player.UserId);
	producer.initPlayerObjectives(userId);
}

@Service({})
export class LevelObjectiveService implements OnStart {
	onStart() {
		Players.GetPlayers().forEach(initPlayerObjectives);
		Players.PlayerAdded.Connect(initPlayerObjectives);
	}
}

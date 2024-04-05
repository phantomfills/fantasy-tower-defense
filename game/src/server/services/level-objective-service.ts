import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";

function handlePlayerAdded(player: Player) {
	const userId = tostring(player.UserId);
	producer.initPlayerObjectives(userId);
}

@Service({})
export class LevelObjectiveService implements OnStart {
	onStart() {
		Players.GetPlayers().forEach(handlePlayerAdded);
		Players.PlayerAdded.Connect(handlePlayerAdded);
	}
}

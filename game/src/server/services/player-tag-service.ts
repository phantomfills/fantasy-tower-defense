import { Service, OnStart } from "@flamework/core";
import { CollectionService, Players } from "@rbxts/services";
import { tags } from "shared/modules/utils/tags";

function handleCharacterAdded(character: Model) {
	CollectionService.AddTag(character, tags.CHARACTER);
}

function handlePlayerAdded(player: Player) {
	const character = player.Character;
	if (character) {
		handleCharacterAdded(character);
	}

	player.CharacterAdded.Connect(handleCharacterAdded);
}

@Service({})
export class PlayerTagService implements OnStart {
	onStart() {
		Players.GetPlayers().forEach(handlePlayerAdded);
		Players.PlayerAdded.Connect(handlePlayerAdded);
	}
}

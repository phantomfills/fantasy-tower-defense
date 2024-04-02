import { Service, OnStart } from "@flamework/core";
import { CommanderServer } from "@rbxts/commander";

@Service({})
export class AdminService implements OnStart {
	onStart() {
		CommanderServer.start((registry) => {}, {
			registerBuiltInTypes: true,
		}).catch((err) => warn(`Commander could not be started: ${tostring(err)}`));
	}
}

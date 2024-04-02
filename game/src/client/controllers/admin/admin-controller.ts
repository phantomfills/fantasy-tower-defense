import { Controller, OnStart } from "@flamework/core";
import { CommanderClient, CommanderInterface } from "@rbxts/commander";

@Controller({})
export class AdminController implements OnStart {
	onStart() {
		CommanderClient.start(
			(registry) => {
				// Register commands or types here
			},
			{
				interface: CommanderInterface.create({
					// You can configure the interface here, such as changing activation keys
				}),

				// The options below are optional

				// The maximum terminal and command history length, default length is 1000
				historyLength: 1000,

				// If you don't want to register built-in types, you can change this option
				// This is set to true by default
				registerBuiltInTypes: true,
			},
		).catch((err) => warn("Commander could not be started:", tostring(err)));
	}
}

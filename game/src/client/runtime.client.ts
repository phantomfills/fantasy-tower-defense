import { Flamework } from "@flamework/core";
import { CommanderClient, CommanderInterface } from "@rbxts/commander";
import { commanderEnemyType } from "shared/modules/command/enemy-type";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers/app");
Flamework.addPaths("src/client/controllers/enemy");
Flamework.addPaths("src/client/controllers/tower");
Flamework.addPaths("src/client/controllers/sound");
Flamework.addPaths("src/shared/components");

CommanderClient.start(
	(registry) => {
		registry.registerType(commanderEnemyType);
		registry.registerCommands();
	},
	{
		interface: CommanderInterface.create({}),

		historyLength: 1000,

		registerBuiltInTypes: true,
	},
);

Flamework.ignite();

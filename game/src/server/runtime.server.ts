import { Flamework } from "@flamework/core";
import { CommanderServer } from "@rbxts/commander";
import { commanderEnemyType } from "shared/modules/command/enemy-type";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.addPaths("src/server/modules/command");

CommanderServer.start(
	(registry) => {
		registry.registerType(commanderEnemyType);
		registry.registerCommands();
	},
	{
		registerBuiltInTypes: true,
	},
).catch((err) => warn(`Commander could not be started: ${tostring(err)}`));

Flamework.ignite();

import { Flamework } from "@flamework/core";
import { Loop } from "@rbxts/matter";
import { systems } from "./systems";
import { RunService } from "@rbxts/services";
import { world } from "./world";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

Flamework.ignite();

const loop = new Loop(world);
loop.scheduleSystems(systems);

loop.begin({
	default: RunService.Heartbeat,
});

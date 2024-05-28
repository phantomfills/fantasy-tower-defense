import { Command, Commander, CommanderType, CommandInteraction, Guard } from "@rbxts/commander";
import { EnemyType, isNonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { createAttackingEnemy, createNonAttackingEnemy } from "../enemy/enemy-factory";
import { producer } from "server/store";
import { createId } from "shared/modules/utils/id-utils";
import { isAdmin } from "../../../shared/modules/command/admin-guard";
import { GameType } from "../../../shared/modules/command/game-type";
import { holdFor } from "shared/modules/utils/wait-util";

@Commander()
class Enemy {
	@Command({
		name: "enemy",
		description: "Spawns an enemy on the path.",
		arguments: [
			{
				name: "enemy",
				description: "The enemy to spawn.",
				type: GameType.Enemy,
			},
			{
				name: "count",
				description: "The number of enemies to spawn.",
				type: CommanderType.Number,
				optional: true,
			},
		],
	})
	@Guard(isAdmin)
	spawnEnemy(interaction: CommandInteraction, enemyType: EnemyType, count: number = 1) {
		(async () => {
			for (const _ of $range(1, count)) {
				if (isNonAttackingEnemyType(enemyType)) {
					const enemy = createNonAttackingEnemy(enemyType, 0);
					producer.addEnemy(enemy, createId());
				} else {
					const enemy = createAttackingEnemy(enemyType, 0);
					producer.addEnemy(enemy, createId());
				}

				holdFor(200);
			}
		})();

		interaction.reply(`Spawning enemy ${enemyType} ${count} times.`);
	}

	@Command({
		name: "clearEnemies",
		description: "Clears all enemies.",
		arguments: [],
	})
	@Guard(isAdmin)
	clearEnemies(interaction: CommandInteraction) {
		producer.clearEnemies();

		interaction.reply("Cleared all enemies.");
	}
}

import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { EnemyType, isEnemyType } from "shared/modules/enemy/enemy-type";
import { createId } from "shared/modules/utils/id-utils";
import { getMap } from "shared/store/map";

const COMMAND_PREFIX = "!";

const ADMINS = [
	16778030463, // PhantomFills
	556438497, // ManicDarkCat
];

function processPlayerMessage(userId: string, message: string) {
	if (message.sub(1, 1) !== COMMAND_PREFIX) return;

	const splitMessage = message.split(" ");
	const command = splitMessage[0].split("!")[1];

	print(command);

	switch (command) {
		case "money": {
			const playerString = splitMessage[1];

			const player = Players.FindFirstChild(playerString);
			if (player === undefined) return;
			if (!classIs(player, "Player")) return;

			const playerUserId = tostring(player.UserId);

			const moneyString = splitMessage[2];
			const money = tonumber(moneyString);
			if (money === undefined) return;

			producer.awardBonus(playerUserId, money);

			break;
		}
		case "enemy": {
			const enemyType = splitMessage[1];
			if (!isEnemyType(enemyType)) return;

			const enemyCount = splitMessage[2];
			const enemyCountNumber = tonumber(enemyCount);
			if (enemyCountNumber === undefined) return;

			const map = producer.getState(getMap);
			const path = map.path;

			for (let i = 0; i < enemyCountNumber; i++) {
				const enemy = createEnemy(enemyType, path);
				producer.addEnemy(enemy, createId());
				task.wait(0.2);
			}

			break;
		}
	}
}

function handlePlayerAdded(player: Player) {
	const userId = tostring(player.UserId);

	player.Chatted.Connect((message) => {
		processPlayerMessage(userId, message);
	});
}

@Service({})
export class AdminService implements OnStart {
	onStart() {
		Players.GetPlayers().forEach(handlePlayerAdded);

		Players.PlayerAdded.Connect(handlePlayerAdded);
	}
}

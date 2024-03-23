import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { createEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { isEnemyType } from "shared/modules/enemy/enemy-type";
import { createId } from "shared/modules/utils/id-utils";
import { getMap } from "shared/store/map";

const COMMAND_PREFIX = "!";

const ADMINS = [
	"585267099", // PhantomFills
	"556438497", // ManicDarkCat
	"1620332636", // "roblox26io"
];

function processPlayerMessage(userId: string, message: string) {
	if (!ADMINS.includes(userId)) return;
	if (message.sub(1, 1) !== COMMAND_PREFIX) return;

	const splitMessage = message.split(" ");
	const command = splitMessage[0].split("!")[1];

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

			const map = producer.getState(getMap);
			const path = map.path;

			for (let i = 0; i < (enemyCountNumber === undefined ? 1 : enemyCountNumber); i++) {
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

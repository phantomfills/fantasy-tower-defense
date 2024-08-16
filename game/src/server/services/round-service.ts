import { Service, OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { createAttackingEnemy, createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { producer } from "server/store";
import { isNonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { tracks } from "shared/modules/music/tracks";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { selectNoEnemiesExist } from "shared/store/enemy";
import { Round, selectGameOver, selectMapType, selectRounds } from "shared/store/level";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 1_000;
const ROUND_BONUS = 200;
const ROUND_BONUS_MULTIPLIER = 1.5;
const HEALTH_SCALE_FACTOR_INCREASE_PER_PLAYER = 0.5;

function getRoundBonusForRound(round: number, initialRoundBonus: number, roundBonusMultiplier: number): number {
	const additionalBonusMultiplier = roundBonusMultiplier - 1;
	const totalRoundBonusMultiplier = 1 + (round - 1) * additionalBonusMultiplier;

	const roundBonus = math.floor(initialRoundBonus * totalRoundBonusMultiplier);

	return roundBonus;
}

function getEnemyHealthScaleFactor(playerCount: number): number {
	return 1 + (playerCount - 1) * HEALTH_SCALE_FACTOR_INCREASE_PER_PLAYER;
}

type RoundResult =
	| {
			type: "success";
	  }
	| {
			type: "error";
			message: string;
	  };

@Service({})
export class RoundService implements OnStart {
	onStart() {
		producer.subscribe(selectGameOver, (gameOver) => {
			if (!gameOver) return;
			producer.clearEnemies();
		});

		while (Players.GetPlayers().size() === 0) {
			RunService.Heartbeat.Wait();
		}

		holdFor(5_000);

		producer.setTrackId(tracks.intro_music);

		const playerCount = Players.GetPlayers().size();
		producer.setEnemyHealthScaleFactor(getEnemyHealthScaleFactor(playerCount));

		const rounds = producer.getState(selectRounds);

		for (let roundIndex = 0; roundIndex < rounds.size(); roundIndex++) {
			const round = rounds[roundIndex];
			const roundNumber = roundIndex + 1;

			if (round.dialogs.size() > 0) producer.setDialogs(round.dialogs);

			const roundBonus = getRoundBonusForRound(roundNumber, ROUND_BONUS, ROUND_BONUS_MULTIPLIER);

			let roundCompleted = false;

			this.spawnRound(round).finally(() => {
				producer.awardBonusToAll(roundBonus);
				roundCompleted = true;
			});

			while (!roundCompleted) {
				RunService.Heartbeat.Wait();
			}

			const gameOver = producer.getState(selectGameOver);
			if (gameOver) break;

			holdFor(INTERVAL_BETWEEN_ROUNDS_MILLISECONDS);

			producer.addProgressToObjectiveForAllPlayers("COMPLETE_10_ROUNDS", 1);

			// if (roundNumber === 12) {
			// 	producer.clearTrackId();

			// 	Events.playSound.broadcast(sounds.victory);
			// 	this.setDialog("You have completed the tutorial! Congratulations!");
			// }
		}
	}

	private async spawnRound(round: Round): Promise<RoundResult> {
		const numberOfPaths = getGameMapFromMapType(producer.getState(selectMapType)).paths.size();
		let currentPath = 0;

		for (const group of round.enemyGroups) {
			const { enemyType } = group;

			(async () => {
				for (const _ of $range(0, group.count - 1)) {
					const gameOver = producer.getState(selectGameOver);
					if (gameOver) return { type: "error", message: "Game over - cancelling round" };

					const id = createId();
					if (isNonAttackingEnemyType(enemyType)) {
						const enemy = createNonAttackingEnemy(enemyType, currentPath);
						producer.addEnemy(enemy, id);
					} else {
						const enemy = createAttackingEnemy(enemyType, currentPath);
						producer.addEnemy(enemy, id);
					}

					currentPath++;
					if (currentPath > numberOfPaths - 1) currentPath = 0;

					holdFor(group.enemySpawnInterval);
				}
			})();

			holdFor(group.delayToNextGroup);
		}

		let roundEnded = false;

		while (!roundEnded) {
			RunService.Heartbeat.Wait();

			roundEnded = producer.getState(selectNoEnemiesExist);
		}

		return { type: "success" };
	}
}

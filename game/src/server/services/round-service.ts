import { Service, OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { createAttackingEnemy, createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { Events } from "server/network";
import { producer } from "server/store";
import { EnemyType, isNonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { getGameMapFromMapType } from "shared/modules/map/map-type-to-game-map-map";
import { tracks } from "shared/modules/music/tracks";
import { sounds } from "shared/modules/sounds/sounds";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { selectDialogComplete } from "shared/store/dialog";
import { selectNoEnemiesExist } from "shared/store/enemy";
import { selectGameOver, selectMapType } from "shared/store/level";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 1_000;
const ROUND_BONUS = 500;
const ROUND_BONUS_MULTIPLIER = 1.2;

function getRoundBonusForRound(round: number, initialRoundBonus: number, roundBonusMultiplier: number): number {
	const additionalBonusMultiplier = roundBonusMultiplier - 1;
	const totalRoundBonusMultiplier = 1 + (round - 1) * additionalBonusMultiplier;

	const roundBonus = math.floor(initialRoundBonus * totalRoundBonusMultiplier);

	return roundBonus;
}

function getRoundBonusForRoundWithPlayerCount(
	round: number,
	initialRoundBonus: number,
	roundBonusMultiplier: number,
	playerCount: number,
) {
	return math.floor(getRoundBonusForRound(round, initialRoundBonus, roundBonusMultiplier) / playerCount);
}

interface Group {
	enemyType: EnemyType;
	count: number;
	enemySpawnInterval: number;
	delayToNextGroup: number;
}

type Round = Group[];

type Level = Round[];

const level: Level = [
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 3,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 5,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 4,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 5,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 4,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
		{
			enemyType: "TRAINING_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "ARMORED_DUMMY",
			count: 12,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 2,
			enemySpawnInterval: 500,
			delayToNextGroup: 250,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 9,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "STEALTH_DUMMY",
			count: 5,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
		{
			enemyType: "MULTIPLIER_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "MULTIPLIER_DUMMY",
			count: 16,
			enemySpawnInterval: 500,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 20,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 8,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 10,
			enemySpawnInterval: 500,
			delayToNextGroup: 1_000,
		},
		{
			enemyType: "STEALTH_DUMMY",
			count: 7,
			enemySpawnInterval: 500,
			delayToNextGroup: 3_000,
		},
		{
			enemyType: "GUARD_DUMMY",
			count: 5,
			enemySpawnInterval: 1_000,
			delayToNextGroup: 0,
		},
	],
	[
		{
			enemyType: "TRAINING_DUMMY",
			count: 15,
			enemySpawnInterval: 100,
			delayToNextGroup: 250,
		},
		{
			enemyType: "ARMORED_DUMMY",
			count: 15,
			enemySpawnInterval: 175,
			delayToNextGroup: 250,
		},
		{
			enemyType: "SPEEDSTER_DUMMY",
			count: 15,
			enemySpawnInterval: 50,
			delayToNextGroup: 150,
		},
		{
			enemyType: "STEALTH_DUMMY",
			count: 15,
			enemySpawnInterval: 125,
			delayToNextGroup: 125,
		},
		{
			enemyType: "MULTIPLIER_DUMMY",
			count: 22,
			enemySpawnInterval: 125,
			delayToNextGroup: 75,
		},
		{
			enemyType: "GUARD_DUMMY",
			count: 5,
			enemySpawnInterval: 350,
			delayToNextGroup: 750,
		},
		{
			enemyType: "DUMMY_TANK",
			count: 1,
			enemySpawnInterval: 0,
			delayToNextGroup: 0,
		},
	],
];

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
	private setDialog(message: string) {
		const playerDialogCompletionState: Record<string, boolean> = {};

		Players.GetPlayers().forEach((player) => {
			const userId = tostring(player.UserId);
			playerDialogCompletionState[userId] = false;
		});

		producer.setDialog(message, playerDialogCompletionState);

		let stopYielding = false;

		const dialogComplete = producer.getState(selectDialogComplete);
		if (dialogComplete) {
			stopYielding = true;
		}

		const unsubscribe = producer.subscribe(selectDialogComplete, (dialogComplete) => {
			if (!dialogComplete) return;
			stopYielding = true;
		});

		while (!stopYielding) {
			RunService.Heartbeat.Wait();
		}

		holdFor(1_000);

		unsubscribe();
	}

	onStart() {
		producer.subscribe(selectGameOver, (gameOver) => {
			if (!gameOver) return;
			producer.clearEnemies();
		});

		while (Players.GetPlayers().size() === 0) {
			RunService.Heartbeat.Wait();
		}

		holdFor(5_000);

		producer.setTrackId(tracks.cyber_trance);

		this.setDialog("Are you ready to start the tutorial? Tick the box to continue!");
		producer.setPlayersCanPlaceTower(true);
		this.setDialog(
			"Click on the tower button at the bottom, and move the Defect to a location where its circle reaches the path and it is blue, then click again to place it!",
		);
		producer.setPlayersCanUpgradeTower(true);
		this.setDialog(
			"Click on a tower to view its stats. If you have enough money, click on the upgrade button to upgrade it!",
		);
		this.setDialog(
			"If you need to sell a tower, click on the sell button on the tower's stats panel! You do only get 50% of the money back, though!",
		);
		this.setDialog(
			"Move nearer to enemies to see a tooltip with their stats! The tooltip will appear on the closest enemy to you!",
		);

		for (let roundIndex = 0; roundIndex < level.size(); roundIndex++) {
			const round = level[roundIndex];
			const roundNumber = roundIndex + 1;

			switch (roundNumber) {
				case 1: {
					producer.setTrackId(tracks.trance_machine);
					this.setDialog(
						"You will gain money for each enemy you defeat. Use it to build more towers, or upgrade existing ones!",
					);
					break;
				}
				case 3: {
					this.setDialog("Quicker dummies are approaching, be prepared!");
					break;
				}
				case 5: {
					this.setDialog(
						"Armored dummies are on the way; they're really strong, so upgrading or placing more Defects is essential.",
					);
					break;
				}
				case 6: {
					this.setDialog(
						"Stealth dummies are coming in a few rounds! They are invisible to towers without the 'stealth' trait! Defect gains this trait with its level 2 upgrade!",
					);
					break;
				}
				case 9: {
					this.setDialog(
						"Multipliers are approaching! They will turn into Divided Dummies when they are killed! We need lots of firepower to take them down. Stay vigilant!",
					);
					break;
				}
				case 10: {
					this.setDialog(
						"Loud thuds in the distance? I don't like what I'm hearing... Reinforced enemies coming in a few rounds. Make sure your Defects are level 3 or higher, or they will not deal any damage!",
					);
					break;
				}
				case 11: {
					this.setDialog(
						"Guard dummies have been spotted! Are they protecting something? We need to take them down!",
					);
					break;
				}
				case 12: {
					producer.setTrackId(tracks.light_show);
					this.setDialog(
						"The Dummy Tank is here! It will throw huge boulders at your troops that can kill them! You earn 50% money back if your troop is killed. Place low level troops near to the tank to stop it from attacking your main damage dealers!",
					);
					break;
				}
			}

			const playerCount = Players.GetPlayers().size();
			const roundBonus = getRoundBonusForRoundWithPlayerCount(
				roundNumber,
				ROUND_BONUS,
				ROUND_BONUS_MULTIPLIER,
				playerCount,
			);

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

			producer.addProgressToObjectiveForAllPlayers("COMPLETE_ROUNDS", 1);

			if (roundNumber === 12) {
				producer.clearTrackId();

				Events.playSound.broadcast(sounds.victory);
				this.setDialog("You have completed the tutorial! Congratulations!");
			}
		}
	}

	private async spawnRound(round: Round): Promise<RoundResult> {
		const numberOfPaths = getGameMapFromMapType(producer.getState(selectMapType)).paths.size();
		let currentPath = 0;

		for (const group of round) {
			const { enemyType } = group;

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

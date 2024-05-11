import { Service, OnStart } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { createAttackingEnemy, createNonAttackingEnemy } from "server/modules/enemy/enemy-factory";
import { Events } from "server/network";
import { producer } from "server/store";
import { EnemyType, isNonAttackingEnemyType } from "shared/modules/enemy/enemy-type";
import { tracks } from "shared/modules/music/tracks";
import { sounds } from "shared/modules/sounds/sounds";
import { createId } from "shared/modules/utils/id-utils";
import { holdFor } from "shared/modules/utils/wait-util";
import { selectDialogComplete } from "shared/store/dialog";
import { selectNoEnemiesExist } from "shared/store/enemy";
import { selectGameOver, selectMap } from "shared/store/map";

const INTERVAL_BETWEEN_ROUNDS_MILLISECONDS = 1_000;
const ROUND_BONUS = 100;
const ROUND_BONUS_MULTIPLIER = 1.25;

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

		this.setDialog("Welcome to the tutorial!");
		producer.setPlayersCanPlaceTower(true);
		this.setDialog(
			"Click on the tower button at the bottom, and move the tower to a location where its gray circle reaches the path, then click again to place it!",
		);
		producer.setPlayersCanUpgradeTower(true);
		this.setDialog("Click on a tower to upgrade it!");

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
					this.setDialog("I saw some quicker enemies in the distance, be prepared!");
					break;
				}
				case 5: {
					this.setDialog(
						"Armored enemies are on the way; they're really strong, so upgrading or placing more Defects is essential.",
					);
					break;
				}
				case 6: {
					this.setDialog(
						"Stealth enemies are coming in a few rounds! They are invisible to towers without the 'stealth' trait! Defect gains this trait with its level 2 upgrade!",
					);
					break;
				}
				case 9: {
					this.setDialog(
						"Multipliers are coming! They will turn into more enemies when they are killed! We need lots of defense to take them down. Stay vigilant!",
					);
					break;
				}
				case 10: {
					this.setDialog(
						"Loud thuds in the distance? I don't like what I'm hearing... Reinforced enemies coming next round. Make sure your Defects are level 3 or higher, or they will not deal any damage!",
					);
					break;
				}
				case 11: {
					this.setDialog("Who are they? Are they protecting something?");
					break;
				}
				case 12: {
					producer.setTrackId(tracks.light_show);
					this.setDialog("The Dummy Tank is here! Place low level troops near to it to bait its attacks!");
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
		const path = producer.getState(selectMap).path;

		for (const group of round) {
			for (let i = 0; i < group.count; i++) {
				const gameOver = producer.getState(selectGameOver);
				if (gameOver) return { type: "error", message: "Game over - cancelling round" };

				const { enemyType } = group;

				if (isNonAttackingEnemyType(enemyType)) {
					const enemy = createNonAttackingEnemy(enemyType, path);
					producer.addEnemy(enemy, createId());
				} else {
					const enemy = createAttackingEnemy(enemyType, path);
					producer.addEnemy(enemy, createId());
				}

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

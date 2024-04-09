import { TransformResult, TypeBuilder } from "@rbxts/commander";
import { ALL_ENEMY_TYPES } from "shared/modules/enemy/enemy-type";
import { t } from "@rbxts/t";
import { GameType } from "./game-type";

export const commanderEnemyType = TypeBuilder.create(GameType.Enemy)
	.validate(t.string)
	.transform((text) => {
		if (t.valueOf(ALL_ENEMY_TYPES)(text)) {
			return TransformResult.ok(text);
		}
		return TransformResult.err("Invalid enemy type.");
	})
	.suggestions((text) => ALL_ENEMY_TYPES.filter((value) => string.find(value, text)[0] !== undefined))
	.build();

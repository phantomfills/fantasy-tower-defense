import { TransformResult, TypeBuilder } from "@rbxts/commander";
import { ENEMY_TYPE } from "shared/modules/enemy/enemy-type";
import { t } from "@rbxts/t";
import { GameType } from "./game-type";

export const commanderEnemyType = TypeBuilder.create(GameType.Enemy)
	.validate(t.string)
	.transform((text) => {
		if (t.valueOf(ENEMY_TYPE)(text)) {
			return TransformResult.ok(text);
		}
		return TransformResult.err("Invalid enemy type.");
	})
	.suggestions((text) => ENEMY_TYPE.filter((value) => string.find(value, text)[0] !== undefined))
	.build();

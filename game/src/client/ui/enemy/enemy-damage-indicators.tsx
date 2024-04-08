import React from "@rbxts/react";
import Object from "@rbxts/object-utils";
import { useSelector } from "@rbxts/react-reflex";
import { selectEnemyDamageIndicators } from "client/store/enemy-damage-indicator";
import { EnemyDamageIndicator } from "./enemy-damage-indicator";

export function EnemyDamageIndicators() {
	const enemyDamageIndicators = useSelector(selectEnemyDamageIndicators);

	return (
		<>
			{Object.values(enemyDamageIndicators).map(({ damage, position, spawnTime }, index) => (
				<EnemyDamageIndicator
					key={`enemy-damage-indicator-${index}`}
					damage={damage}
					position={position}
					spawnTime={spawnTime}
				/>
			))}
		</>
	);
}

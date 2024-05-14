import React from "@rbxts/react";
import Object from "@rbxts/object-utils";
import { useSelector } from "@rbxts/react-reflex";
import { selectDamageIndicators } from "client/store/damage-indicator";
import { DamageIndicator } from "./damage-indicator";

export function DamageIndicators() {
	const damageIndicators = useSelector(selectDamageIndicators);

	return (
		<>
			{Object.values(damageIndicators).map(({ damage, position, spawnTime }, index) => (
				<DamageIndicator
					key={`enemy-damage-indicator-${index}`}
					damage={damage}
					position={position}
					spawnTime={spawnTime}
				/>
			))}
		</>
	);
}

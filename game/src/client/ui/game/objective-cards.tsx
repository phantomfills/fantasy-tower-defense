import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { objectiveTypeToNameMap } from "shared/modules/game/objective-type-to-name-map";
import { selectLocalObjectives, UserObjectiveCompletionStatus } from "shared/store/objective";
import { ObjectiveCard } from "./objective-card";

export function ObjectiveCards() {
	const possibleObjectives = useSelector(selectLocalObjectives);
	const objectives: Partial<UserObjectiveCompletionStatus> = possibleObjectives.exists
		? possibleObjectives.value
		: {
				COMPLETE_10_ROUNDS: {
					_type: "PROGRESSIVE",
					progress: 3,
					maxProgress: 5,
				},
				EAT_CAKE: {
					_type: "ONE_TIME",
					value: false,
				},
		  };

	return Object.keys(objectives).map((objective) => {
		const objectiveStatus = objectives[objective];
		if (!objectiveStatus) return undefined;

		const objectiveType = objectiveStatus._type;
		const objectiveName = objectiveTypeToNameMap[objective];

		return objectiveType === "ONE_TIME" ? (
			<ObjectiveCard _type="ONE_TIME" text={objectiveName} completed={objectiveStatus.value} />
		) : (
			<ObjectiveCard
				_type="PROGRESSIVE"
				text={objectiveName}
				progress={objectiveStatus.progress}
				maxProgress={objectiveStatus.maxProgress}
			/>
		);
	});
}

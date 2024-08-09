import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { objectiveTypeToNameMap } from "shared/modules/game/objective-type-to-name-map";
import { selectLocalObjectives, UserObjectiveCompletionStatus } from "shared/store/objective";
import { ObjectiveCard } from "./objective-card";

export function ObjectiveCards() {
	const possibleObjectives = useSelector(selectLocalObjectives);
	const objectives: UserObjectiveCompletionStatus = possibleObjectives.exists
		? possibleObjectives.value
		: {
				COMPLETE_ROUNDS: {
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

		const objectiveType = objectiveStatus._type;

		const objectiveProgressText =
			objectiveType === "ONE_TIME"
				? objectiveStatus
					? "Completed"
					: "Incomplete"
				: `(${objectiveStatus.progress}/${objectiveStatus.maxProgress})`;
		const objectiveText = `${objectiveTypeToNameMap[objective]}: ${objectiveProgressText}`;

		return objectiveType === "ONE_TIME" ? (
			<ObjectiveCard _type="ONE_TIME" text={objectiveText} />
		) : (
			<ObjectiveCard
				_type="PROGRESSIVE"
				text={objectiveText}
				progress={objectiveStatus.progress}
				maxProgress={objectiveStatus.maxProgress}
			/>
		);
	});
}

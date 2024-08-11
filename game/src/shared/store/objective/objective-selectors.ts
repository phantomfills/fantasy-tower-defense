import { SharedState } from "..";
import { UserObjectiveCompletionStatus } from ".";
import { Possible } from "shared/modules/utils/possible";
import { USER_ID } from "shared/constants/core";
import Object from "@rbxts/object-utils";

export function selectPlayerObjectives(
	userId: string,
): (state: SharedState) => Possible<Partial<UserObjectiveCompletionStatus>> {
	return (state: SharedState) => {
		const userObjectives = state.objective[userId];
		if (!userObjectives) return { exists: false };

		const userObjectiveKeys = Object.keys(userObjectives);
		const userObjectiveKeysInLevel = userObjectiveKeys.filter((objective) =>
			state.level.objectives.includes(objective),
		);

		const userObjectivesInLevel: Partial<UserObjectiveCompletionStatus> = userObjectiveKeysInLevel.reduce(
			(acc, key) => {
				return { ...acc, [key]: userObjectives[key] };
			},
			{},
		);

		return { exists: true, value: userObjectivesInLevel };
	};
}

export const selectLocalObjectives = selectPlayerObjectives(USER_ID);

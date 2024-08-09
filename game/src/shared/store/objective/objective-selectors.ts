import { SharedState } from "..";
import { UserObjectiveCompletionStatus } from ".";
import { Possible } from "shared/modules/utils/possible";
import { USER_ID } from "shared/constants/core";

export function selectPlayerObjectives(
	userId: string,
): (state: SharedState) => Possible<UserObjectiveCompletionStatus> {
	return (state: SharedState) => {
		const userObjectives = state.objective[userId];
		if (!userObjectives) return { exists: false };

		return { exists: true, value: userObjectives };
	};
}

export const selectLocalObjectives = selectPlayerObjectives(USER_ID);

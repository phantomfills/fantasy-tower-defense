import { SharedState } from "..";
import { User } from ".";
import { Possible } from "shared/modules/utils/possible";

export function selectPlayerObjectives(userId: string): (state: SharedState) => Possible<User> {
	return (state: SharedState) => {
		const userObjectives = state.objective[userId];
		if (!userObjectives) return { exists: false };

		return { exists: true, value: userObjectives };
	};
}

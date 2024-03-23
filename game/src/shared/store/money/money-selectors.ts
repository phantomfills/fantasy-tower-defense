import { possible } from "shared/modules/utils/possible";
import { SharedState } from "..";

export function selectMoney(userId: string) {
	return (state: SharedState) => possible<number>(state.money[userId]);
}

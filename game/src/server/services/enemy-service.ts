import { OnTick, Service } from "@flamework/core";
import { producer } from "server/store";
import { getCurrentTimeInMilliseconds } from "shared/modules/utils/get-time-in-ms";

@Service({})
export class EnemyService implements OnTick {
	onTick(): void {
		producer.enemyTick(getCurrentTimeInMilliseconds());
	}
}

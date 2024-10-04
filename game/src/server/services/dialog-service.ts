import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { producer } from "server/store";

@Service({})
export class DialogService implements OnStart {
	onStart() {
		Events.incrementDialogIndex.connect((player) => {
			producer.incrementDialogIndex(tostring(player.UserId));
		});
	}
}

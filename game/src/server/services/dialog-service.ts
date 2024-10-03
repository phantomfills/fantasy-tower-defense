import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { producer } from "server/store";

@Service({})
export class DialogService implements OnStart {
	onStart() {
		Events.incrementDialogIndex.connect((player) => {
			print("I'm tryna increment the thing!");
			producer.incrementDialogIndex(tostring(player.UserId));
		});
	}
}

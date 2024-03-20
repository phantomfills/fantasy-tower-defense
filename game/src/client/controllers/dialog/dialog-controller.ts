import { Controller, OnStart } from "@flamework/core";
import { Trove } from "@rbxts/trove";
import { Events } from "client/network";
import { producer } from "client/store";
import { holdForPromise } from "shared/modules/utils/wait-util";

@Controller({})
export class DialogController implements OnStart {
	onStart() {
		const trove = new Trove();

		Events.setDialog.connect((text: string, time: number) => {
			trove.clean();

			producer.setDialog(text);
			trove.addPromise(
				holdForPromise(time).then(() => {
					producer.clearDialog();
				}),
			);
		});
	}
}

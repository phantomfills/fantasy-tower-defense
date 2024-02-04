/// <reference types="@rbxts/testez/globals" />

import { producer } from "server/store";

export = () => {
	const clonedProducer = producer.clone();
};

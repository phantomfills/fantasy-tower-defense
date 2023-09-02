import { Networking } from "@flamework/networking";

interface ServerEvents {
	event(param1: string): void;
}

interface ClientEvents {
	event(param1: string): void;
}

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();

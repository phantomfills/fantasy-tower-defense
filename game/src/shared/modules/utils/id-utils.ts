import { HttpService } from "@rbxts/services";

export function createId(): string {
	const id = HttpService.GenerateGUID(false);
	return id;
}

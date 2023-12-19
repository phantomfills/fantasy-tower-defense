import { HttpService } from "@rbxts/services";

const idsGenerated: string[] = [];
export function generateUniqueId(): string {
	const id = HttpService.GenerateGUID(false);
	if (idsGenerated.includes(id)) return generateUniqueId();

	idsGenerated.push(id);
	return id;
}

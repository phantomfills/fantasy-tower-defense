import { Service, OnStart, OnTick } from "@flamework/core";
import { MapService } from "./map-service";

@Service({})
export class LevelService implements OnStart, OnTick {
	constructor(private mapService: MapService) {}

	async onStart() {
		await this.mapService.start();
	}

	onTick() {
		this.mapService.tick();
	}
}

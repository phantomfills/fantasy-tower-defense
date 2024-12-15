import { component } from "@rbxts/matter";
import { E_Trait } from "shared/modules/attack/trait";

export const modelComponent = component<{
	model: Model;
}>();

export interface PathFollower {
	index: number;
	progressionAlpha: number;
	cframe: CFrame;
	speed: number;
}

export const pathFollowerComponent = component<PathFollower>();

export interface Health {
	value: number;
	max: number;
}

export const healthComponent = component<Health>();

export interface Traits {
	traits: E_Trait[];
}

export const traitsComponent = component<Traits>();

export const tracks = {
	trance_machine: "rbxassetid://1844770075",
	cyber_trance: "rbxassetid://1838129273",
	light_show: "rbxassetid://1838391039",
	victory: "rbxassetid://4879566787",
} as const;

export function isTrack(track: string): track is keyof typeof tracks {
	return track in tracks;
}

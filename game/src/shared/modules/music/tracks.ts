export const tracks = {
	chill_jazz: "rbxassetid://1845341094",
	techno: "rbxassetid://1844422218",
	light_show: "rbxassetid://1838391039",
	victory: "rbxassetid://4879566787",
} as const;

export function isTrack(track: string): track is keyof typeof tracks {
	return track in tracks;
}

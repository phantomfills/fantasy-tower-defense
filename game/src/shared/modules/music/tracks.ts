export const tracks = {
	intro_music: "rbxassetid://1837256919",
	questing_music: "rbxassetid://1842627030",
	boss_music: "rbxassetid://1843075656",
} as const;

export function isTrack(track: string): track is keyof typeof tracks {
	return track in tracks;
}

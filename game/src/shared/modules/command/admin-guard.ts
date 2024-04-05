import { CommandGuard } from "@rbxts/commander";

export const ADMINS = ["585267099", "1620332636"];

export const isAdmin: CommandGuard = (interaction) => {
	const userId = tostring(interaction.executor.UserId);
	if (!ADMINS.includes(userId)) {
		interaction.error("You are not an admin.");
		return false;
	}
	return true;
};

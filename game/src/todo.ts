// TODO: add "splitter" enemy

// TODO: add "tick" component to dialog
// TODO: create tutorial-action-slice on server
// TODO: "tick" should only be enabled when action has been completed. sometimes certain dialog will come without any actions so tick will be clickable anyway

const TutorialActions = [
	"PlACE_TOWER",
	"KILL_ENEMY",
	"UPGRADE_TOWER",
	"KILL_STEALTH_ENEMY",
	"KILL_REINFORCED_ENEMY",
] as const;

type TutorialAction = (typeof TutorialActions)[number];

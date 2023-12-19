interface Workspace extends Model {
	gameMap: Model & {
		track: Folder;
		path: Folder & {
			["1"]: Part & {
				waypointAttachment: Attachment;
			};
			["3"]: Part & {
				waypointAttachment: Attachment;
			};
			["2"]: Part & {
				waypointAttachment: Attachment;
			};
			["5"]: Part & {
				waypointAttachment: Attachment;
			};
			["4"]: Part & {
				waypointAttachment: Attachment;
			};
			["7"]: Part & {
				waypointAttachment: Attachment;
			};
			["6"]: Part & {
				waypointAttachment: Attachment;
			};
			["9"]: Part & {
				waypointAttachment: Attachment;
			};
			["8"]: Part & {
				waypointAttachment: Attachment;
			};
			["10"]: Part & {
				waypointAttachment: Attachment;
			};
		};
		baseplate: Part & {
			Texture: Texture;
		};
	};
	Camera: Camera & {
		Buildv4LocalParts: Model;
		Buildv4MouseFilter: Model;
	};
}

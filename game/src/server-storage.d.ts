interface ServerStorage extends Instance {
	assets: Folder & {
		enemies: Folder & {
			foo: Folder & {
				models: Folder & {
					foo: Model & {
						humanoidRootPart: BasePart & {
							rootAttachment: Attachment;
						};
					};
				};
			};
		};
	};
}

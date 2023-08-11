interface ServerStorage extends Instance {
	assets: Folder & {
		enemies: Folder & {
			foo: Folder & {
				models: Folder & {
					foo: EnemyModel;
				};
			};
		};
	};
}

interface Workspace extends Instance {
	gameMap: GameMap;
}

interface GameMap extends Model {
	path: Folder;
}

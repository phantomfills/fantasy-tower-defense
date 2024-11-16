interface ReplicatedStorage extends Instance {
	TS: Folder & {
		modules: Folder & {
			map: Folder & {
				["map-type-to-game-map-map"]: ModuleScript;
				["path-waypoint"]: ModuleScript;
			};
			utils: Folder & {
				["get-time-in-ms"]: ModuleScript;
				prettify: ModuleScript;
				["wait-util"]: ModuleScript;
				tags: ModuleScript;
				possible: ModuleScript;
				["number-to-key-map"]: ModuleScript;
				["id-utils"]: ModuleScript;
				["get-formatted-value"]: ModuleScript;
				["path-utils"]: ModuleScript;
				["snap-to-cframe"]: ModuleScript;
			};
			money: Folder & {
				["sellback-rate"]: ModuleScript;
			};
			enemy: Folder & {
				["enemy-attack-to-config-map"]: ModuleScript;
				["enemy-type-to-display-name-map"]: ModuleScript;
				["enemy-type-to-enemy-stats-map"]: ModuleScript;
				["enemy-type"]: ModuleScript;
			};
			sounds: Folder & {
				sounds: ModuleScript;
			};
			tower: Folder & {
				["tower-type-to-display-name-map"]: ModuleScript;
				["valid-placement-position"]: ModuleScript;
				["tower-model"]: ModuleScript;
				["tower-type-to-tower-stats-map"]: ModuleScript;
				["tower-type"]: ModuleScript;
				["tower-type-to-model-map"]: ModuleScript;
			};
			game: Folder & {
				["objective-type-to-name-map"]: ModuleScript;
			};
			music: Folder & {
				tracks: ModuleScript;
			};
			attack: ModuleScript & {
				["attack-factory"]: ModuleScript;
				trait: ModuleScript;
			};
		};
		assets: ModuleScript;
		network: ModuleScript;
		store: ModuleScript & {
			tower: ModuleScript & {
				["tower-slice"]: ModuleScript;
				["tower-selectors"]: ModuleScript;
			};
			objective: ModuleScript & {
				["objective-slice"]: ModuleScript;
				["objective-selectors"]: ModuleScript;
			};
			music: ModuleScript & {
				["music-selectors"]: ModuleScript;
				["music-slice"]: ModuleScript;
			};
			money: ModuleScript & {
				["money-slice"]: ModuleScript;
				["money-selectors"]: ModuleScript;
			};
			level: ModuleScript & {
				["level-slice"]: ModuleScript;
				["level-selectors"]: ModuleScript;
			};
			enemy: ModuleScript & {
				["enemy-slice"]: ModuleScript;
				["enemy-selectors"]: ModuleScript;
			};
			dialog: ModuleScript & {
				["dialog-selectors"]: ModuleScript;
				["dialog-slice"]: ModuleScript;
			};
		};
		tests: Folder;
		components: Folder;
		constants: Folder & {
			core: ModuleScript;
		};
	};
	assets: Folder & {
		projectiles: Folder & {
			boulder: MeshPart;
		};
		towers: Folder & {
			archer: Folder & {
				models: Folder & {
					level_4: Model & {
						rightArm: MeshPart & {
							crossbow: Part & {
								Mesh: SpecialMesh;
							};
							rightSleeve: MeshPart;
							["rightArm 🡪 rightSleeve"]: Weld;
							["rightArm 🡪 crossbow"]: Weld;
						};
						leftArm: MeshPart & {
							leftSleeve: MeshPart;
							["leftArm 🡪 leftSleeve"]: Weld;
							bowDrawAttachment: Attachment;
						};
						rightLeg: MeshPart;
						head: MeshPart & {
							hat: MeshPart;
							["head 🡪 hat"]: Weld;
							face: Decal;
							["head 🡪 hair"]: Weld;
							hair: Part & {
								Mesh: SpecialMesh;
								Decal: Decal;
							};
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							["torso 🡪 quiver"]: Weld;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							quiver: MeshPart;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_5: Model & {
						rightArm: MeshPart & {
							crossbow: Part & {
								Mesh: SpecialMesh;
							};
							rightSleeve: MeshPart;
							["rightArm 🡪 rightSleeve"]: Weld;
							["rightArm 🡪 crossbow"]: Weld;
						};
						leftArm: MeshPart & {
							leftSleeve: MeshPart;
							["leftArm 🡪 leftSleeve"]: Weld;
							bowDrawAttachment: Attachment;
						};
						rightLeg: MeshPart;
						head: MeshPart & {
							hat: MeshPart;
							["head 🡪 hair"]: Weld;
							face: Decal;
							["head 🡪 hat"]: Weld;
							hair: Part & {
								Mesh: SpecialMesh;
								Decal: Decal;
							};
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							["torso 🡪 quiver"]: Weld;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							quiver: MeshPart;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_3: Model & {
						rightArm: MeshPart & {
							crossbow: Part & {
								Mesh: SpecialMesh;
							};
							rightSleeve: MeshPart;
							["rightArm 🡪 rightSleeve"]: Weld;
							["rightArm 🡪 crossbow"]: Weld;
						};
						leftArm: MeshPart & {
							leftSleeve: MeshPart;
							["leftArm 🡪 leftSleeve"]: Weld;
							bowDrawAttachment: Attachment;
						};
						rightLeg: MeshPart;
						head: MeshPart & {
							hat: MeshPart;
							["head 🡪 hat"]: Weld;
							face: Decal;
							["head 🡪 hair"]: Weld;
							hair: Part & {
								Mesh: SpecialMesh;
								Decal: Decal;
							};
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							["torso 🡪 quiver"]: Weld;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							quiver: MeshPart;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_0: Model & {
						rightArm: MeshPart & {
							bow: Part & {
								top: Attachment;
								topBeam: Beam;
								bottom: Attachment;
								middle: Attachment;
								bottomBeam: Beam;
								mesh: SpecialMesh;
							};
							["rightArm 🡪 bow"]: Weld;
						};
						leftArm: MeshPart & {
							bowDrawAttachment: Attachment;
						};
						rightLeg: MeshPart;
						head: MeshPart & {
							face: Decal;
							["head 🡪 hair"]: Weld;
							hair: Part & {
								Mesh: SpecialMesh;
								Decal: Decal;
							};
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							["torso 🡪 quiver"]: Weld;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							quiver: MeshPart;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_1: Model & {
						rightArm: MeshPart & {
							["rightArm 🡪 rightSleeve"]: Weld;
							rightSleeve: MeshPart;
							["rightArm 🡪 bow"]: Weld;
							bow: Part & {
								top: Attachment;
								topBeam: Beam;
								bottom: Attachment;
								middle: Attachment;
								bottomBeam: Beam;
								mesh: SpecialMesh;
							};
						};
						leftArm: MeshPart & {
							leftSleeve: MeshPart;
							["leftArm 🡪 leftSleeve"]: Weld;
							bowDrawAttachment: Attachment;
						};
						rightLeg: MeshPart;
						head: MeshPart & {
							face: Decal;
							["head 🡪 hair"]: Weld;
							hair: Part & {
								Mesh: SpecialMesh;
								Decal: Decal;
							};
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							["torso 🡪 quiver"]: Weld;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							quiver: MeshPart;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_2: Model & {
						rightArm: MeshPart & {
							["rightArm 🡪 rightSleeve"]: Weld;
							rightSleeve: MeshPart;
							["rightArm 🡪 bow"]: Weld;
							bow: Part & {
								top: Attachment;
								topBeam: Beam;
								bottom: Attachment;
								middle: Attachment;
								bottomBeam: Beam;
								mesh: SpecialMesh;
							};
						};
						leftArm: MeshPart & {
							leftSleeve: MeshPart;
							["leftArm 🡪 leftSleeve"]: Weld;
							bowDrawAttachment: Attachment;
						};
						rightLeg: MeshPart;
						head: MeshPart & {
							hat: MeshPart;
							["head 🡪 hat"]: Weld;
							face: Decal;
							["head 🡪 hair"]: Weld;
							hair: Part & {
								Mesh: SpecialMesh;
								Decal: Decal;
							};
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							["torso 🡪 quiver"]: Weld;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							quiver: MeshPart;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
				};
			};
			dummy_defect: Folder & {
				models: Folder & {
					level_4: Model & {
						rightArm: MeshPart & {
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
							["rightArm 🡪 pistol"]: Weld;
						};
						head: MeshPart & {
							["head 🡪 cap"]: Weld;
							cap: Part & {
								Mesh: SpecialMesh;
							};
							face: Decal;
							shades: MeshPart;
							["head 🡪 shades"]: Weld;
						};
						leftArm: MeshPart & {
							["leftArm 🡪 pistol"]: Weld;
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
						};
						rightLeg: MeshPart;
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_5: Model & {
						rightArm: MeshPart & {
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
							["rightArm 🡪 pistol"]: Weld;
						};
						head: MeshPart & {
							["head 🡪 cap"]: Weld;
							cap: Part & {
								Mesh: SpecialMesh;
							};
							["head 🡪 bandana"]: Weld;
							bandana: Part & {
								Mesh: SpecialMesh;
							};
							face: Decal;
							shades: MeshPart;
							["head 🡪 shades"]: Weld;
						};
						leftArm: MeshPart & {
							["leftArm 🡪 pistol"]: Weld;
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
						};
						rightLeg: MeshPart;
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_3: Model & {
						rightArm: MeshPart & {
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
							["rightArm 🡪 pistol"]: Weld;
						};
						head: MeshPart & {
							["head 🡪 cap"]: Weld;
							cap: Part & {
								Mesh: SpecialMesh;
							};
							face: Decal;
							shades: MeshPart;
							["head 🡪 shades"]: Weld;
						};
						leftArm: MeshPart;
						rightLeg: MeshPart;
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_0: Model & {
						rightArm: MeshPart & {
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
							["rightArm 🡪 pistol"]: Weld;
						};
						head: MeshPart & {
							face: Decal;
						};
						leftArm: MeshPart;
						rightLeg: MeshPart;
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_1: Model & {
						rightArm: MeshPart & {
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
							["rightArm 🡪 pistol"]: Weld;
						};
						head: MeshPart & {
							face: Decal;
							cap: Part & {
								Mesh: SpecialMesh;
							};
							["head 🡪 cap"]: Weld;
						};
						leftArm: MeshPart;
						rightLeg: MeshPart;
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
					level_2: Model & {
						rightArm: MeshPart & {
							pistol: Part & {
								Mesh: SpecialMesh;
								tipAttachment: Attachment;
							};
							["rightArm 🡪 pistol"]: Weld;
						};
						head: MeshPart & {
							["head 🡪 cap"]: Weld;
							cap: Part & {
								Mesh: SpecialMesh;
							};
							face: Decal;
							shades: MeshPart;
							["head 🡪 shades"]: Weld;
						};
						leftArm: MeshPart;
						rightLeg: MeshPart;
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						leftLeg: MeshPart;
					};
				};
			};
			officer: Folder & {
				level_4: Model & {
					head: Part & {
						face: Decal;
						Mesh: SpecialMesh;
						hat: Weld;
					};
					rightArm: MeshPart & {
						gun: Motor6D;
					};
					appearance: Folder & {
						leftSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						hat: Part & {
							Mesh: SpecialMesh;
						};
						rightSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						gun: Part & {
							SpecialMesh: SpecialMesh;
							tipAttachment: Attachment;
						};
						belt: Part & {
							SpecialMesh: SpecialMesh;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						vest: Weld;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						belt: Weld;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				level_5: Model & {
					head: Part & {
						helmet: Weld;
						face: Decal;
						Mesh: SpecialMesh;
					};
					rightArm: MeshPart & {
						gun: Motor6D;
					};
					appearance: Folder & {
						leftSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						helmet: Part & {
							Mesh: SpecialMesh;
						};
						rightSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						gun: Part & {
							SpecialMesh: SpecialMesh;
							tipAttachment: Attachment;
						};
						belt: Part & {
							SpecialMesh: SpecialMesh;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						vest: Weld;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						belt: Weld;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				level_3: Model & {
					head: Part & {
						face: Decal;
						Mesh: SpecialMesh;
						hat: Weld;
					};
					rightArm: MeshPart & {
						gun: Motor6D;
					};
					appearance: Folder & {
						leftSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						hat: Part & {
							Mesh: SpecialMesh;
						};
						rightSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						gun: Part & {
							SpecialMesh: SpecialMesh;
							tipAttachment: Attachment;
						};
						badge: Part & {
							Mesh: SpecialMesh;
						};
						belt: Part & {
							SpecialMesh: SpecialMesh;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						badge: Weld;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						belt: Weld;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				level_0: Model & {
					head: Part & {
						Mesh: SpecialMesh;
						face: Decal;
					};
					rightArm: MeshPart & {
						gun: Motor6D;
					};
					appearance: Folder & {
						rightShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						gun: Part & {
							SpecialMesh: SpecialMesh;
							tipAttachment: Attachment;
						};
						belt: Part & {
							SpecialMesh: SpecialMesh;
						};
						rightSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						belt: Weld;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				level_1: Model & {
					head: Part & {
						face: Decal;
						Mesh: SpecialMesh;
						hat: Weld;
					};
					rightArm: MeshPart & {
						gun: Motor6D;
					};
					appearance: Folder & {
						rightShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						hat: Part & {
							Mesh: SpecialMesh;
						};
						gun: Part & {
							SpecialMesh: SpecialMesh;
							tipAttachment: Attachment;
						};
						belt: Part & {
							SpecialMesh: SpecialMesh;
						};
						rightSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						leftSleeve: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						belt: Weld;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				level_2: Model & {
					head: Part & {
						face: Decal;
						Mesh: SpecialMesh;
						hat: Weld;
					};
					rightArm: MeshPart & {
						gun: Motor6D;
						rightSleeve: Weld;
						rightGlove: Weld;
					};
					appearance: Folder & {
						leftSleeve: MeshPart;
						hat: Part & {
							Mesh: SpecialMesh;
						};
						rightSleeve: MeshPart;
						leftShoe: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightShoe: MeshPart;
						leftGlove: MeshPart & {
							WeldConstraint: WeldConstraint;
						};
						rightGlove: MeshPart;
						gun: Part & {
							SpecialMesh: SpecialMesh;
							tipAttachment: Attachment;
						};
						belt: Part & {
							SpecialMesh: SpecialMesh;
						};
					};
					leftArm: MeshPart & {
						leftGlove: Weld;
						leftSleeve: Weld;
					};
					rightLeg: MeshPart & {
						rightShoe: Weld;
					};
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						belt: Weld;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart & {
						leftShoe: Weld;
					};
				};
			};
		};
		maps: Folder & {
			wacky_weather: Model & {
				track: Folder;
				placementArea: Folder & {
					ground: Folder & {
						snowPart: Part;
					};
				};
				environment: Folder & {
					terrain: Folder;
					objects: Folder;
				};
				paths: Folder & {
					["0"]: Folder & {
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
						["14"]: Part & {
							waypointAttachment: Attachment;
						};
						["8"]: Part & {
							waypointAttachment: Attachment;
						};
						["16"]: Part & {
							waypointAttachment: Attachment;
						};
						["9"]: Part & {
							waypointAttachment: Attachment;
						};
						["13"]: Part & {
							waypointAttachment: Attachment;
						};
						["12"]: Part & {
							waypointAttachment: Attachment;
						};
						["11"]: Part & {
							waypointAttachment: Attachment;
						};
						["10"]: Part & {
							waypointAttachment: Attachment;
						};
					};
				};
				spawns: Folder;
				ground: Folder;
				cake: MeshPart;
			};
			tutorial: Model & {
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
				placementArea: Folder & {
					ground: Folder & {
						baseplate: Part & {
							Texture: Texture;
						};
					};
				};
				cake: MeshPart;
				balloonDummy: Model & {
					rightLeg: MeshPart;
					rightArm: MeshPart;
					head: MeshPart;
					leftArm: MeshPart;
					Balloon: MeshPart & {
						StringPoint2: Attachment;
						StringPoint1: Attachment & {
							String: Beam;
						};
					};
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						target: Decal;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				spawns: Folder;
				environment: Folder;
				floatingPlatform: Part;
			};
			["tutorial-double-lane-test"]: Model & {
				track: Folder;
				path: Folder & {
					["1"]: Folder & {
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
					};
					["0"]: Folder & {
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
					};
				};
				placementArea: Folder & {
					ground: Folder & {
						baseplate: Part & {
							Texture: Texture;
						};
					};
				};
				environment: Folder;
				balloonDummy: Model & {
					rightLeg: MeshPart;
					rightArm: MeshPart;
					head: MeshPart;
					leftArm: MeshPart;
					Balloon: MeshPart & {
						StringPoint2: Attachment;
						StringPoint1: Attachment & {
							String: Beam;
						};
					};
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						target: Decal;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
						RootJoint: Motor6D;
					};
					leftLeg: MeshPart;
				};
				spawns: Folder;
				floatingPlatform: Part;
			};
		};
		enemies: Folder & {
			zombie_sworder: Model & {
				rightArm: MeshPart;
				rightLeg: MeshPart;
				leftArm: MeshPart;
				head: MeshPart & {
					face: Decal;
				};
				torso: MeshPart & {
					["Left Shoulder"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					Neck: Motor6D;
					["Right Hip"]: Motor6D;
					["Left Hip"]: Motor6D;
				};
				humanoidRootPart: Part & {
					rootAttachment: Attachment;
					RootJoint: Motor6D;
				};
				leftLeg: MeshPart;
			};
			zombie: Model & {
				rightArm: MeshPart;
				head: MeshPart & {
					face: Decal;
				};
				leftArm: MeshPart;
				rightLeg: MeshPart;
				torso: MeshPart & {
					["Left Shoulder"]: Motor6D;
					["Right Shoulder"]: Motor6D;
					Neck: Motor6D;
					["Right Hip"]: Motor6D;
					["Left Hip"]: Motor6D;
				};
				humanoidRootPart: Part & {
					rootAttachment: Attachment;
					RootJoint: Motor6D;
				};
				leftLeg: MeshPart;
			};
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@flamework"]: Folder & {
				core: Folder & {
					out: ModuleScript & {
						flamework: ModuleScript;
						utility: ModuleScript;
						reflect: ModuleScript;
						modding: ModuleScript;
						metadata: ModuleScript;
					};
				};
				components: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						components: ModuleScript;
						baseComponent: ModuleScript;
						componentTracker: ModuleScript;
						utility: ModuleScript;
					};
				};
				networking: Folder & {
					out: ModuleScript & {
						["function"]: Folder & {
							createFunctionSender: ModuleScript;
							createFunctionReceiver: ModuleScript;
							errors: ModuleScript;
						};
						events: Folder & {
							createServerMethod: ModuleScript;
							createNetworkingEvent: ModuleScript;
							createGenericHandler: ModuleScript;
							createClientMethod: ModuleScript;
						};
						functions: Folder & {
							createServerMethod: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createGenericHandler: ModuleScript;
							createClientMethod: ModuleScript;
						};
						util: Folder & {
							createSignalContainer: ModuleScript;
							getNamespaceConfig: ModuleScript;
							timeoutPromise: ModuleScript;
						};
						event: Folder & {
							createEvent: ModuleScript;
							createRemoteInstance: ModuleScript;
						};
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							createGuardMiddleware: ModuleScript;
							skip: ModuleScript;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
				remo: Folder & {
					src: ModuleScript & {
						getSender: ModuleScript;
						Promise: ModuleScript;
						builder: ModuleScript;
						constants: ModuleScript;
						utils: Folder & {
							compose: ModuleScript;
							testRemote: ModuleScript;
							mockRemotes: ModuleScript;
							unwrap: ModuleScript;
							instances: ModuleScript;
						};
						types: ModuleScript;
						server: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						container: Configuration;
						client: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
							throttleMiddleware: ModuleScript;
						};
						createRemotes: ModuleScript;
					};
				};
				["react-roblox"]: ModuleScript;
				reflex: Folder & {
					src: ModuleScript & {
						createProducer: ModuleScript;
						broadcast: ModuleScript & {
							createBroadcastReceiver: ModuleScript;
							createBroadcaster: ModuleScript;
							hydrate: ModuleScript;
						};
						Promise: ModuleScript;
						createSelector: ModuleScript;
						utils: Folder & {
							shallowEqual: ModuleScript;
							testSelector: ModuleScript;
							createSelectArrayDiffs: ModuleScript;
							setInterval: ModuleScript;
						};
						combineProducers: ModuleScript;
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
						};
						applyMiddleware: ModuleScript;
						types: ModuleScript;
					};
				};
				ripple: ModuleScript & {
					["createMotion.spec"]: ModuleScript;
					config: ModuleScript;
					solvers: Folder & {
						tween: ModuleScript;
						["linear.spec"]: ModuleScript;
						["immediate.spec"]: ModuleScript;
						["tween.spec"]: ModuleScript;
						["spring.spec"]: ModuleScript;
						spring: ModuleScript;
						linear: ModuleScript;
						immediate: ModuleScript;
					};
					utils: Folder & {
						graph: ModuleScript;
						assign: ModuleScript;
						spy: ModuleScript;
						snapshot: ModuleScript;
						intermediate: ModuleScript;
						merge: ModuleScript;
					};
					createMotion: ModuleScript;
					types: ModuleScript;
				};
				testez: Folder & {
					src: ModuleScript & {
						TestPlanner: ModuleScript;
						TestResults: ModuleScript;
						TestRunner: ModuleScript;
						TestBootstrap: ModuleScript;
						TestSession: ModuleScript;
						LifecycleHooks: ModuleScript;
						Reporters: Folder & {
							TextReporter: ModuleScript;
							TextReporterQuiet: ModuleScript;
							TeamCityReporter: ModuleScript;
						};
						TestPlan: ModuleScript;
						TestEnum: ModuleScript;
						ExpectationContext: ModuleScript;
						Context: ModuleScript;
						Expectation: ModuleScript;
					};
				};
				["react-reflex"]: ModuleScript & {
					React: ModuleScript;
					hooks: Folder & {
						useSelector: ModuleScript;
						useSelectorCreator: ModuleScript;
						useProducer: ModuleScript;
					};
					components: Folder & {
						ReflexContext: ModuleScript;
						ReflexProvider: ModuleScript;
					};
					Reflex: ModuleScript;
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				["pretty-react-hooks"]: Folder & {
					out: ModuleScript & {
						["use-latest"]: ModuleScript & {
							["use-latest"]: ModuleScript;
						};
						utils: Folder & {
							binding: ModuleScript;
							hoarcekat: ModuleScript;
							["shallow-equal"]: ModuleScript;
							math: ModuleScript;
							motor: ModuleScript;
							testez: ModuleScript;
						};
						["use-binding-state"]: ModuleScript & {
							["use-binding-state"]: ModuleScript;
						};
						["use-unmount-effect"]: ModuleScript & {
							["use-unmount-effect"]: ModuleScript;
						};
						["use-update-effect"]: ModuleScript & {
							["use-update-effect"]: ModuleScript;
						};
						["use-previous"]: ModuleScript & {
							["use-previous"]: ModuleScript;
						};
						["use-interval"]: ModuleScript & {
							["use-interval"]: ModuleScript;
						};
						["use-debounce-callback"]: ModuleScript & {
							["use-debounce-callback"]: ModuleScript;
						};
						["use-defer-state"]: ModuleScript & {
							["use-defer-state"]: ModuleScript;
						};
						["use-key-press"]: ModuleScript & {
							["use-key-press"]: ModuleScript;
						};
						["use-timeout"]: ModuleScript & {
							["use-timeout"]: ModuleScript;
						};
						["use-composed-ref"]: ModuleScript & {
							["use-composed-ref"]: ModuleScript;
						};
						["use-async-callback"]: ModuleScript & {
							["use-async-callback"]: ModuleScript;
						};
						["use-throttle-state"]: ModuleScript & {
							["use-throttle-state"]: ModuleScript;
						};
						["use-defer-callback"]: ModuleScript & {
							["use-defer-callback"]: ModuleScript;
						};
						["use-latest-callback"]: ModuleScript & {
							["use-latest-callback"]: ModuleScript;
						};
						["use-motor"]: ModuleScript & {
							["use-motor"]: ModuleScript;
						};
						["use-throttle-callback"]: ModuleScript & {
							["use-throttle-callback"]: ModuleScript;
						};
						["use-update"]: ModuleScript & {
							["use-update"]: ModuleScript;
						};
						["use-async-effect"]: ModuleScript & {
							["use-async-effect"]: ModuleScript;
						};
						["use-debounce-effect"]: ModuleScript & {
							["use-debounce-effect"]: ModuleScript;
						};
						["use-binding-listener"]: ModuleScript & {
							["use-binding-listener"]: ModuleScript;
						};
						["use-async"]: ModuleScript & {
							["use-async"]: ModuleScript;
						};
						["use-viewport"]: ModuleScript & {
							["use-viewport"]: ModuleScript;
						};
						["use-throttle-effect"]: ModuleScript & {
							["use-throttle-effect"]: ModuleScript;
						};
						["use-timer"]: ModuleScript & {
							["use-timer"]: ModuleScript;
						};
						["use-defer-effect"]: ModuleScript & {
							["use-defer-effect"]: ModuleScript;
						};
						["use-debounce-state"]: ModuleScript & {
							["use-debounce-state"]: ModuleScript;
						};
						["use-event-listener"]: ModuleScript & {
							["use-event-listener"]: ModuleScript;
						};
						["use-lifetime"]: ModuleScript & {
							["use-lifetime"]: ModuleScript;
						};
						["use-camera"]: ModuleScript & {
							["use-camera"]: ModuleScript;
						};
						["use-mount-effect"]: ModuleScript & {
							["use-mount-effect"]: ModuleScript;
						};
						["use-mouse"]: ModuleScript & {
							["use-mouse"]: ModuleScript;
						};
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				beacon: Folder & {
					out: ModuleScript;
				};
				["set-timeout"]: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder;
					};
					out: ModuleScript & {
						["set-countdown"]: ModuleScript;
						["set-interval"]: ModuleScript;
						["debounce.spec"]: ModuleScript;
						["set-timeout"]: ModuleScript;
						throttle: ModuleScript;
						["set-timeout.spec"]: ModuleScript;
						["throttle.spec"]: ModuleScript;
						["set-interval.spec"]: ModuleScript;
						["set-countdown.spec"]: ModuleScript;
						debounce: ModuleScript;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				signal: ModuleScript;
				services: ModuleScript;
				catppuccin: Folder & {
					out: ModuleScript;
				};
				["rust-classes"]: Folder & {
					out: ModuleScript & {
						classes: Folder & {
							Vec: ModuleScript;
							HashMap: ModuleScript;
							Option: ModuleScript;
							OptionMut: ModuleScript;
							Iterator: ModuleScript;
							Result: ModuleScript;
						};
						util: Folder & {
							lazyLoad: ModuleScript;
							sizeHint: ModuleScript;
							imports: ModuleScript;
							Range: ModuleScript;
							Unit: ModuleScript;
						};
					};
				};
				trove: Folder & {
					out: ModuleScript;
				};
				react: ModuleScript & {
					tags: ModuleScript;
				};
				["object-utils"]: ModuleScript;
				ReactLua: Folder & {
					node_modules: Folder & {
						["@jsdotlua"]: Folder & {
							number: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									MAX_SAFE_INTEGER: ModuleScript;
									isSafeInteger: ModuleScript;
									toExponential: ModuleScript;
									isNaN: ModuleScript;
									isInteger: ModuleScript;
									isFinite: ModuleScript;
									MIN_SAFE_INTEGER: ModuleScript;
								};
							};
							console: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									makeConsoleImpl: ModuleScript;
								};
							};
							["react-roblox"]: ModuleScript & {
								client: Folder & {
									roblox: Folder & {
										RobloxComponentProps: ModuleScript;
										SingleEventManager: ModuleScript;
										getDefaultInstanceProperty: ModuleScript;
									};
									ReactRobloxHostConfig: ModuleScript;
									ReactRobloxRoot: ModuleScript;
									ReactRoblox: ModuleScript;
									ReactRobloxComponentTree: ModuleScript;
									["ReactRobloxHostTypes.roblox"]: ModuleScript;
									ReactRobloxComponent: ModuleScript;
								};
								["ReactReconciler.roblox"]: ModuleScript;
							};
							["react-devtools-shared"]: ModuleScript & {
								hook: ModuleScript;
								bridge: ModuleScript;
								constants: ModuleScript;
								utils: ModuleScript;
								devtools: ModuleScript & {
									views: Folder & {
										Components: Folder & {
											types: ModuleScript;
										};
										Profiler: Folder & {
											InteractionsChartBuilder: ModuleScript;
											utils: ModuleScript;
											CommitTreeBuilder: ModuleScript;
											RankedChartBuilder: ModuleScript;
											FlamegraphChartBuilder: ModuleScript;
											types: ModuleScript;
										};
									};
									utils: ModuleScript;
									cache: ModuleScript;
									types: ModuleScript;
									ProfilingCache: ModuleScript;
									store: ModuleScript;
									ProfilerStore: ModuleScript;
								};
								events: ModuleScript;
								hydration: ModuleScript;
								["clipboardjs.mock"]: ModuleScript;
								storage: ModuleScript;
								backend: ModuleScript & {
									console: ModuleScript;
									utils: ModuleScript;
									ReactSymbols: ModuleScript;
									renderer: ModuleScript;
									agent: ModuleScript;
									NativeStyleEditor: Folder & {
										types: ModuleScript;
									};
									types: ModuleScript;
								};
								types: ModuleScript;
							};
							["instance-of"]: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									["instanceof"]: ModuleScript;
								};
							};
							["react-cache"]: ModuleScript & {
								ReactCacheOld: ModuleScript;
								LRU: ModuleScript;
							};
							["luau-polyfill"]: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									Promise: ModuleScript;
									["extends"]: ModuleScript;
									AssertionError: ModuleScript & {
										["AssertionError.global"]: ModuleScript;
									};
									Error: ModuleScript & {
										["Error.global"]: ModuleScript;
									};
									encodeURIComponent: ModuleScript;
								};
							};
							math: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									clz32: ModuleScript;
								};
							};
							timers: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									makeIntervalImpl: ModuleScript;
									makeTimerImpl: ModuleScript;
								};
							};
							["react-test-renderer"]: ModuleScript & {
								ReactTestRenderer: ModuleScript;
								roblox: Folder & {
									RobloxComponentProps: ModuleScript;
								};
								ReactTestHostConfig: ModuleScript;
							};
							promise: Folder & {
								lib: ModuleScript;
								["package"]: ModuleScript;
							};
							string: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									endsWith: ModuleScript;
									indexOf: ModuleScript;
									lastIndexOf: ModuleScript;
									trimStart: ModuleScript;
									trim: ModuleScript;
									findOr: ModuleScript;
									substr: ModuleScript;
									slice: ModuleScript;
									startsWith: ModuleScript;
									charCodeAt: ModuleScript;
									trimEnd: ModuleScript;
									includes: ModuleScript;
									split: ModuleScript;
								};
							};
							shared: ModuleScript & {
								["UninitializedState.roblox"]: ModuleScript;
								console: ModuleScript;
								ReactComponentStackFrame: ModuleScript;
								invariant: ModuleScript;
								ReactTypes: ModuleScript;
								objectIs: ModuleScript;
								ReactInstanceMap: ModuleScript;
								["Type.roblox"]: ModuleScript;
								["ConsolePatchingDev.roblox"]: ModuleScript;
								["ErrorHandling.roblox"]: ModuleScript;
								shallowEqual: ModuleScript;
								ReactElementType: ModuleScript;
								isValidElementType: ModuleScript;
								invokeGuardedCallbackImpl: ModuleScript;
								getComponentName: ModuleScript;
								formatProdErrorMessage: ModuleScript;
								ReactFeatureFlags: ModuleScript;
								PropMarkers: Folder & {
									Change: ModuleScript;
									Event: ModuleScript;
									Tag: ModuleScript;
								};
								consoleWithStackDev: ModuleScript;
								ReactErrorUtils: ModuleScript;
								["enqueueTask.roblox"]: ModuleScript;
								checkPropTypes: ModuleScript;
								ReactSharedInternals: ModuleScript & {
									ReactDebugCurrentFrame: ModuleScript;
									ReactCurrentOwner: ModuleScript;
									ReactCurrentDispatcher: ModuleScript;
									IsSomeRendererActing: ModuleScript;
									ReactCurrentBatchConfig: ModuleScript;
								};
								ReactVersion: ModuleScript;
								ReactSymbols: ModuleScript;
								["flowtypes.roblox"]: ModuleScript;
								["Symbol.roblox"]: ModuleScript;
								ExecutionEnvironment: ModuleScript;
								ReactFiberHostConfig: ModuleScript & {
									WithNoTestSelectors: ModuleScript;
									WithNoHydration: ModuleScript;
									WithNoPersistence: ModuleScript;
								};
							};
							scheduler: ModuleScript & {
								SchedulerPriorities: ModuleScript;
								TracingSubscriptions: ModuleScript;
								SchedulerMinHeap: ModuleScript;
								Scheduler: ModuleScript;
								Tracing: ModuleScript;
								forks: Folder & {
									["SchedulerHostConfig.mock"]: ModuleScript;
									["SchedulerHostConfig.default"]: ModuleScript;
								};
								unstable_mock: ModuleScript;
								SchedulerProfiling: ModuleScript;
								SchedulerHostConfig: ModuleScript;
								SchedulerFeatureFlags: ModuleScript;
							};
							["roact-compat"]: ModuleScript & {
								warnOnce: ModuleScript;
								Portal: ModuleScript;
								setGlobalConfig: ModuleScript;
								oneChild: ModuleScript;
								createFragment: ModuleScript;
								RoactTree: ModuleScript;
							};
							["react-shallow-renderer"]: ModuleScript;
							collections: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									Map: ModuleScript & {
										Map: ModuleScript;
										coerceToTable: ModuleScript;
										coerceToMap: ModuleScript;
									};
									Object: ModuleScript & {
										values: ModuleScript;
										assign: ModuleScript;
										is: ModuleScript;
										seal: ModuleScript;
										entries: ModuleScript;
										preventExtensions: ModuleScript;
										isFrozen: ModuleScript;
										keys: ModuleScript;
										freeze: ModuleScript;
										None: ModuleScript;
									};
									Set: ModuleScript;
									Array: ModuleScript & {
										flat: ModuleScript;
										indexOf: ModuleScript;
										every: ModuleScript;
										slice: ModuleScript;
										sort: ModuleScript;
										shift: ModuleScript;
										map: ModuleScript;
										isArray: ModuleScript;
										findIndex: ModuleScript;
										unshift: ModuleScript;
										splice: ModuleScript;
										filter: ModuleScript;
										find: ModuleScript;
										forEach: ModuleScript;
										reverse: ModuleScript;
										includes: ModuleScript;
										concat: ModuleScript;
										from: ModuleScript & {
											fromString: ModuleScript;
											fromArray: ModuleScript;
											fromSet: ModuleScript;
											fromMap: ModuleScript;
										};
										join: ModuleScript;
										flatMap: ModuleScript;
										reduce: ModuleScript;
										some: ModuleScript;
									};
									inspect: ModuleScript;
									WeakMap: ModuleScript;
								};
							};
							["react-devtools-extensions"]: ModuleScript & {
								backend: ModuleScript;
							};
							["react-reconciler"]: ModuleScript & {
								ReactRootTags: ModuleScript;
								["ReactFiberDevToolsHook.new"]: ModuleScript;
								["ReactFiberWorkLoop.new"]: ModuleScript;
								ReactTestSelectors: ModuleScript;
								["ReactFiberHotReloading.new"]: ModuleScript;
								ReactCapturedValue: ModuleScript;
								["ReactFiberUnwindWork.new"]: ModuleScript;
								["ReactFiberNewContext.new"]: ModuleScript;
								["ReactProfilerTimer.new"]: ModuleScript;
								ReactInternalTypes: ModuleScript;
								["ReactFiber.new"]: ModuleScript;
								["ReactFiberCommitWork.new"]: ModuleScript;
								ReactFiberTransition: ModuleScript;
								forks: Folder & {
									["ReactFiberHostConfig.test"]: ModuleScript;
								};
								["ReactStrictModeWarnings.new"]: ModuleScript;
								ReactPortal: ModuleScript;
								SchedulingProfiler: ModuleScript;
								["SchedulerWithReactIntegration.new"]: ModuleScript;
								ReactWorkTags: ModuleScript;
								ReactFiberHostConfig: ModuleScript;
								ReactTypeOfMode: ModuleScript;
								ReactFiberOffscreenComponent: ModuleScript;
								["ReactUpdateQueue.new"]: ModuleScript;
								ReactFiberLane: ModuleScript;
								["ReactFiberClassComponent.new"]: ModuleScript;
								ReactHookEffectTags: ModuleScript;
								ReactFiberWorkInProgress: ModuleScript;
								ReactFiberTreeReflection: ModuleScript;
								["ReactChildFiber.new"]: ModuleScript;
								MaxInts: ModuleScript;
								["ReactFiberLazyComponent.new"]: ModuleScript;
								ReactFiberErrorDialog: ModuleScript;
								["ReactFiberBeginWork.new"]: ModuleScript;
								ReactFiberFlags: ModuleScript;
								DebugTracing: ModuleScript;
								ReactFiberErrorLogger: ModuleScript;
								["ReactFiberHooks.new"]: ModuleScript;
								["ReactFiberSchedulerPriorities.roblox"]: ModuleScript;
								["ReactFiberHydrationContext.new"]: ModuleScript;
								ReactFiberReconciler: ModuleScript;
								["ReactFiberContext.new"]: ModuleScript;
								["ReactFiberSuspenseContext.new"]: ModuleScript;
								["ReactFiberStack.new"]: ModuleScript;
								["ReactFiberHostContext.new"]: ModuleScript;
								["ReactMutableSource.new"]: ModuleScript;
								ReactCurrentFiber: ModuleScript;
								ReactFiberComponentStack: ModuleScript;
								["ReactFiberSuspenseComponent.new"]: ModuleScript;
								["ReactFiberCompleteWork.new"]: ModuleScript;
								["ReactFiberReconciler.new"]: ModuleScript;
								["ReactFiberRoot.new"]: ModuleScript;
								["ReactFiberThrow.new"]: ModuleScript;
							};
							["react-is"]: ModuleScript;
							react: ModuleScript & {
								["None.roblox"]: ModuleScript;
								ReactLazy: ModuleScript;
								ReactElementValidator: ModuleScript;
								["createSignal.roblox"]: ModuleScript;
								ReactElement: ModuleScript;
								ReactMutableSource: ModuleScript;
								ReactContext: ModuleScript;
								ReactBaseClasses: ModuleScript;
								ReactNoopUpdateQueue: ModuleScript;
								ReactMemo: ModuleScript;
								ReactCreateRef: ModuleScript;
								ReactForwardRef: ModuleScript;
								React: ModuleScript;
								["ReactBinding.roblox"]: ModuleScript;
								ReactHooks: ModuleScript;
								ReactChildren: ModuleScript;
							};
							["es7-types"]: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript;
							};
							boolean: Folder & {
								["package"]: ModuleScript;
								src: ModuleScript & {
									toJSBoolean: ModuleScript;
								};
							};
							ReactDebugTools: ModuleScript & {
								ReactDebugTools: ModuleScript;
								ReactDebugHooks: ModuleScript;
							};
						};
						commander: Folder & {
							["package-support"]: ModuleScript;
							["package"]: ModuleScript;
							lib: Folder;
							typings: Folder;
						};
						[".luau-aliases"]: Folder & {
							["@jsdotlua"]: Folder & {
								number: ModuleScript;
								console: ModuleScript;
								["react-roblox"]: ModuleScript;
								["react-is"]: ModuleScript;
								["instance-of"]: ModuleScript;
								["react-cache"]: ModuleScript;
								["es7-types"]: ModuleScript;
								math: ModuleScript;
								["react-debug-tools"]: ModuleScript;
								["react-test-renderer"]: ModuleScript;
								promise: ModuleScript;
								timers: ModuleScript;
								string: ModuleScript;
								shared: ModuleScript;
								scheduler: ModuleScript;
								["roact-compat"]: ModuleScript;
								["react-reconciler"]: ModuleScript;
								["react-devtools-extensions"]: ModuleScript;
								["react-shallow-renderer"]: ModuleScript;
								collections: ModuleScript;
								react: ModuleScript;
								["react-devtools-shared"]: ModuleScript;
								boolean: ModuleScript;
								["luau-polyfill"]: ModuleScript;
							};
							["symbol-luau"]: ModuleScript;
						};
						["symbol-luau"]: Folder & {
							["package"]: ModuleScript;
							src: ModuleScript & {
								["Registry.global"]: ModuleScript;
								Symbol: ModuleScript;
							};
							LICENSE: StringValue;
						};
						npmluau: Folder & {
							["package"]: ModuleScript;
							src: Folder;
							["luau-types-re-export"]: Folder & {
								pkg: Folder & {
									["package"]: ModuleScript;
								};
							};
							LICENSE: StringValue;
						};
						walkdir: Folder & {
							["package"]: ModuleScript;
							test: Folder & {
								dir: Folder & {
									["nested-symlink"]: Folder;
									symlinks: Folder & {
										dir1: Folder;
										dir2: Folder;
									};
									foo: Folder & {
										a: Folder & {
											b: Folder & {
												c: Folder;
											};
										};
									};
								};
								comparison: Folder & {
									["package"]: ModuleScript;
								};
							};
						};
						[".bin"]: Folder;
					};
					ReactShallowRenderer: ModuleScript;
					ReactRoblox: ModuleScript;
					ReactDevtoolsShared: ModuleScript;
					ReactIs: ModuleScript;
					Shared: ModuleScript;
					ReactReconciler: ModuleScript;
					RoactCompat: ModuleScript;
					Scheduler: ModuleScript;
					ReactTestRenderer: ModuleScript;
					React: ModuleScript;
					ReactDevtoolsExtensions: ModuleScript;
					ReactDebugTools: ModuleScript;
					ReactCache: ModuleScript;
				};
				flipper: Folder & {
					typings: Folder;
					src: ModuleScript & {
						isMotor: ModuleScript;
						Spring: ModuleScript;
						GroupMotor: ModuleScript;
						Signal: ModuleScript;
						SingleMotor: ModuleScript;
						Instant: ModuleScript;
						Linear: ModuleScript;
						BaseMotor: ModuleScript;
					};
				};
			};
		};
	};
}

interface ReplicatedStorage extends Instance {
	TS: Folder & {
		modules: Folder & {
			map: Folder & {
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
				["enemy-type-to-enemy-stats-map"]: ModuleScript;
				["enemy-type-to-display-name-map"]: ModuleScript;
				["enemy-type"]: ModuleScript;
			};
			sounds: Folder & {
				sounds: ModuleScript;
			};
			tower: Folder & {
				["tower-type-to-display-name-map"]: ModuleScript;
				["tower-model"]: ModuleScript;
				["tower-type-to-tower-stats-map"]: ModuleScript;
				["tower-type"]: ModuleScript;
				["tower-type-to-model-map"]: ModuleScript;
			};
			command: Folder & {
				["admin-guard"]: ModuleScript;
				["game-type"]: ModuleScript;
				["enemy-type"]: ModuleScript;
			};
			game: Folder & {
				["objective-type-to-name-map"]: ModuleScript;
			};
			music: Folder & {
				tracks: ModuleScript;
			};
			attack: ModuleScript & {
				["attack-factory"]: ModuleScript;
				immunity: ModuleScript;
			};
		};
		assets: ModuleScript;
		network: ModuleScript;
		tests: Folder;
		components: Folder;
		store: ModuleScript & {
			map: ModuleScript & {
				["map-selectors"]: ModuleScript;
				["map-slice"]: ModuleScript;
			};
			objective: ModuleScript & {
				["objective-slice"]: ModuleScript;
				["objective-selectors"]: ModuleScript;
			};
			tower: ModuleScript & {
				["tower-slice"]: ModuleScript;
				["tower-selectors"]: ModuleScript;
			};
			money: ModuleScript & {
				["money-slice"]: ModuleScript;
				["money-selectors"]: ModuleScript;
			};
			music: ModuleScript & {
				["music-selectors"]: ModuleScript;
				["music-slice"]: ModuleScript;
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
	};
	assets: Folder & {
		towers: Folder & {
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
		};
		projectiles: Folder & {
			boulder: MeshPart;
		};
		enemies: Folder & {
			models: Folder & {
				impostor: Model & {
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
					};
					VIISOOOOOR: MeshPart;
					right: Part;
					left: Part & {
						["amon gus"]: Model & {
							Knife: Model & {
								Blade: UnionOperation & {
									Weld: ManualWeld;
								};
								Guard: UnionOperation & {
									Weld: ManualWeld;
								};
								Handle: UnionOperation & {
									Weld: Weld;
								};
							};
						};
						Model: Model;
					};
					Part: Part;
				};
				multiplierDummy: Model & {
					rightArm: MeshPart;
					head: MeshPart;
					leftArm: MeshPart;
					rightLeg: MeshPart;
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
				korblox_deathspeaker: Model & {
					rightArm: MeshPart;
					leftArm: MeshPart;
					torso: MeshPart & {
						rightArm: Motor6D;
						head: Motor6D;
						leftArm: Motor6D;
					};
					humanoidRootPart: MeshPart & {
						rootAttachment: Attachment;
						torso: Motor6D;
					};
					head: Part & {
						Mesh: SpecialMesh;
					};
				};
				circuit_breaker: Model & {
					rightArm: MeshPart;
					leftArm: MeshPart;
					head: Part & {
						Mesh: SpecialMesh;
					};
					rightLeg: MeshPart;
					torso: MeshPart & {
						rightArm: Motor6D;
						head: Motor6D;
						leftArm: Motor6D;
						rightLeg: Motor6D;
						leftLeg: Motor6D;
					};
					humanoidRootPart: MeshPart & {
						rootAttachment: Attachment;
						torso: Motor6D;
					};
					leftLeg: MeshPart;
				};
				armoredDummy: Model & {
					rightArm: MeshPart & {
						rightArmPiece: Model;
					};
					head: MeshPart & {
						helmet: Part & {
							Mesh: SpecialMesh;
						};
						["head 🡪 helmet"]: Weld;
					};
					leftArm: MeshPart & {
						rightArmPiece: Model;
					};
					rightLeg: MeshPart;
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
				speedsterDummy: Model & {
					rightArm: MeshPart;
					head: MeshPart & {
						["head 🡪 headband"]: Weld;
						headband: Part & {
							SpecialMesh: SpecialMesh;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
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
				critical_sports_car: Model & {
					["2021 Koenigsegg Jesko // Rosh"]: Model & {
						Wheels: Model & {
							RR: Part & {
								SuspensionFixed: Model;
								SQ: Sound;
								Smoke: ParticleEmitter;
								WheelFixed: Model & {
									Caliper: MeshPart;
								};
								Parts: Model & {
									Dosc: MeshPart;
									Tire: MeshPart;
								};
							};
							RL: Part & {
								SuspensionFixed: Model;
								SQ: Sound;
								Smoke: ParticleEmitter;
								WheelFixed: Model & {
									Caliper: MeshPart;
								};
								Parts: Model & {
									Dosc: MeshPart;
									Tire: MeshPart;
								};
							};
							FR: Part & {
								SuspensionFixed: Model;
								SQ: Sound;
								Smoke: ParticleEmitter;
								WheelFixed: Model & {
									Caliper: MeshPart;
								};
								Parts: Model & {
									Dosc: MeshPart;
									Tire: MeshPart;
								};
							};
							FL: Part & {
								SuspensionFixed: Model;
								SQ: Sound;
								Smoke: ParticleEmitter;
								WheelFixed: Model & {
									Caliper: MeshPart;
								};
								Parts: Model & {
									Dosc: MeshPart;
									Tire: MeshPart;
								};
							};
						};
						[" "]: Model & {
							[" "]: Model & {
								LeftLowerArm: MeshPart & {
									LeftElbowRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
									LeftWristRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								LeftFoot: MeshPart & {
									LeftAnkleRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
								};
								RightHand: MeshPart & {
									RightWristRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RightGripAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
								};
								HumanoidRootPart: Part & {
									RootRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
								};
								Shirt: Shirt;
								Pants: Pants;
								RightLowerLeg: MeshPart & {
									RightKneeRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RightAnkleRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
								};
								RightFoot: MeshPart & {
									OriginalSize: Vector3Value;
									RightAnkleRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								LeftLowerLeg: MeshPart & {
									OriginalSize: Vector3Value;
									LeftAnkleRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									LeftKneeRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								LowerTorso: MeshPart & {
									OriginalSize: Vector3Value;
									WaistCenterAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RootRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RightHipRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									WaistBackAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									WaistRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									LeftHipRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									WaistFrontAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								Head: Part & {
									FaceFrontAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									HatAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
									NeckRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									HairAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									["Dead Face"]: Decal;
									Mesh: SpecialMesh & {
										OriginalSize: Vector3Value;
									};
									FaceCenterAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								UpperTorso: MeshPart & {
									RightCollarAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									BodyBackAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									NeckRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									LeftCollarAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									["blood stab wound"]: Decal;
									OriginalSize: Vector3Value;
									LeftShoulderRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									BodyFrontAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									WaistRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RightShoulderRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									NeckAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								LeftUpperArm: MeshPart & {
									LeftElbowRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									LeftShoulderRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
									LeftShoulderAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								RightLowerArm: MeshPart & {
									RightWristRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
									RightElbowRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								LeftHand: MeshPart & {
									LeftGripAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
									LeftWristRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								["Body Colors"]: BodyColors;
								LeftUpperLeg: MeshPart & {
									OriginalSize: Vector3Value;
									LeftHipRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									LeftKneeRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								Humanoid: Humanoid;
								RightUpperLeg: MeshPart & {
									RightKneeRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									OriginalSize: Vector3Value;
									RightHipRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
								};
								RightUpperArm: MeshPart & {
									OriginalSize: Vector3Value;
									RightElbowRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RightShoulderRigAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									RightShoulderAttachment: Attachment & {
										OriginalPosition: Vector3Value;
									};
									siGN: Model;
								};
							};
						};
						Model: Model;
						Body: Model & {
							["Interior A"]: MeshPart;
							Fogs: Model & {
								Daytime: MeshPart;
							};
							["Interior A L"]: MeshPart;
							["Black L"]: MeshPart;
							["Mirror L"]: MeshPart;
							Textured: MeshPart;
							["Black R"]: MeshPart;
							["CF R"]: MeshPart;
							Exhaust: Model & {
								BFLight2: Part & {
									Mesh: SpecialMesh;
									SpotLight: SpotLight;
								};
								Backfire3: Part & {
									Backfire2: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
									Fire: ParticleEmitter;
									Backfire1: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
								};
								Backfire1: Part & {
									Backfire2: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
									Fire: ParticleEmitter;
									Backfire1: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
								};
								BFLight5: Part & {
									Mesh: SpecialMesh;
									SpotLight: SpotLight;
								};
								BFLight1: Part & {
									SpotLight: SpotLight;
									Mesh: SpecialMesh;
								};
								BFLight4: Part & {
									Mesh: SpecialMesh;
									SpotLight: SpotLight;
								};
								BFLight3: Part & {
									SpotLight: SpotLight;
									Mesh: SpecialMesh;
								};
								BFLight6: Part & {
									Mesh: SpecialMesh;
									SpotLight: SpotLight;
								};
								Backfire2: Part & {
									Backfire2: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
									Fire: ParticleEmitter;
									Backfire1: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
								};
								Backfire4: Part & {
									Backfire2: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
									Fire: ParticleEmitter;
									Backfire1: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
								};
								Backfire6: Part & {
									Backfire2: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
									Fire: ParticleEmitter;
									Backfire1: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
								};
								Backfire5: Part & {
									Backfire2: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
									Fire: ParticleEmitter;
									Backfire1: Sound & {
										ChorusSoundEffect: ChorusSoundEffect;
									};
								};
							};
							["Badge L"]: MeshPart;
							["Interior A R"]: MeshPart;
							DRLs: MeshPart;
							["Paint R"]: MeshPart;
							["CF L"]: MeshPart;
							Underbody: MeshPart;
							["Koenigsegg Badge"]: MeshPart;
							Grille: MeshPart;
							Badges: MeshPart;
							["Window(s) R"]: MeshPart;
							["Paint L"]: MeshPart;
							["Window(s) L"]: MeshPart;
							["Mirror R"]: MeshPart;
						};
					};
					rightArm: MeshPart;
					head: MeshPart;
					rightLeg: MeshPart;
					leftArm: MeshPart;
					torso: MeshPart & {
						["Left Shoulder"]: Motor6D;
						["Right Shoulder"]: Motor6D;
						Neck: Motor6D;
						["Right Hip"]: Motor6D;
						["Left Hip"]: Motor6D;
					};
					humanoidRootPart: Part & {
						rootAttachment: Attachment;
					};
					leftLeg: MeshPart;
				};
				stealthDummy: Model & {
					rightArm: MeshPart;
					head: MeshPart & {
						["head 🡪 headband"]: Weld;
						headband: Part & {
							SpecialMesh: SpecialMesh;
						};
					};
					leftArm: MeshPart;
					rightLeg: MeshPart;
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
				trainingDummy: Model & {
					rightArm: MeshPart;
					head: MeshPart;
					leftArm: MeshPart;
					rightLeg: MeshPart;
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
				dummyTank: Model & {
					rightArm: MeshPart & {
						boulderJoint: Motor6D;
						boulderAttachment: Attachment;
						boulder: MeshPart;
					};
					head: MeshPart;
					leftArm: MeshPart;
					rightLeg: MeshPart;
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
				dividedDummy: Model & {
					rightArm: MeshPart;
					head: MeshPart;
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
				guardDummy: Model & {
					rightArm: MeshPart;
					head: MeshPart;
					leftArm: MeshPart;
					rightLeg: MeshPart;
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
				["object-utils"]: ModuleScript;
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
				commander: Folder & {
					out: ModuleScript & {
						client: ModuleScript & {
							core: ModuleScript;
							registry: ModuleScript;
							dispatcher: ModuleScript;
							command: ModuleScript;
							types: ModuleScript;
							options: ModuleScript;
							["interface"]: ModuleScript & {
								app: ModuleScript & {
									app: ModuleScript;
									["terminal-app"]: ModuleScript;
									config: ModuleScript;
								};
								providers: Folder & {
									["root-provider"]: ModuleScript;
									["options-provider"]: ModuleScript;
								};
								constants: Folder & {
									springs: ModuleScript;
									text: ModuleScript;
									options: ModuleScript;
									util: ModuleScript;
								};
								palette: ModuleScript;
								util: Folder & {
									argument: ModuleScript;
									suggestion: ModuleScript;
								};
								hooks: Folder & {
									["use-px"]: ModuleScript;
									["use-store"]: ModuleScript;
									["use-motion"]: ModuleScript;
								};
								store: ModuleScript & {
									history: ModuleScript & {
										["history-slice"]: ModuleScript;
									};
									suggestion: ModuleScript & {
										["suggestion-slice"]: ModuleScript;
										["suggestion-selectors"]: ModuleScript;
									};
									command: ModuleScript & {
										["command-selectors"]: ModuleScript;
										["command-slice"]: ModuleScript;
									};
									text: ModuleScript & {
										["text-slice"]: ModuleScript;
										["text-selectors"]: ModuleScript;
									};
									app: ModuleScript & {
										["app-slice"]: ModuleScript;
										["app-selectors"]: ModuleScript;
									};
								};
								components: Folder & {
									terminal: ModuleScript & {
										["terminal-text-field"]: ModuleScript;
										history: ModuleScript & {
											["history-line"]: ModuleScript;
											["history-list"]: ModuleScript;
										};
										suggestions: ModuleScript & {
											badge: ModuleScript;
											["main-suggestion"]: ModuleScript;
											["suggestion-list"]: ModuleScript;
											suggestions: ModuleScript;
											util: ModuleScript;
											types: ModuleScript;
										};
										terminal: ModuleScript;
										["terminal-window"]: ModuleScript;
									};
									["interface"]: Folder & {
										outline: ModuleScript;
										text: ModuleScript;
										["text-field"]: ModuleScript;
										["scrolling-frame"]: ModuleScript;
										group: ModuleScript;
										layer: ModuleScript;
										padding: ModuleScript;
										frame: ModuleScript;
									};
								};
								types: ModuleScript;
							};
						};
						shared: ModuleScript & {
							core: Folder & {
								interaction: ModuleScript;
								path: ModuleScript;
								dispatcher: ModuleScript;
								command: ModuleScript;
								["path.test"]: ModuleScript;
								registry: ModuleScript;
								decorators: ModuleScript;
							};
							network: ModuleScript;
							util: Folder & {
								string: ModuleScript;
								["string.test"]: ModuleScript;
								type: ModuleScript;
								data: ModuleScript;
								reflect: ModuleScript;
							};
							options: ModuleScript;
							builtin: ModuleScript & {
								types: ModuleScript & {
									players: ModuleScript;
									team: ModuleScript;
									primitives: ModuleScript;
									color: ModuleScript;
								};
							};
							types: ModuleScript;
						};
						server: ModuleScript & {
							dispatcher: ModuleScript;
							registry: ModuleScript;
							options: ModuleScript;
							types: ModuleScript;
						};
					};
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
				catppuccin: Folder & {
					out: ModuleScript;
				};
				trove: Folder & {
					out: ModuleScript;
				};
				react: ModuleScript & {
					tags: ModuleScript;
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
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

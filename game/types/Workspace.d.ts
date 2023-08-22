interface Workspace extends Model {
	gameMap: Model & {
		path: Folder & {
			["1"]: Part & {
				waypointAttachment: Attachment;
			};
			["8"]: Part & {
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
		placements: Folder & {
			PlacementPart: Part;
		};
		scenery: Folder & {
			Wagon: Model;
			Horse: Model & {
				LEye: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				Leg01: UnionOperation & {
					Joint: Motor6D;
				};
				Hand01Phalanges1: UnionOperation & {
					Joint: Motor6D;
				};
				Calf02Cont: UnionOperation & {
					Joint: Motor6D;
				};
				Blaze: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				RPupil: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				Foot01: UnionOperation & {
					Joint: Motor6D;
				};
				LIris: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				RIris: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				LShoulder: UnionOperation & {
					Joint: Motor6D;
				};
				Head: UnionOperation & {
					Joint: Motor6D;
				};
				EnglishTack: Model & {
					Girth: MeshPart & {
						WeldConstraint: WeldConstraint;
					};
					EnglishSaddle: MeshPart & {
						WeldConstraint: WeldConstraint;
					};
					Blanketcovering: MeshPart & {
						WeldConstraint: WeldConstraint;
					};
					Breastplate: MeshPart & {
						WeldConstraint: WeldConstraint;
					};
					Blanket: MeshPart & {
						WeldConstraint: WeldConstraint;
					};
				};
				Bridle: Model & {
					Rein: UnionOperation & {
						WeldConstraint: WeldConstraint;
						Attachment1: Attachment;
						Attachment0: Attachment;
					};
					Bit: UnionOperation & {
						WeldConstraint: WeldConstraint;
					};
					reinbar: Part & {
						Bite: RopeConstraint;
						RightRein: RopeConstraint;
						WeldConstraint: WeldConstraint;
						LeftRein: RopeConstraint;
					};
				};
				LowerArm02: UnionOperation & {
					Joint: Motor6D;
				};
				LPupil: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				Foot02Hoof: UnionOperation & {
					Joint: Motor6D;
				};
				LowerLeg01: UnionOperation & {
					Joint: Motor6D;
				};
				Foot02Phalanges2: UnionOperation & {
					Joint: Motor6D;
				};
				LowerLeg02: UnionOperation & {
					Joint: Motor6D;
				};
				Hand02Phalanges2: UnionOperation & {
					Joint: Motor6D;
				};
				Leg02: UnionOperation & {
					Joint: Motor6D;
				};
				Foot01Cont: UnionOperation & {
					Joint: Motor6D;
				};
				Ears: MeshPart & {
					Joint: Motor6D;
				};
				Mane: Model & {
					Mane4: MeshPart & {
						Joint: Motor6D;
					};
					Mane0: MeshPart & {
						Joint: Motor6D;
					};
					Mane3: MeshPart & {
						Joint: Motor6D;
					};
					Mane2: MeshPart & {
						Joint: Motor6D;
					};
					Mane6: MeshPart & {
						Joint: Motor6D;
					};
					Mane5: MeshPart & {
						Joint: Motor6D;
					};
					Forelock: MeshPart & {
						Joint: Motor6D;
					};
					Mane1: MeshPart & {
						Joint: Motor6D;
					};
				};
				Hand02Phalanges1: UnionOperation & {
					Joint: Motor6D;
				};
				Withers: UnionOperation & {
					Joint: Motor6D;
				};
				Foot01Phalanges2: UnionOperation & {
					Joint: Motor6D;
				};
				NotATorso: UnionOperation & {
					Joint: Motor6D;
				};
				Tail: MeshPart & {
					Joint: Motor6D;
				};
				HumanoidRootPart: Part & {
					Decal: Decal;
				};
				Neck3: UnionOperation & {
					Joint: Motor6D;
				};
				RShoulder: UnionOperation & {
					Joint: Motor6D;
				};
				LowerArm01: UnionOperation & {
					Joint: Motor6D;
				};
				Foot01Hoof: UnionOperation & {
					Joint: Motor6D;
				};
				Chest: UnionOperation & {
					Joint: Motor6D;
				};
				Nose: UnionOperation & {
					Joint: Motor6D;
				};
				Hand01Cont: UnionOperation & {
					Joint: Motor6D;
				};
				Foot02Phalanges1: UnionOperation & {
					Joint: Motor6D;
				};
				Foot01Phalanges1: UnionOperation & {
					Joint: Motor6D;
				};
				RThigh: UnionOperation & {
					Joint: Motor6D;
				};
				Hand02Hoof: UnionOperation & {
					Joint: Motor6D;
				};
				Torso: Part & {
					Decal: Decal;
					Joint: Motor6D;
				};
				Hand01Hoof: UnionOperation & {
					Joint: Motor6D;
				};
				Neck1: UnionOperation & {
					Joint: Motor6D;
				};
				Calf01Cont: UnionOperation & {
					Joint: Motor6D;
				};
				LThigh: UnionOperation & {
					Joint: Motor6D;
				};
				Hand01Phalanges2: UnionOperation & {
					Joint: Motor6D;
				};
				Foot02Cont: UnionOperation & {
					Joint: Motor6D;
				};
				Forehead: UnionOperation & {
					Joint: Motor6D;
				};
				REye: UnionOperation & {
					WeldConstraint: WeldConstraint;
				};
				Foot02: UnionOperation & {
					Joint: Motor6D;
				};
				Neck2: UnionOperation & {
					Joint: Motor6D;
				};
				Hip: UnionOperation & {
					Joint: Motor6D;
				};
				Hand02Cont: UnionOperation & {
					Joint: Motor6D;
				};
				Chin: UnionOperation & {
					Joint: Motor6D;
				};
			};
		};
		boundaries: Folder;
		fade: Folder;
		rocks: Folder;
	};
	Camera: Camera & {
		Buildv4LocalParts: Model;
		Buildv4MouseFilter: Model;
	};
}

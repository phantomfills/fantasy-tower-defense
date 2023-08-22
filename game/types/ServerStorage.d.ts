interface ServerStorage extends Instance {
	assets: Folder & {
		towers: Folder & {
			archer: Folder & {
				models: Folder & {
					archer: Model & {
						["Left Leg"]: MeshPart;
						["Right Leg"]: MeshPart;
						Head: MeshPart & {
							face: Decal;
						};
						Torso: MeshPart & {
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
						["Right Arm"]: MeshPart & {
							["Right Arm 🡪 Arrow"]: Weld;
							["Right Arm 🡪 Bow"]: Weld;
						};
						["Left Arm"]: MeshPart;
						Bow: Part & {
							Top: Attachment;
							TopBeam: Beam;
							Weld: Weld;
							Bottom: Attachment;
							BottomBeam: Beam;
							Middle: Attachment;
							Mesh: SpecialMesh;
						};
						Arrow: Part & {
							Mesh: SpecialMesh;
						};
					};
				};
			};
		};
		enemies: Folder & {
			foo: Folder & {
				models: Folder & {
					foo: Model & {
						["Left Leg"]: MeshPart;
						["Right Arm"]: MeshPart;
						["Left Arm"]: MeshPart;
						Head: MeshPart & {
							face: Decal;
						};
						Torso: MeshPart & {
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
						["Right Leg"]: MeshPart;
					};
				};
			};
		};
	};
}

import { Debris, Workspace } from "@rbxts/services";
import { images } from "shared/assets";

export function createPopParticles(position: Vector3, count: number = 5, color: Color3 = Color3.fromRGB(27, 42, 53)) {
	const particlePart = new Instance("Part");
	particlePart.Size = new Vector3(1, 1, 1);
	particlePart.Position = position;
	particlePart.Anchored = true;
	particlePart.CanCollide = false;
	particlePart.Transparency = 1;
	particlePart.Parent = Workspace;

	const particleAttachment = new Instance("Attachment");
	particleAttachment.Parent = particlePart;

	const particleEmitter = new Instance("ParticleEmitter");
	particleEmitter.Color = new ColorSequence(color);
	particleEmitter.Texture = images.white_square;
	particleEmitter.Size = new NumberSequence(0.2);
	particleEmitter.SpreadAngle = new Vector2(40, 40);
	particleEmitter.RotSpeed = new NumberRange(40);
	particleEmitter.Acceleration = new Vector3(0, -20, 0);
	particleEmitter.Lifetime = new NumberRange(0.25, 0.5);
	particleEmitter.Transparency = new NumberSequence([
		new NumberSequenceKeypoint(0, 0),
		new NumberSequenceKeypoint(1, 1),
	]);
	particleEmitter.Enabled = false;
	particleEmitter.Parent = particleAttachment;

	particleEmitter.Emit(count);

	Debris.AddItem(particlePart, 1);
}

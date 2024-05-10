interface AnimationTrackProps {
	id: string;
	parent: Instance;
	animator: Animator;
	speed?: number;
}

export function createAnimationTrack({ id, parent, animator, speed = 1 }: AnimationTrackProps) {
	const animation = new Instance("Animation");
	animation.Parent = parent;
	animation.AnimationId = id;

	const animationTrack = animator.LoadAnimation(animation);
	animationTrack.AdjustSpeed(speed);

	return animationTrack;
}

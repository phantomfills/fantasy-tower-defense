interface AnimationTrackProps {
	id: string;
	parent: Instance;
	animator: Animator;
}

export function createAnimationTrack({ id, parent, animator }: AnimationTrackProps) {
	const animation = new Instance("Animation");
	animation.Parent = parent;
	animation.AnimationId = id;

	return animator.LoadAnimation(animation);
}

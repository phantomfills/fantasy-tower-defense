interface EnemyModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

interface PathWaypoint extends BasePart {
	waypointAttachment: Attachment;
}

export interface TowerModel extends Model {
	humanoidRootPart: BasePart & {
		rootAttachment: Attachment;
	};
}

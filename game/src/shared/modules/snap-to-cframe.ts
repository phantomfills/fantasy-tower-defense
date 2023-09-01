export const snapToCFrameWithAttachmentOffset = (model: Model, attachment: Attachment, cframe: CFrame) => {
	const attachmentOffset = attachment.Position;
	const cframeWithAttachmentOffset = cframe.sub(attachmentOffset);
	model.PivotTo(cframeWithAttachmentOffset);
};

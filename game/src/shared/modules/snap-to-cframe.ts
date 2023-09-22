export const snapToCFrameWithAttachmentOffset = (model: Model, attachment: Attachment, cframe: CFrame) => {
	const attachmentOffset = attachment.CFrame;
	const cframeWithAttachmentOffset = cframe.mul(attachmentOffset.Inverse());
	model.PivotTo(cframeWithAttachmentOffset);
};

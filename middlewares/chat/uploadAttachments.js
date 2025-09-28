import multiFileUploader from "../../utilities/multiFileUploader";

const chatAttachmentUploader = (req, res, next) => {
    const upload = multiFileUploader(
        "attachments",
        ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
        5000000,
        "Only .jpg, .jpeg, .png and .pdf format allowed!"
    );

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                attachments: {
                    message: err.message
                }
            });
        } else {
            next();
        }
    });
}

export default chatAttachmentUploader
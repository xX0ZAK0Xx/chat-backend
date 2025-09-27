import uploader from "../../utilities/singleFileUploader.js";

const userPhotoUploader = (req, res, next) => {
    const upload = uploader(
        "photos",
        ["image/jpeg", "image/png", "image/jpg"],
        1000000,
        "Only .jpg, .jpeg and .png format allowed!"
    );

    upload.any()(req, res, (err)=>{
        if(err){
            res.status(500).json({
                photo: {
                    message: err.message
                }
            });
        }else{
            next();
        }
    });
}

export default userPhotoUploader
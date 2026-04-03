import cloudinary from "cloudinary";
import response from "../response.js";

cloudinary.v2.config({
  cloud_name: "drknwnnmq",
  api_key: "897447522917879",
  api_secret: "R6ntYIHaucpAiGR86W4PnV0edF4",
});

const uploadimage = async (req, res) => {
  const file = req.file;
  const userResponse = { ...response };
  if (!file) {
    userResponse.imageuploaded = false;
    return res.status(404).json(userResponse);
  }
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resourse_type: "auto",
    });
    console.log(result);
    userResponse.imageuploaded = true;
    userResponse.imageurl = result.secure_url;
    return res.status(200).json(userResponse);
  } catch (error) {
    userResponse.imageuploaded = false;
    userResponse.error = error.message;
    return res.status(404).json(userResponse);
  }
};

export default uploadimage;

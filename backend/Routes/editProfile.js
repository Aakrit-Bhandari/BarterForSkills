import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const editProfile = async(req,res)=>{
    const userResponse = {...response};
    const userData = req.params.username;
    const userDatachanged = req.body;
    try{
        const findProfile = await IdeaproviderModel.findOne({
            username: userData
        });

        if (findProfile) {
            const makechanges = await IdeaproviderModel.findOneAndUpdate({
                username:userData
            },userDatachanged,{new:true})

            userResponse.editedprofile = true;
            userResponse.datafetched = makechanges;
            return res.status(200).json(userResponse);
        } else {
            userResponse.editedprofile = false;
            userResponse.error = "Profile not found";
            return res.status(404).json(userResponse);
        }
    }
    catch(error){
        userResponse.editedprofile = false;
        userResponse.error = error.message;
        return res.status(500).json(userResponse);
    }
}

export default editProfile;
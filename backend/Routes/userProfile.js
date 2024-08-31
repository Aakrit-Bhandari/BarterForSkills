import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const userProfile = async(req,res)=>{
    const userResponse = {...response};
    const userData = req.params.username;
    try{
        const usermongoosedata = await IdeaproviderModel.findOne({
            username: userData
        });
        if(userData!=null)
        {
            userResponse.userprofilefound = true;
            userResponse.userProfiledata = usermongoosedata;
            return res.status(200).json(userResponse);
        }
        else{
            userResponse.error = error.message;
            userResponse.userprofilefound = false;
            return res.status(404).json(userResponse);
        }
    }
    catch(error)
    {
        userResponse.error = error.message;
        userResponse.userprofilefound = false;
        return res.status(500).json(userResponse);
    }
}

export default userProfile;
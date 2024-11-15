import response from "../response.js";
import IdeaproviderModel from "../models/IdeaproviderSchema.js";

const checkUsername = async(req,res)=>{
    const data = req.params;
    const userResponse = {...response};

    try{
        const finding = await IdeaproviderModel.findOne({
            username:data.username
        });
        if(finding==null){
            userResponse.usernameavailable = true;
            return res.status(200).json(userResponse);
        }
        else{
            userResponse.usernameavailable = false;
            return res.status(200).json(userResponse);
        }
    }
    catch(error){
        userResponse.error = error.message;
        userResponse.usernameavailable = false;
        return res.status(500).json(userResponse);
    }
}

export default checkUsername;
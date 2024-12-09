import response from "../../response.js"
import IdeaproviderModel from "../../models/IdeaproviderSchema.js";
const getUserLanguage = async(req,res)=>{
    const userId= req.params.userId;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(user)
        {
            userResponse.userprofilefound = true;
            userResponse.datafetched.language= user.personaldetails.language;
            return res.status(200).json(userResponse);
        }
        else
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(400).json(userResponse);
        }
    }
    catch(error)
    {
        userResponse.error = error.message;
        userResponse.usernameavailable = false;
        return res.status(500).json(userResponse);
    }
}
const addUserLanguage = async(req,res)=>{
    console.log("added");
    const {userId,langName,proficiency} = req.body;
    const userResponse = {...response};
    try{
        const user= await IdeaproviderModel.findOne({_id:userId});
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message="User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.language.push({langName,proficiency});
        await user.save();
        userResponse.editedprofile=true;
        userResponse.datafetched.language= user.personaldetails.language;
        console.log("YES got in");
        return res.status(200).json(userResponse);
    }catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const editUserLanguage = async(req,res)=>{
    const {userId,lang} = req.body;
    const userResponse = {...response};
    try
    {
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.language = lang;
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.language= user.personaldetails.language;
        return res.status(200).json(userResponse);
    }
    catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const deleteUserLanguage = async(req,res)=>{
    const {userId} = req.body;
    const languageId = req.params.langId;
    const userResponse ={...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found"
            return res.status(404).json(userResponse);
        }
        user.personaldetails.language = user.personaldetails.language.filter(
            (language)=>language._id.toString()!==languageId
        );
        await user.save();
        userResponse.editedprofile = true;
        userResponse.message = "language is now deleted successfully";
        userResponse.datafetched.language = user.personaldetails.language;
        return res.status(200).json(userResponse);
    }
    catch(err){
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
export {getUserLanguage,addUserLanguage,editUserLanguage,deleteUserLanguage};
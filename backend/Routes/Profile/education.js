import response from "../../response.js"
import IdeaproviderModel from "../../models/IdeaproviderSchema.js";
const getUserEducation= async(req,res)=>{
    const userId= req.params.id;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(user)
        {
            userResponse.userprofilefound = true;
            userResponse.datafetched.education = user.personaldetails.education;
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
const addUserEducation = async(req,res)=>{
    console.log("added");
    const {userId,levelofedu,fieldofstudy} = req.body;
    const userResponse = {...response};
    try{
        const user= await IdeaproviderModel.findOne({_id:userId});
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message="User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.education.push({levelofedu,fieldofstudy});
        await user.save();
        userResponse.editedprofile=true;
        userResponse.datafetched.education = user.personaldetails.education;
        console.log("YES got in");
        return res.status(200).json(userResponse);
    }catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const editUserEducation = async(req,res)=>{
    const {userId,education} = req.body;
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
        user.personaldetails.education = education;
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.education = user.personaldetails.education;
        return res.status(200).json(userResponse);
    }
    catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const deleteUserEducation = async(req,res)=>{
    const {userId} = req.body;
    const educationId = req.params.eduId;
    const userResponse ={...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found"
            return res.status(404).json(userResponse);
        }
        user.personaldetails.education = user.personaldetails.education.filter(
            (education)=>education._id.toString()!==educationId
        );
        await user.save();
        userResponse.editedprofile = true;
        userResponse.message = "Education is now deleted successfully";
        userResponse.datafetched.education = user.personaldetails.education;
        return res.status(200).json(userResponse);
    }
    catch(err){
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
export {getUserEducation,addUserEducation,editUserEducation,deleteUserEducation};
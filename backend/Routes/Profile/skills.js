import response from "../../response.js"
import IdeaproviderModel from "../../models/IdeaproviderSchema.js";
const getUserSkills = async(req,res)=>{
    const userId= req.params.userId;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(user)
        {
            userResponse.userprofilefound = true;
            userResponse.datafetched.skills = user.personaldetails.skills;
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
const addUserSkills = async(req,res)=>{
    console.log("added");
    const {userId,skill,experience} = req.body;
    const userResponse = {...response};
    try{
        const user= await IdeaproviderModel.findOne({_id:userId});
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message="User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.skills.push({skill,experience});
        await user.save();
        userResponse.editedprofile=true;
        userResponse.datafetched.skills = user.personaldetails.skills;
        console.log("YES got in");
        return res.status(200).json(userResponse);
    }catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const editUserSkills = async(req,res)=>{
    const {userId,skills} = req.body;
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
        user.personaldetails.skills = skills;
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.skills = user.personaldetails.skills;
        return res.status(200).json(userResponse);
    }
    catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const deleteUserSkill = async(req,res)=>{
    const {userId} = req.body;
    const skillId = req.params.skillId;
    console.log(skillId);
    const userResponse ={...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found"
            return res.status(404).json(userResponse);
        }
        user.personaldetails.skills = user.personaldetails.skills.filter(
            (skill)=>skill._id.toString()!==skillId
        );
        await user.save();
        userResponse.editedprofile = true;
        userResponse.message = "Skill si now deleted successfully";
        userResponse.datafetched.skills = user.personaldetails.skills;
        return res.status(200).json(userResponse);
    }
    catch(err){
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
export {getUserSkills,addUserSkills,editUserSkills,deleteUserSkill};
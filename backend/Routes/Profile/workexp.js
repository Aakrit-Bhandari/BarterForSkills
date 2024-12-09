import response from "../../response.js";
import IdeaproviderModel from "../../models/IdeaproviderSchema.js";
const getUserWorkExp = async(req,res)=>{
    const userId= req.params.id;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(user)
        {
            userResponse.userprofilefound = true;
            userResponse.datafetched.workexperience= user.personaldetails.workexperience;
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
const addUserWorkExp = async(req,res)=>{
    console.log("added");
    const {userId,title,company} = req.body;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findOne({_id:userId});
        if(!user)
        {
            userResponse.userprofilefound.found = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.workexperience.push({title,company});
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.workexperience= user.personaldetails.workexperience;
        console.log("Yes got in");
        return res.status(200).json(userResponse);
    }
    catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
};
const editUserWorkExp =async(req,res)=>{
    const{userId,title} = req.body;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound=false;
            userResponse.message= "user not found"
            return res.status(404).json(userResponse);
        }
        user.personaldetails.workexperience = title;
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.workexperience = user.personaldetails.workexperience;
        return res.status(200).json(userResponse);
    }catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const deleteUserWorkExp = async(req,res)=>{
    const {userId} = req.body;
    const workExpId = req.params.workExpId;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }
        console.log(workExpId);
        console.log("Before",user.personaldetails.workexperience);
        user.personaldetails.workexperience = user.personaldetails.workexperience.filter(
            (title) =>title._id.toString()!==workExpId
        );
        console.log("After",user.personaldetails.workexperience);

        await user.save();
        userResponse.editedprofile = true;
        userResponse.message = "work exp isnow deleted"
        userResponse.datafetched.workexperience = user.personaldetails.workexperience;
        return res.status(200).json(userResponse);
    }
    catch(err){
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
export {getUserWorkExp,addUserWorkExp,editUserWorkExp,deleteUserWorkExp}
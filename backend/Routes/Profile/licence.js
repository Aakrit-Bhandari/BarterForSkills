import response from "../../response.js"
import IdeaproviderModel from "../../models/IdeaproviderSchema.js";
const getUserLicence = async(req,res)=>{
    const userId= req.params.id;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(user)
        {
            userResponse.userprofilefound = true;
            userResponse.datafetched.licence= user.personaldetails.licence;
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
const addUserLicence = async(req,res)=>{
    console.log("added");
    const {userId,licenceName,year} = req.body;
    const userResponse = {...response};
    try{
        const user= await IdeaproviderModel.findOne({_id:userId});
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message="User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.licence.push({licenceName,year});
        await user.save();
        userResponse.editedprofile=true;
        userResponse.datafetched.licence= user.personaldetails.licence;
        console.log("YES got in");
        return res.status(200).json(userResponse);
    }catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const editUserLicence = async(req,res)=>{
    const {userId,licence} = req.body;
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
        user.personaldetails.licence = licence;
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.licence = user.personaldetails.licence;
        return res.status(200).json(userResponse);
    }
    catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const deleteUserLicence = async(req,res)=>{
    const {userId} = req.body;
    const licenceId = req.params.licenceId;
    const userResponse ={...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found"
            return res.status(404).json(userResponse);
        }
        user.personaldetails.licence = user.personaldetails.licence.filter(
            (licence)=>licence._id.toString()!==licenceId
        );
        await user.save();
        userResponse.editedprofile = true;
        userResponse.message = "Education si now deleted successfully";
        userResponse.datafetched.licence = user.personaldetails.licence;
        return res.status(200).json(userResponse);
    }
    catch(err){
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
export {getUserLicence,addUserLicence,editUserLicence,deleteUserLicence};
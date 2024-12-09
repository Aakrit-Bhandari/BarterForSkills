import response from "../../response.js"
import IdeaproviderModel from "../../models/IdeaproviderSchema.js"
const getUserCertificate = async(req,res)=>{
    const userId = req.params.userId;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(user)
        {
            userResponse.userprofilefound = true;
            userResponse.datafetched.certification = user.personaldetails.certification;
            return res.status(200).json(userResponse);
        }
        else
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(400).json(userResponse);
        }
    }
    catch(er)
    {
        userResponse.error = er.message;
        userResponse.usernameavailable = false;
        return res.status(500).json(userResponse);
    }
}
const addUserCertificate = async(req,res)=>{
    console.log("added");
    const {userId,certificate} = req.body;
    const userResponse = {...response};
    try{
        const user = await IdeaproviderModel.findOne({_id:userId});
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.certification.push({certificate});
        await user.save();
        userResponse.editedprofile = true;
        userResponse.datafetched.certification = user.personaldetails.certification;
        console.log("Yes got in");
        return res.status(200).json(userResponse);
    }
    catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const editUserCertification = async(req,res)=>
{
    const {userId,certificate} = req.body;
    const userResponse ={...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User Not found";
            return res.status(404).json(userResponse);
        }
        user.personaldetails.certification= certificate;
        await user.save();
        userResponse.editedprofile = true;
        return res.status(200).json(userResponse);
    }catch(err)
    {
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
const deleteUserCertificate = async(req,res)=>{
    const {userId} = req.body;
    const certificateId = req.params.certifId;
    const userResponse ={...response};
    try{
        const user = await IdeaproviderModel.findById(userId);
        if(!user)
        {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found"
            return res.status(404).json(userResponse);
        }
        user.personaldetails.certification= user.personaldetails.certification.filter(
            (certif)=>certif._id.toString()!==certificateId
        );
        await user.save();
        userResponse.editedprofile = true;
        userResponse.message = "Certificate si now deleted successfully";
        userResponse.datafetched.certification = user.personaldetails.certification;
        return res.status(200).json(userResponse);
    }
    catch(err){
        userResponse.error = err.message;
        return res.status(500).json(userResponse);
    }
}
export {getUserCertificate,addUserCertificate,editUserCertification,deleteUserCertificate};
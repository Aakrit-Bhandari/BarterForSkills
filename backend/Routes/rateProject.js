import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const rateProject = async(req,res)=>{
    const userData = req.body;
    const userResponse = {...response};
    const {clientid} = req.params;
    try{
        console.log(userData);
        const getuser = await IdeaproviderModel.findById(clientid);
        console.log();
        const ratingdata = getuser.personaldetails.rating;
        console.log("old ",ratingdata);
        getuser.personaldetails.rating = (getuser.personaldetails.rating===null?0:getuser.personaldetails.rating);
        getuser.personaldetails.rating = ((getuser.personaldetails.rating+Number(userData.rating))/2 ).toFixed().toString();
        console.log("new",getuser.personaldetails.rating);
        await getuser.save();
        userResponse.ratingmade = true;
        return res.status(200).json(userResponse);
    }
    catch(error){
        userResponse.error = error;
        userResponse.ratingmade = false;
        console.log(error);
        return res.status(404).json(userResponse);
    }
}

export default rateProject;
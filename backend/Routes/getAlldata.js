import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getAlldata = async(req,res)=>{
    const userResponse = {...response};
    try{
        const userData = await IdeaproviderModel.find();
        const projectData = await Projectsmodel.find();
        userResponse.gottotaldata = true;
        userResponse.totaldata = {
            userData: userData,
            projectData: projectData
        }
        return res.status(200).json(userResponse);
    }
    catch(error){
        userResponse.error = error;
        userResponse.gottotaldata = false;
        return res.status(500).json(userResponse);
    }
}

export default getAlldata;
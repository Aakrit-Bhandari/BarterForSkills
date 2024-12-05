import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const deleteproject = async(req,res)=>{
    const {projectid,userid} = req.params;
    const userResponse = {...response};
    try{
        const findproject = await Projectsmodel.findById(projectid);
        const finduser = await IdeaproviderModel.findById(userid);
        if(findproject){
            finduser.tasksposted -= 1;
            await finduser.save();
            await Projectsmodel.findByIdAndDelete(projectid);
            userResponse.projectdeleted = true;
            userResponse.message = "Project deleted successfully";
            return res.status(200).json(userResponse);
        }
        else{
            userResponse.projectdeleted = false;
            return res.status(200).json(userResponse);
        }
    }
    catch(error){
        userResponse.error = error;
        userResponse.projectdeleted = false;
        return res.status(500).json(userResponse);
    }
}

export default deleteproject;
import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const newproject = async(req,res)=>{
    const userResponse = {...response};
    const {userid} = req.params;
    const projectdata = req.body;
    console.log(projectdata);
    try{
        const getuser = await IdeaproviderModel.findById(userid);
        if(!getuser){
            userResponse.newprojectadded = false;
            return res.status(200).json(userResponse);
        }
        //check for userproject model
        if((getuser.subscription === "workprovider-basic" && getuser.tasksposted>=7) || (getuser.subscription === "workprovider-mid" && getuser.tasksposted>=15)){
            userResponse.newprojectadded = false;
            userResponse.planmaxreach = true;
            return res.status(200).json(userResponse);
        }

        const newprojectdata = new Projectsmodel(projectdata);

        //increment jobs posted count
        getuser.tasksposted += 1;
        await getuser.save();
        await newprojectdata.save();
        console.log("not adding");
        userResponse.newprojectadded = true;
        return res.status(200).json(userResponse);
    }
    catch(error)
    {
        userResponse.newprojectadded = false;
        userResponse.error = error.message;
        userResponse.message = "Project not added";
        return res.status(200).json(userResponse);
    }
}

export default newproject;
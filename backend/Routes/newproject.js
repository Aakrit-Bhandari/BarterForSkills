import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const newproject = async(req,res)=>{
    const userResponse = {...response};

    const projectdata = req.body;
    console.log(projectdata);
    try{
        const newprojectdata = new Projectsmodel(projectdata);
        console.log(newprojectdata);
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
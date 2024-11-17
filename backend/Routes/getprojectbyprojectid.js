import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getprojectbyprojectid = async(req,res)=>{
    const userResponse = {...response};
    const {projectid} = req.params;
    try{
        const getdata = await Projectsmodel.findById(projectid);
        if(getdata){
            userResponse.projectdatapresent = true;
            userResponse.projectdatafetched = getdata;
            return res.status(200).json(userResponse);
        }
        userResponse.projectdatapresent = false;
            // userResponse.projectdatafetched = getdata;
            return res.status(200).json(userResponse);
    }
    catch(error){
        userResponse.error = error;
        userResponse.projectdatapresent = false;
        return res.status(500).json(userResponse);
    }
}

export default getprojectbyprojectid;
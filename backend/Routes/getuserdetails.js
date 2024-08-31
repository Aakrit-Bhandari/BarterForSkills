import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getuserdetails = async(req,res)=>{
    const userResponse = {...response};
    const projectid = req.params.projectid;
    const userid = req.params.userid;
    try{
        const findproject = await Projectsmodel.findOne({
            _id: projectid
        });
        if(findproject!=null)
        {
            if(findproject.projectofficials.ideaproviderid === userid)
            {
                userResponse.cliendapplied = findproject.projectofficials.clientsapplied;
                return res.status(200).json(userResponse);
            }
            else{
                userResponse.error = "Some error occured";
                return res.status(404).json(userResponse);
            }
        }
        else{
            userResponse.projectdatapresent = false;
            userResponse.message = "Project not found";
            return res.status(404).json(userResponse);
        }
    }
    catch(error){
        userResponse.error = error.message;
        userResponse.message = "Error occured";
        return res.status(500).json(userResponse);
    }
}

export default getuserdetails;
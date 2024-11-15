import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getprojectsbyid = async(req,res)=>{
    const userResponse = { ...response };
    const userid = req.params.userid;

    try {
        // Fetch user by ID
        
        const getprojects = await Projectsmodel.find();
        
        if(getprojects.length>0){
            const newdata = getprojects.filter(project=> project.projectofficials.ideaproviderid.toString()===userid);
           
            userResponse.projectfound = true;
            userResponse.projectdatafetched = newdata;
            return res.status(200).json(userResponse);
        }
        userResponse.projectfound = false;
        return res.status(200).json(userResponse);
    } catch (error) {
        console.error("Error fetching user projects:", error.message);
        userResponse.error = error.message;
        userResponse.projectfound = false;
        return res.status(500).json(userResponse);
    }
}

export default getprojectsbyid;
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const newprojectentry = async (req, res) => {
    const userResponse = { ...response };
    const userData = req.body;
    // Contains { projectid, userid }
    
    try {
        const findProject = await Projectsmodel.findById(userData.projectid);
        
        if (findProject !== null) {
            findProject.projectofficials.clientsapplied.push({
                cliendid: userData.userid
            });

            await findProject.save();
            
            userResponse.projectentry = true;
            return res.status(200).json(userResponse);
        } else {
            userResponse.projectentry = false;
            userResponse.message = "project not found";
            return res.status(404).json(userResponse);
        }
    } catch (error) {
        userResponse.error = error.message;
        userResponse.projectentry = false;
        userResponse.message = "error at adding entry to project";
        return res.status(500).json(userResponse);
    }
}

export default newprojectentry;

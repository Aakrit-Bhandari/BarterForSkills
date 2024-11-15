import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const newprojectentry = async (req, res) => {
    const userResponse = { ...response };
    const userData = req.body; // Contains { projectid, userid }
    
    try {
        // Step 1: Check if project exists
        const findProject = await Projectsmodel.findById(userData.projectid);
        
        if (!findProject) {
            userResponse.projectentry = false;
            userResponse.message = "Project not found";
            return res.status(404).json(userResponse);
        }

        // Step 2: Check if user has already applied to the project
        const existingClient = findProject.projectofficials.clientsapplied.find(
            (client) => client.cliendid === userData.userid
        );
        
        if (existingClient) {
            userResponse.projectentry = false;
            userResponse.message = "User already applied";
            return res.status(200).json(userResponse);
        }

        // Step 3: Add user to project's clients applied list
        findProject.projectofficials.clientsapplied.push({
            cliendid: userData.userid,
        });

        // Step 4: Add project to the user's applied projects list
        const findUserToAdd = await IdeaproviderModel.findById(userData.userid);
        
        if (!findUserToAdd) {
            userResponse.projectentry = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }

        findUserToAdd.projectsworkapplied.push({
            projectid: userData.projectid,
        });

        // Step 5: Save the changes to both documents
        await findProject.save();
        await findUserToAdd.save();
        
        userResponse.projectentry = true;
        userResponse.message = "Project entry added successfully";
        return res.status(200).json(userResponse);
    } catch (error) {
        console.error("Error adding project entry:", error);
        userResponse.error = error.message;
        userResponse.projectentry = false;
        userResponse.message = "Error at adding entry to project";
        return res.status(500).json(userResponse);
    }
};

export default newprojectentry;

import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";
import sendShortlistedmail from "../Utils/sendshortlistmail.js";

const shortlistuser = async (req, res) => {
    const { userid, projectid } = req.params;
    const userResponse = { ...response };

    try {
        // Fetch both user and project data in parallel
        const [getuser, getproject] = await Promise.all([
            IdeaproviderModel.findById(userid),
            Projectsmodel.findById(projectid)
        ]);

        // Check if user and project exist
        if (!getuser) {
            userResponse.userApplied = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }
        if (!getproject) {
            userResponse.userApplied = false;
            userResponse.message = "Project not found";
            return res.status(404).json(userResponse);
        }

        // Remove project ID from user's applied projects
        getuser.projectsworkapplied = getuser.projectsworkapplied.filter(
            (item) => item.projectid.toString() !== projectid
        );

        // Save updated user after removing the project
        await getuser.save();
        const projectAlreadyExists = getuser.projectsworkedon.some(
            (project) => project.projectid.toString() === projectid
        );

        if (projectAlreadyExists) {
            // Add user ID to project's clients applied list if not already present
            userResponse.userApplied = false;
            return res.status(200).json(userResponse);
        }

        // Add project ID to user's projects worked on
        getuser.projectsworkedon.push({ projectid });
        await getuser.save();

        // Check if the client is already in the project's clients applied list
        const clientAlreadyExists = getproject.projectofficials.clientsapplied.some(
            (client) => client.cliendid.toString() === userid
        );

        if (!clientAlreadyExists) {
            // Add user ID to project's clients applied list if not already present
            getproject.projectofficials.clientsapplied.push({ cliendid: userid });
            await getproject.save();
        }

        userResponse.userApplied = true;
        sendShortlistedmail(getuser.email)
        return res.status(200).json(userResponse);

    } catch (error) {
        console.error("Error applying to project:", error.message);
        userResponse.error = error.message;
        userResponse.userApplied = false;
        return res.status(500).json(userResponse);
    }
};

export default shortlistuser;

import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const applyproject = async (req, res) => {
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

        // Check if the user has already applied for the project
        const alreadyApplied = getuser.projectsworkapplied.some(
            (proj) => proj.projectid.toString() === projectid
        );

        if (alreadyApplied) {
            userResponse.userApplied = false;
            userResponse.userAlreadyapplied = true;
            return res.status(200).json(userResponse);
        }

        // Add project ID to user's applied projects
        getuser.projectsworkapplied.push({ projectid });
        await getuser.save();

        // Add user ID to project's clients applied list
        const clientAlreadyExists = getproject.projectofficials.clientsapplied.some(
            (client) => client.cliendid.toString() === userid
        );

        if (!clientAlreadyExists) {
            getproject.projectofficials.clientsapplied.push({ cliendid: userid });
            await getproject.save();
        }

        userResponse.userApplied = true;
        return res.status(200).json(userResponse);

    } catch (error) {
        console.error("Error applying to project:", error.message);
        userResponse.error = error.message;
        userResponse.userApplied = false;
        return res.status(500).json(userResponse);
    }
};

export default applyproject;

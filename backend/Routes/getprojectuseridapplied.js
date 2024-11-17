import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getprojectuseridapplied = async (req, res) => {
    const userResponse = { ...response };
    const userid = req.params.userid;

    try {
        // Fetch user by ID
        const getuser = await IdeaproviderModel.findById(userid);

        // Check if user exists
        if (!getuser) {
            userResponse.projectfound = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }

        // Check if user has any projects applied
        if (getuser.projectsworkedon && getuser.projectsworkedon.length > 0) {
            userResponse.projectfound = true;

            // Fetch all project details using Promise.all
            const projectsdata = await Promise.all(
                getuser.projectsworkedon.map(async (proj) => {
                    return await Projectsmodel.findById(proj.projectid);
                })
            );

            userResponse.projectapplied = projectsdata.filter(project => project !== null); // Remove any null results if project not found
            return res.status(200).json(userResponse);
        } else {
            userResponse.projectfound = false;
            userResponse.message = "No projects found for this user";
            return res.status(200).json(userResponse);
        }
    } catch (error) {
        console.error("Error fetching user projects:", error.message);
        userResponse.error = error.message;
        userResponse.projectfound = false;
        return res.status(500).json(userResponse);
    }
};

export default getprojectuseridapplied;

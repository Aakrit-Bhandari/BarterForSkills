import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const getprojectuserid = async (req, res) => {
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
        if (getuser.projectsworkapplied && getuser.projectsworkapplied.length > 0) {
            userResponse.projectfound = true;
            userResponse.projectapplied = getuser.projectsworkapplied;
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

export default getprojectuserid;

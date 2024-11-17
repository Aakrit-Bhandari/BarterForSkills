import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const getUser = async (req, res) => {
    const userResponse = { ...response };
    const { userid } = req.params;
    try {
        // Fetch user data by ID
        const usermongoosedata = await IdeaproviderModel.findById(userid);
    
        // Check if user is found
        if (usermongoosedata) {
            userResponse.userprofilefound = true;
            userResponse.userProfiledata = usermongoosedata;
            return res.status(200).json(userResponse);
        } else {
            // User not found case
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(404).json(userResponse);
        }
    } catch (error) {
        // Handle database errors or other unexpected issues
        console.error("Error fetching user:", error.message);
        userResponse.error = error.message;
        userResponse.userprofilefound = false;
        return res.status(500).json(userResponse);
    }
};

export default getUser;

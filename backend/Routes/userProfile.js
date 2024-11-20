import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const userProfile = async (req, res) => {
    const userResponse = { ...response };
    const { username } = req.params;

    try {
        // Fetch user profile data using the provided username
        console.log("herr");
        const usermongoosedata = await IdeaproviderModel.findOne({
            'username': username
        });
        console.log(usermongoosedata);
        if (usermongoosedata) {
            userResponse.userprofilefound = true;
            userResponse.userProfiledata = usermongoosedata;
            return res.status(200).json(userResponse);
        } else {
            userResponse.userprofilefound = false;
            userResponse.message = "User not found";
            return res.status(200).json(userResponse);
        }
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        userResponse.error = error.message;
        userResponse.userprofilefound = false;
        return res.status(404).json(userResponse);
    }
};

export default userProfile;

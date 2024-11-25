import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";

const rateProject = async (req, res) => {
    const userData = req.body;
    const userResponse = { ...response };
    const { clientid } = req.params;

    try {
        console.log(userData);

        // Find the user by ID
        const getuser = await IdeaproviderModel.findById(clientid);

        // Handle if user is not found
        if (!getuser) {
            userResponse.error = "User not found";
            return res.status(404).json(userResponse);
        }

        // Retrieve current rating
        let currentRating = getuser.personaldetails.rating;
        console.log("Old Rating:", currentRating);

        // Ensure currentRating is treated as 0 if null or undefined
        currentRating = currentRating ? Number(currentRating) : 0;

        // Update the rating based on whether it exists or not
        if (currentRating === 0) {
            // If no prior rating, set the new rating directly
            getuser.personaldetails.rating = Number(userData.rating).toFixed(1).toString();
        } else {
            // Average the new rating with the old rating
            getuser.personaldetails.rating = (
                (currentRating + Number(userData.rating)) / 2
            ).toFixed(1).toString();
        }

        console.log("New Rating:", getuser.personaldetails.rating);

        // Save the updated user data
        await getuser.save();

        // Response
        userResponse.ratingmade = true;
        return res.status(200).json(userResponse);
    } catch (error) {
        // Error handling
        userResponse.error = error.message || "An error occurred";
        userResponse.ratingmade = false;
        console.error(error);
        return res.status(500).json(userResponse);
    }
};

export default rateProject;

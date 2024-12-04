import bcrypt from "bcryptjs"; // Import bcrypt
import response from "../response.js";
import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import sendwelcomeemail from "../Utils/sendwelcomeemail.js";
import generatejwttoken from "../Utils/generatejwttoken.js";

const register = async (req, res) => {
    const userResponse = { ...response };
    const userData = req.body;
    try {
        const dbresponse = await IdeaproviderModel.findOne({
            username: userData.username
        });

        if (dbresponse === null) {
            // Hash the password before saving it to the database
            const salt = await bcrypt.genSalt(10); // Generate a salt
            const hashedPassword = await bcrypt.hash(userData.password, salt); // Hash the password

            // Replace the plain password with the hashed password
            userData.password = hashedPassword;
            console.log(hashedPassword);
            const newuser = new IdeaproviderModel(userData);
            console.log(newuser);
            await newuser.save();

            // Generate a JWT token
            const token = await generatejwttoken(newuser);

            userResponse.userAdded = true;
            userResponse.tokengenerated = true;
            userResponse.token = token.token;
            res.cookie("freelance_cookie", token.token, token.options);
            userResponse.datafetched = newuser;
            userResponse.userData = newuser;
            userResponse.totaldatapresent = true;

            // Send a welcome email to the user
            sendwelcomeemail(userData.email);

            return res.status(200).json(userResponse);
        } else {
            userResponse.existingusername = true;
            userResponse.error = "Same username exists";
            return res.status(404).json(userResponse);
        }
    } catch (error) {
        userResponse.error = error.message;
        userResponse.message = "Error occurred at register route.";
        console.log(error);
        return res.status(500).json(userResponse);
    }
}

export default register;

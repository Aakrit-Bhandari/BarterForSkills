import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import bcrypt from "bcryptjs"; // Assuming bcryptjs is installed for password hashing
import response from "../response.js";
import generatejwttoken from '../Utils/generatejwttoken.js';

const verifyPassword = async (req, res) => {
    const userResponse = { ...response };
    const { email, password, usertype } = req.body;

    try {
        // Finding user by email
        const findingUser = await IdeaproviderModel.findOne({
            email: email
        });

        if (!findingUser) {
            userResponse.passverified = false;
            userResponse.message = "This email is not registered. Login with OTP to continue further.";
            return res.status(200).json(userResponse);
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, findingUser.password);

        if (!isPasswordValid) {
            userResponse.passverified = false;
            userResponse.message = "Incorrect password.";
            return res.status(200).json(userResponse);
        }

        // Check if the user type matches
        if (findingUser.usertype !== usertype) {
            userResponse.passverified = false;
            userResponse.message = "User type mismatch.";
            return res.status(200).json(userResponse);
        }

        // Password is valid and user type matches
        userResponse.passverified = true;
        userResponse.message = "Password verified successfully.";
        const token = await generatejwttoken(findingUser);
        userResponse.tokengenerated = true;
        userResponse.token = token.token;
                    res.cookie('freelance_cookie',token.token,token.options);
                    userResponse.existinguser = true;
                    userResponse.otpverified = true;
                    userResponse.totaldatapresent = true;
                    userResponse.datafetched = findingUser;
                    userResponse.userData = findingUser;
                    return res.status(200).json(userResponse);
        userResponse.userData = findingUser; // Optionally, include user data in response

        return res.status(200).json(userResponse);
    } catch (error) {
        userResponse.error = error;
        userResponse.passverified = false;
        return res.status(500).json(userResponse);
    }
};

export default verifyPassword;

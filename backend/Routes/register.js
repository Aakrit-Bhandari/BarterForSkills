import response from "../response.js";
import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import sendwelcomeemail from "../Utils/sendwelcomeemail.js";
import generatejwttoken from "../Utils/generatejwttoken.js";

const register = async(req, res) => {
    const userResponse = {...response};
    const userData = req.body;
    try {
        const dbresponse = await IdeaproviderModel.findOne({
            username: userData.username
        });

        if (dbresponse === null) {
            const newuser = new IdeaproviderModel(userData);
            await newuser.save();
            const token = await generatejwttoken(newuser); 

            userResponse.tokengenerated = true;
            userResponse.token = token.token;
            res.cookie('freelance_cookie', token.token, token.options);
            userResponse.datafetched = newuser;
            userResponse.totaldatapresent = true;
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
        return res.status(500).json(userResponse);
    }
}

export default register;

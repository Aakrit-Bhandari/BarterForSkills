import bcrypt from "bcryptjs"; // Import bcrypt
import IdeaproviderModel from "../models/IdeaproviderSchema.js";
import response from "../response.js";
import generatejwttoken from "../Utils/generatejwttoken.js";
import sendwelcomeemail from "../Utils/sendwelcomeemail.js";

const register = async (req, res) => {
  const userResponse = { ...response };
  const userData = req.body;
  try {
    const dbresponse = await IdeaproviderModel.findOne({
      username: userData.username,
    });

    if (dbresponse === null) {
      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(userData.password, salt); // Hash the password

      // Replace the plain password with the hashed password
      userData.password = hashedPassword;
      const newuser = new IdeaproviderModel(userData);
      await newuser.save();

      // Generate a JWT token
      const token = await generatejwttoken(newuser);

      userResponse.userAdded = true;
      userResponse.tokengenerated = true;
      userResponse.token = token.token;
      res.cookie("barter4Skills_cookie", token.token, {
        sameSite: "None",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
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
};

export default register;

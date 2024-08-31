import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generatejwttoken = async(userData) => {
    // Convert Mongoose document to plain JavaScript object if necessary
    const id = userData._id.toString();  // Ensure _id is in string format

    const token = await jsonwebtoken.sign({
        id: id,  // Use the _id field
        username: userData.username,
        email: userData.email,
        userData : userData
    }, process.env.SECRET, { expiresIn: '2d' });

    const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'Lax',
        secure: false 
    };

    const tokendata = { token, options };
    return tokendata;
};

export default generatejwttoken;

import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const generatejwttoken = async (userData) => {
  const id = userData._id.toString();

  const token = await jsonwebtoken.sign(
    {
      id: id,
      username: userData.username,
      email: userData.email,
      userData: userData,
    },
    process.env.SECRET,
    { expiresIn: "2d" },
  );

  const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };

  const tokendata = { token, options };
  return tokendata;
};

export default generatejwttoken;

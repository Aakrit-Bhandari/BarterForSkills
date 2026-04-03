import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import response from "../response.js";

dotenv.config();

const checkToken = async (req, res) => {
  const userResponse = { ...response };

  try {
    const cookieToken = req.cookies.barter4Skills_cookie;
    if (cookieToken) {
      userResponse.tokenalreadypresent = true;
      try {
        const checkJwtToken = await jsonwebtoken.verify(
          cookieToken,
          process.env.SECRET,
        );
        userResponse.tokenalreadypresent = true;
        userResponse.datafetched = checkJwtToken;
        userResponse.userData = checkJwtToken;
        userResponse.totaldatapresent = true;
        return res.status(200).json(userResponse);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          userResponse.error = "token expired";
          userResponse.message = "token expired";
          userResponse.tokenalreadypresent = false;
          userResponse.tokenverified = false;
          return res.status(404).json(userResponse);
        } else {
          userResponse.error = error.message;
          userResponse.message = "failed token";
          userResponse.tokenalreadypresent = false;
          userResponse.tokenverified = false;
          return res.status(500).json(userResponse);
        }
      }
    } else {
      userResponse.tokenalreadypresent = false;
      userResponse.message = "token not found";
      return res.status(200).json(userResponse);
    }
  } catch (error) {
    userResponse.error = error.message;
    return res.status(500).json(userResponse);
  }
};

export default checkToken;

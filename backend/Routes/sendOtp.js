import otpstore from "../Storage/otpStore.js";
import generateotp from "../Utils/Generateotp.js";
import sendEmail from "../Utils/Sendemail.js";
import response from "../response.js";

const sendOtp = async(req,res)=>{
    const userResponse = {...response};

    const userData = req.body;
    const otp = generateotp();
    otpstore.email = userData.email;
    otpstore.otp = otp;
    userResponse.sentOtp = otp;
    sendEmail(userData.email,otp);
    userResponse.otpsent = true;
    return res.status(200).json(userResponse);
}

export default sendOtp;
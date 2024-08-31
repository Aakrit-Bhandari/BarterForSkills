import IdeaproviderModel from '../models/IdeaproviderSchema.js'
import response from "../response.js";
import otpstore from '../Storage/otpStore.js';
import generatejwttoken from '../Utils/generatejwttoken.js';


const login = async(req,res)=>{
    const resData = { ...response };
    const userData = req.body;
    try{
        //check otp first then the further response
        if(userData.email === otpstore.email && userData.otp === otpstore.otp)
        {
             //find for existing email
            const checkemail = await IdeaproviderModel.findOne({
                email: userData.email
            });
            if(checkemail!=null)
            {
                const token = await generatejwttoken(checkemail);
                resData.tokengenerated = true;
                resData.token = token.token;
                res.cookie('freelance_cookie',token.token,token.options);
                resData.existinguser = true;
                resData.otpverified = true;
                resData.totaldatapresent = true;
                resData.datafetched = checkemail;
                return res.status(200).json(resData);
            }
            else{
                resData.existinguser = false;
                resData.otpverified = true;
                resData.message = "User not found";
                return res.status(404).json(resData);
            }
        }
        else{
            resData.otpverified = false;
            resData.error = "Wrong otp";
            return res.status(404).json(resData);
        }
    }
    catch(error)
    {
        resData.message = "Interal Error";
        resData.error = error.message;
        return res.status(500).json(resData);
    }
}

export default login;
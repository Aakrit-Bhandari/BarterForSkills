import IdeaproviderModel from '../models/IdeaproviderSchema.js'
import response from "../response.js";
import otpstore from '../Storage/otpStore.js';
import generatejwttoken from '../Utils/generatejwttoken.js';


const login = async(req,res)=>{
    const resData = { ...response };
    const userData = req.body;
    try{
        //check otp first then the further response
        if(userData.email === otpstore.email && userData.otp == otpstore.otp)
        {
             //find for existing email
            const checkemail = await IdeaproviderModel.findOne({
                email: userData.email
            });
            if(checkemail!=null)
            {
                //checking for correct signup
                if(checkemail.usertype === userData.usertype)
                {
                    const token = await generatejwttoken(checkemail);
                    resData.tokengenerated = true;
                    resData.token = token.token;
                    res.cookie('freelance_cookie',token.token,token.options);
                    resData.existinguser = true;
                    resData.otpverified = true;
                    resData.totaldatapresent = true;
                    resData.datafetched = checkemail;
                    resData.userData = checkemail;
                    return res.status(200).json(resData);
                }
                else{
                    resData.existinguser = false;
                    resData.userData = resData.userData = {
                        username: '',
                        usertype: userData.usertype,
                        email: userData.email,
                        personaldetails: {
                            name: '',
                            conatactno: '',
                            skills: [],
                            location: '',
                            description: '',
                            linkedinid: '',
                            gender: '',
                            rating: '',
                            projectsworkedon: '',
                            profilephoto: ''
                        }};
                    resData.otpverified = true;
                    resData.anothertypeuser = true;
                    resData.message = "This email is already used as another category at our website.";
                    return res.status(200).json(resData);
                }
            }
            else{
                resData.existinguser = false;
                resData.otpverified = true;
                resData.userData = {
                    username: '',
                    usertype: userData.usertype,
                    email: userData.email,
                    personaldetails: {
                        name: '',
                        conatactno: '',
                        skills: [],
                        location: '',
                        description: '',
                        linkedinid: '',
                        gender: '',
                        rating: '',
                        projectsworkedon: '',
                        profilephoto: ''
                    },
                };
                resData.message = "User not found";
                return res.status(200).json(resData);
            }
        }
        else{
            resData.otpverified = false;
            resData.error = "Wrong otp";
            return res.status(200).json(resData);
        }
    }
    catch(error)
    {
        resData.message = "Interal Error";
        resData.error = error.message;
        console.log("in the login page")
        return res.status(500).json(resData);
    }
}

export default login;
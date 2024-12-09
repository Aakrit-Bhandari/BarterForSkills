import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

//imports file functions
import connectDb from './Database/connectdb.js';

//functions for routes
import getWorks from './Routes/getWorks.js';
import getspecialWork from './Routes/getspecialWork.js';
import login from './Routes/login.js';
import sendOtp from './Routes/sendOtp.js';
import register from './Routes/register.js';
import checkToken from './Routes/checkToken.js';
import newproject from './Routes/newproject.js';
import newprojectentry from './Routes/newprojectentry.js';
import editproject from './Routes/editproject.js';
import getuserdetails from './Routes/getuserdetails.js';
import logout from './Routes/logout.js';
import userProfile from './Routes/userProfile.js';
import editProfile from './Routes/editProfile.js';
import checkUsername from './Routes/checkUsername.js';
import uploadimage from './Routes/uploadimage.js';
import mult from './Utils/Multer.js';
import getprojectuserid from './Routes/getprojectuserid.js';
import getprojectsbyid from './Routes/getprojectsbyid.js';
import applyproject from './Routes/applyproject.js';
import getprojectbyprojectid from './Routes/getprojectbyprojectid.js';
import getUser from './Routes/getUser.js';
import getprojectuseridapplied from './Routes/getprojectuseridapplied.js';
import shortlistuser from './Routes/shortlistuser.js';
import deleteproject from './Routes/deleteproject.js';
import rateProject from './Routes/rateProject.js';
import getAlldata from './Routes/getAlldata.js';
// import { getUserSkills,addUserSkills,editUserSkills,deleteUserSkill } from './Routes/skills.js';
import getcount from './Routes/getcount.js';
import { getQueries,addQuery } from './Routes/contact.js';
import verifyPassword from './Routes/verifyPassword.js';
import performSubscription from './Routes/performSubscription.js';
import checkout from './Routes/checkout.js';


import { getUserSkills,addUserSkills,editUserSkills,deleteUserSkill } from './Routes/Profile/skills.js';
import { getUserCertificate,addUserCertificate,editUserCertification,deleteUserCertificate } from './Routes/Profile/certificate.js';
import { getUserLicence,addUserLicence,editUserLicence,deleteUserLicence } from './Routes/Profile/licence.js';
import { getUserLanguage,addUserLanguage,editUserLanguage,deleteUserLanguage } from './Routes/Profile/language.js';
import { getUserEducation,addUserEducation,editUserEducation,deleteUserEducation } from './Routes/Profile/education.js';
import { getUserWorkExp,addUserWorkExp,editUserWorkExp,deleteUserWorkExp } from './Routes/Profile/workexp.js';

//config dotenv
dotenv.config();
//app configurations and middlewares
const app = express();
app.use(cors({
    origin: process.env.FRONTEND,
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

//connect to db
connectDb();
//
app.post('/send-otp',sendOtp);
app.post('/login',login);
app.get('/check-username/:username',checkUsername);
app.post('/upload-image',mult.single('image'),uploadimage);
app.post('/register',register);
app.get('/check-token',checkToken);
app.post('/editprofile/:username',editProfile);
app.get('/apply-project/:userid/:projectid',applyproject);
app.post('/createnewproject/:userid',newproject);
app.post('/addprojectentry',newprojectentry);
app.get('/user/:userid',getUser);
app.get('/user/username/:username',userProfile);
app.post('/editproject/:id',editproject);
app.get('/getproject-userdetails/:projectid/:userid',getuserdetails);
app.get('/getprojects-all/:userid',getprojectsbyid);
app.get('/getprojects/:userid',getprojectuserid);
app.get('/getprojectuseridapplied/:userid',getprojectuseridapplied);
app.get('/getproject/:projectid',getprojectbyprojectid);
app.get('/getworks',getWorks);
app.get('/getwork/:skill/:type/:barter',getspecialWork);
app.get('/shortlist/:userid/:projectid',shortlistuser);
app.get('/delete-task/:projectid/:userid',deleteproject);
app.post('/rateproject/:clientid',rateProject);
app.get('/getAlldata/barter4skills',getAlldata);
app.get('/profile/qualification/skills/:userId',getUserSkills);
app.post('/profile/qualification/addskill',addUserSkills);
app.put('/profile/qualification/editskills',editUserSkills);
app.get('/getCount/:userid',getcount);
app.delete('/profile/qualification/deleteSkill/:skillId',deleteUserSkill);
app.get('/contactPage/queries/:id',getQueries);
app.post('/verify-password',verifyPassword);
app.post("/contactPage/queries/addQuery",addQuery);
app.get("/subscription/:userid/:subscriptiontype",performSubscription);
app.post("/create-checkout-session",checkout);
app.get('/logout',logout);

app.get('/profile/qualification/skills/:userId',getUserSkills);
app.post('/profile/qualification/addskill',addUserSkills);
app.delete('/profile/qualification/deleteSkill/:skillId',deleteUserSkill);
app.put('/profile/qualification/editskills',editUserSkills);

app.get('/profile/qualification/workExp/:userId',getUserWorkExp);
app.post('/profile/qualification/addWorkExp',addUserWorkExp);
app.put('/profile/qualification/editWorkExp',editUserWorkExp);
app.delete('/profile/qualification/deleteUserWorkExp/:workExpId',deleteUserWorkExp);

app.get('/profile/qualification/certificate/:userId',getUserCertificate);
app.post('/profile/qualification/addCertificate',addUserCertificate);
app.delete('/profile/qualification/deleteUserCertificate/:certifId',deleteUserCertificate)
app.put('/profile/qualification/editUserCertificate',editUserCertification)

app.get('/profile/qualification/licence/:userId',getUserLicence)
app.post('/profile/qualification/addLicence',addUserLicence)
app.delete('/profile/qualification/deleteUserLicence/:licenceId',deleteUserLicence)
app.put('/profile/qualification/editUserLicence',editUserLicence)

app.get('/profile/qualification/education/:userId',getUserEducation);
app.post('/profile/qualification/addEducation',addUserEducation);
app.put('/profile/qualification/editEducation',editUserEducation);
app.delete('/profile/qualification/deleteUserEducation/:eduId',deleteUserEducation);

app.get('/profile/qualification/language/:userId',getUserLanguage);
app.post('/profile/qualification/addLanguage',addUserLanguage);
app.put('/profile/qualification/editLanguage',editUserLanguage);
app.delete('/profile/qualification/deleteUserLanguage/:langId',deleteUserLanguage);


//listen at 300
const startapp = async()=>{
    try{
        await app.listen(process.env.PORT,()=>{
            console.log("App is listening");
        })
    }
    catch(error)
    {
        console.log("Error occured at starting the backend");
    }
}

startapp();
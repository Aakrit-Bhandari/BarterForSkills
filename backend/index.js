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
app.post('/createnewproject',newproject);
app.post('/addprojectentry',newprojectentry);
app.get('/user/:username',userProfile);
app.post('/editproject/:id',editproject);
app.get('/getproject-userdetails/:projectid/:userid',getuserdetails);
app.get('/getprojects-all/:userid',getprojectsbyid);
app.get('/getprojects/:userid',getprojectuserid);
app.get('/getworks',getWorks);
app.get('/getwork/:skill/:barter',getspecialWork);
app.get('/logout',logout);


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
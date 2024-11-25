import Projectsmodel from "../models/Projects.js";
import response from "../response.js";

const getcount = async(req,res)=>{
    const userid = req.userid;
    const userResponse = {...response};
    console.log(userid);
    try{
        const datafetch = await Projectsmodel.find();
        const count = datafetch.map((data)=>data.projectofficials.ideaproviderid === userid).length;
        userResponse.count = count;
        console.log(count);
        return res.status(200).json(userResponse);
    }
    catch(error){
        userResponse.error = error;
        return res.status(500).json(userResponse);
    }
}

export default getcount;
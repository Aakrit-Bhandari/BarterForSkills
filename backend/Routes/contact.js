import contactPageModel from "../models/contactPageSchema.js";
import response from "../response.js"
const getQueries = async(req,res)=>{
    const userResponse = {...response};
    try{
        const queires = await contactPageModel.find();
        if(!queires || queires.length ===0)
        {
            userResponse.message="No queires found ";
            return res.status(404).json({success:false,message:userResponse});
        }
        userResponse.message = "Queires retrieved successfully";
        res.status(200).json({
            success:true,
            message:userResponse,
            data:queires,
        });
    }catch(err)
    {
        userResponse.message="Server error.could not retireve qureies.";
        res.status(500).json({success:false,message:userResponse,error:err.message});
    }
};
const addQuery = async(req,res)=>{
    const userResponse = {...response};
    try{
        const {firstName,lastName,email,phonenumber,message}= req.body;
        const newQuery = new contactPageModel({
            firstName,lastName,email,phonenumber,message,
        });
        const savedQuery = await newQuery.save();
        userResponse.message = "Query Submitted Successfully";
        res.status(201).json({success:true,message:userResponse,data:savedQuery});
    }
    catch(err)
    {
        userResponse.message = "Faliedto submit query. Please check you input."
        res.status(400).json({success:false,message:userResponse,error:err.message});
    }
}
export {getQueries,addQuery};
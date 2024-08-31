import mongoose from "mongoose";

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("Database Connected");
    }
    catch(error)
    {
        console.log("Error at connecting DB",error);
    }
}

export default connectDb;
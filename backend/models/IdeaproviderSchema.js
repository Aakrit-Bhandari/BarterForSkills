import mongoose from "mongoose";

const IdeaproviderSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    usertype:{
        type:String,
        required:true,
        enum:["Freelance","Workprovider"]
    },
    personaldetails:{
        name:{
            type:String,
            required:true
        },
        conatactno:{
            type:Number,
            required:true
        },
        skills:{
            type:[String],
            required:true,
            enum: ["coding","c++","java","frontend","backend","reactjs","nodejs"]
        },
        location:{
            type:String,
            required:true,
            enum: ['Chandigarh','Delhi','Mumbai']
        },
        description:{
            type:String
        },
        linkedinid:{
            type:String
        },
        gender:{
            type:String,
            required:true,
            enum:['male','female','other']
        },
        rating:{
            type:Number,
            enum:[0,1,2,3,4,5],
            required:true,
            default:0
        },
        projectsworkedon:{
            type:Number,
            requried:true,
            default:0
        }
    },
    ideaspresented:[
        {
            projectid:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true});

const IdeaproviderModel = mongoose.model("freelance",IdeaproviderSchema);

export default IdeaproviderModel;
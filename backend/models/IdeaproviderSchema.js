import mongoose from "mongoose"

const IdeaproviderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    usertype:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    personaldetails:{
        name: {
            type:String,
            required: true
        },
        conatactno:{
            type:String,
            required: false,
        },
        skills:{
            type: [String],
            required:false
        },
        location:{
            type:String,
        required: false,
        },
        description:{
            type:String,
        required: false,
        },
        linkedinid:{
            type:String,
        required: true,
        },
        gender:{
            type:String,
        required: true,
        },
        profilephoto:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            default: 0
        }
    },
    projectsworkedon:[
        {
            projectid:{
                type:String,
                required:true
            }
        }
    ],
    projectsworkapplied:[
        {
            projectid:{
                type:String,
                required:true
            }
        }
    ]

},{timestamps:true})

const IdeaproviderModel = mongoose.model("freelance",IdeaproviderSchema);

export default IdeaproviderModel;
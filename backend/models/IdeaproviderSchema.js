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
            required: true,
        },
        skills:{
            type: [String],
            required:true
        },
        location:{
            type:String,
        required: true,
        },
        description:{
            type:String,
        required: true,
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

})

const IdeaproviderModel = mongoose.model("freelance",IdeaproviderSchema);

export default IdeaproviderModel;
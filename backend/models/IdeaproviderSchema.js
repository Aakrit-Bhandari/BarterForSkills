import mongoose from "mongoose"

const WorkExp = new mongoose.Schema({
    title:{type:String,required:false},
    company:{type:String, required:false}
})
const Education = new mongoose.Schema({
    levelofedu:{type:String,required:false},
    fieldofstudy:{type:String,required:false}
})
const Language= new mongoose.Schema({
    langName:{type:String,required:false},
    proficiency:{type:String,enum:["Expert","Fluent","Native","Beginner","Intermediate"],required:false}
})
const Licence = new mongoose.Schema({
    licenceName:{type:String,required:false},
    year:{type:Number,required:true},
})
const Skill = new mongoose.Schema({
    skill:{type:String,required:false},
    experience:{type:Number,required:false}
})
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
    password:{
        type:String,
        required:true
    },
    subscription:{
        type:String,
        required:true,
        enum: ["freelance-basic","freelance-mid","freelance-adv","workprovider-basic","workprovider-mid","workprovider-adv"]
    },
    tasksapplied:{
        type: Number,
        default: 0
    },
    tasksposted:{
        type: Number,
        default: 0
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
        //qualification
        skills:[Skill],
        certification:
        {
            type:[String]
        },
        licence:[Licence],
        language:[Language],
        education:[Education],
        workexperience:[WorkExp],
        //preferences
        jobtitle:
        {
            type:String,
            required:false
        },
        jobtype:{
            type:String,
            enum:["Full-time","Permanent","Fresher","Part-time","Internship","Contractual/Temporary","Freelance","Volunteer"]
        },
        workschedule:{
            days:{
                type:String,
                enum:["Monday to Friday","Weekend availability","weekend only"],
                required:false
            },
            shifts:{
                type:String,
                enum:["Day shifts","Morning shift","Rotational shift","Night shift","Evening shift"],
                required:false
            }
        },
        pay:{
            pay:{
                type:Number,
                required:false
            },
            period:
            {
                type:String,
                enum:["perhour","per day","per week","per month","per year"],
                required:false
            }
        },
        relocation:
        {
            type:Boolean,
            required:false
        },
        remote:
        {
            type:{String},
            enum:["Remote","Hybrid work","In-person","Temporarily remote"]
        },
        //ready to work
        willwork:
        {
            type:Boolean,
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
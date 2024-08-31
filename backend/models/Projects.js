import mongoose from "mongoose";

const Projectschema = new mongoose.Schema({
    projectofficials:{
        ideaproviderid:{
            type: mongoose.Schema.Types.ObjectId,
            required:true
        },
        clientid:{
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        clientsapplied:[
            {
                cliendid:{
                    type: mongoose.Schema.Types.ObjectId,
                    required:true
                }
            }
        ]
    },
    projectdetails:{
        basicidea:{
            type:String,
            required:true
        },
        skillsreq:{
            type: [String],
            required:true,
            enum:["coding"]
        },
        descriptionofidea:{
            type:String,
            required:true
        },
        bartarsystem:{
            type:String,
            required:true,
            enum: ['yes','no']
        },
        estimatedmoney:{
            type:Number,
            default: 0
        },
        negotiable:{
            type:String,
            enum: ['yes','no']
        },
        reqdeadline:{
            type:String,
            enum: ['yes','no']
        },
        deadline:{
            type:String,
            default: "no"
        },
        projectstatusstatus:{
            type:String,
            required:true,
            enum: ['findingpeople','inprogress','completed']
        },
        preferedlocation:{
            type:String,
            required:true,
            enum: ['remote','onsite']
        }
    }
},{timestamps:true});

const Projectsmodel = mongoose.model("freelancedata",Projectschema);

export default Projectsmodel;
import mongoose from "mongoose";

const Projectschema = new mongoose.Schema({
    projectofficials:{
        ideaproviderid:{
            type: mongoose.Schema.Types.ObjectId,
            required:true
        },
        clientid:[
            {
                cliendid:{
                    type: mongoose.Schema.Types.ObjectId,
                    required:true
                }
            }
        ],
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
        position:{
            type:String,
            required:true
        },
        projectdesc:{
            type:String,
            required:true
        },
        yearexp:{
            type: String,
            required:true
        },
        amounttobepaid:{
            type:String,
            required:true
        },
        skillsreq:{
            type:[String],
            required:true
        },
        location:{
            type:String,
            required:true
        },
        bartarsystem:{
            type:String,
            required:true,
            enum: ['yes','no']
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

const Projectsmodel = mongoose.model("projectdata",Projectschema);

export default Projectsmodel;
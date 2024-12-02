import mongoose from "mongoose";
const contactPageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        trim:true,
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"],
        trim:true,
    },
    email:{ 
        type:String,
        required:[true,"Email is required"],
        trim:true,
        validate:{
            validator:function(v){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message:(props)=>`${props.value} is not a valid email!`,
        }
    },
    phonenumber:{
        type:Number,
        required:[true,"Phone number is required"],
        validate:{
            validator:function(v)
            {
                return /^\+?[0-9\s\-()]+$/.test(v);
            },
            message:(props)=>`${props.value} is not a valid phone number!`,
        },
    },
    message:{
        type:String,
        required:[true,"Message is required"],
        minLength:[10,"Message must be at least 10 characters long"],
    },
},{
    timestamps:true
}
);
const contactPageModel = mongoose.model("Queries",contactPageSchema);
export default contactPageModel;
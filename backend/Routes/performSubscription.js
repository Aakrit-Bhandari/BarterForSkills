import response from "../response.js";
import IdeaproviderModel from "../models/IdeaproviderSchema.js";

const performSubscription = async(req,res)=>{
    const {userid,subscriptiontype} = req.params;
    const userResponse = {...response};
    try{
        const findingUser = await IdeaproviderModel.findById(userid);
        if(!findingUser){
            userResponse.message = "User not found";
            userResponse.subscriptionchanged = false;
            return res.status(200).json(userResponse);
        }
        console.log(findingUser.subscription);
        console.log(subscriptiontype);
        findingUser.subscription = subscriptiontype;
        await findingUser.save();
        userResponse.subscriptionchanged = true;
        return res.status(200).json(userResponse);
    }
    catch(error){
        userResponse.error = error;
        userResponse.subscriptionchanged = false;
        return res.status(500).json(userResponse);
    }
}

export default performSubscription;
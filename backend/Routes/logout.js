import response from "../response.js";

const logout = async(req,res)=>{
    const userResponse = {...response};
    try{
        res.clearCookie('freelance_cookie',{
            httpOnly: true,
            sameSite: 'Lax',
            secure: false 
        });
        userResponse.logoutdone = true;
        return res.status(200).json(userResponse);
    }
    catch(error)
    {
        return res.status(500).json(userResponse);
    }
}

export default logout;
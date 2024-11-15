import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate();
    return(
        <>
            <button onClick={()=>navigate('/login/freelance')}>Login as freelance</button><br /><br />
            <button onClick={()=>navigate('/login/workprovider')}>Login as workprovider</button>
        </>
    )
}

export default Login;
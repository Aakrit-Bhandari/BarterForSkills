import axios from "axios";
import React, { useEffect } from "react";

const Projectsadded = ({setprojectdata,setfiltercount,userid})=>{
    useEffect(()=>{
        const getdata = async()=>{
            const projectdata = await axios.get(`http://localhost:5000/getprojects-all/${userid}`,{
                withCredentials:true
            });
            console.log("this time",projectdata);
            if(projectdata.data.projectfound){
                setprojectdata(projectdata.data.projectdatafetched);
            }
        }
        getdata();
    },[])
    return(
        <>
            <div>

            </div>
        </>
    )
}

export default Projectsadded;
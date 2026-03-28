import axios from "axios";
import { useEffect } from "react";

const Projectsadded = ({setprojectdata,setfiltercount,userid})=>{
    useEffect(()=>{
        const getdata = async()=>{
            const projectdata = await axios.get(`https://barter-5cky.onrender.com/getprojects-all/${userid}`,{
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
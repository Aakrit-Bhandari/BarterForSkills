import React, { useEffect, useState } from "react";
import Searchconsole from "../components/Searchconsole";
import Joboption from "../components/Joboption";
import Jobdisplay from "../components/Jobdisplay";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Setsearchbar from "../components/Setsearchbar";

const Welcome = ()=>{
    const navigate = useNavigate();
    const [projectdata,setprojectdata] = useState([]);
    const [filtercount,setfiltercount] = useState(0);

    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });
    //get project data
    useEffect(()=>{
        const getdata = async()=>{
            const projectdata = await axios.get('http://localhost:5000/getworks',{
                withCredentials:true
            });
            if(projectdata.data.projectdatapresent){
                setprojectdata(projectdata.data.projectdatafetched);
            }
        }
        getdata();
    },[])

    console.log(localstoragedata);
    return(
        <>
            <button onClick={()=>navigate(`/add-project/${localstoragedata?.userData?._id}/${localstoragedata?.userData?.username}`)}>add new project temp</button>
            {/* navbar */}
            {/* search console */}
            <Searchconsole setprojectdata={setprojectdata} setfiltercount={setfiltercount}/>
            {/* setsearchbar */}
            <Setsearchbar setprojectdata={setprojectdata} setfiltercount={setfiltercount} userid={localstoragedata?.userData?._id}/>
            <Jobdisplay projectdata={projectdata} filtercount={filtercount}/>
            {/* data for serached */}
            {/* latest data regarding jobs */}
            {/* footer */}
        </>
    )
}

export default Welcome;
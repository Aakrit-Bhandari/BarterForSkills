import React, { useState } from "react";
import axios from "axios";

const Setsearchbar = ({setprojectdata,setfiltercount,userid,setstatus}) => {
    const [activeTab, setActiveTab] = useState("all");

    const onallclick = ()=>{
        setActiveTab("all");
        setstatus("all");
        //get all jobs
        const getdata = async()=>{
            const projectdata = await axios.get('https://barter-5cky.onrender.com/getworks',{
                withCredentials:true
            });
            if(projectdata.data.projectdatapresent){
                //only finding people wors find
                const projectsss = projectdata.data.projectdatafetched.filter(pro=>pro.projectdetails.projectstatusstatus==='findingpeople');
                setprojectdata(projectsss);
                setfiltercount(projectsss.length);
            }
        }
        getdata();
    }

    const onactiveclick = ()=>{
        setActiveTab("applied");
        setstatus("applied");
        //get jobs
        const getdata = async()=>{
            const projectdata = await axios.get(`https://barter-5cky.onrender.com/getprojects/${userid}`,{
                withCredentials:true
            });
            if(projectdata.data.projectfound){
                setprojectdata(projectdata.data.projectapplied);
                setfiltercount(projectdata.data.projectapplied.length);
            }else{
                setprojectdata([]);
                    setfiltercount(0);
            }
        }
        getdata();
    }
    const onshortlisted = async()=>{
        setActiveTab("shortlisted");
        setstatus("shortlisted");
        //get jobs
        const getdata = async()=>{
            const projectdata = await axios.get(`https://barter-5cky.onrender.com/getprojectuseridapplied/${userid}`,{
                withCredentials:true
            });
            if(projectdata.data.projectfound){
                setprojectdata(projectdata.data.projectapplied);
                setfiltercount(projectdata.data.projectapplied.length);
            }else{
                setprojectdata([]);
                setfiltercount(0);
            }
        }
        getdata();
    }

    return (
        <div className="setbar">
            <button
                className={activeTab === "all" ? "active" : ""}
                onClick={onallclick}
            >
                All jobs
            </button>
            <button
                className={activeTab === "applied" ? "active" : ""}
                onClick={onactiveclick}
            >
                Applied jobs
            </button>
            <button
                className={activeTab === "shortlisted" ? "active" : ""}
                onClick={onshortlisted}
            >
                Shortlisted
            </button>
        </div>
    );
};

export default Setsearchbar;

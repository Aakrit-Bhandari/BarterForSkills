import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Joboption = ({data,key,worker,setvisited,setprojectdata,userid,setUser,status,admin})=>{
    const navigate = useNavigate();
    const date = new Date().getDate()-new Date(data.createdAt).getDate();
    const [admindata,setadmindata]= useState(null);
    const performapplytask = async()=>{
        //add that data to the user
        const apply = await axios.get(`http://localhost:5000/apply-project/${userid}/${data?._id}`,{
            withCredentials:true
        });
        if(apply.data.userAlreadyapplied){
            alert("You already applied...");
            return;
        }
        else if(apply.data.userApplied){
            alert("Applied Successfully...");
            return;
        }
        else{
            alert("Some Error occured try again after some time...");
            return;
        }
    }
    const peopleapplied =()=>{

        navigate(`/applied/${userid}/${data._id}/barter4skills/console`);
        return;
    }
    const performedittask = ()=>{
        setvisited(true);
        setprojectdata(data);
    }
    const deleteproject = async()=>{
        const deletingtask = await axios.get(`http://localhost:5000/delete-task/${data._id}`,{
            withCredentials:true
        });
        if(deletingtask.data.projectdeleted){
            alert("Project Deleted Succesfully... Refresh website..");
            return;
        }
        else{
            alert("Some Error occured try after some time");
        }
    }
    useEffect(()=>{
        const getAdmindata = async()=>{
            const useData = await axios.get(`http://localhost:5000/user/${data?.projectofficials?.ideaproviderid}`,{
                withCredentials:true
            })
            if(useData.data.userprofilefound){
                setadmindata(useData.data.userProfiledata);
            }
        }
        getAdmindata();
    },[])
    return(
        <>
            <div className="jobcomponent">
                <div className="datas">
                    <div className="jobshead" style={{marginTop:'3px'}}>
                        <b>{data?.projectdetails?.position}</b><br />
                        <span style={{color:'gray',fontSize:'14px'}}>Barter4Skills</span>
                    </div>
                    <div className="jobsdesc" style={{color:'gray',fontSize:'8px',marginTop:'10px'}}>
                        <div className="data1" style={{marginBottom:'3px',fontSize:'7px'}}>
                            <span style={{fontSize:'14px'}}>{data?.projectdetails?.yearexp}</span>&emsp;| &emsp; <span style={{fontSize:'14px'}}>₹{data.projectdetails?.amounttobepaid}</span>&emsp;| &emsp; <span style={{fontSize:'14px'}}>{data.projectdetails?.location}</span>
                            &emsp;| &emsp; <span style={{fontSize:'14px'}}>Barter: {data.projectdetails?.bartarsystem}</span>
                        </div>
                        <div className="data2" style={{marginBottom:'3px',fontSize:'1px'}}>
                            <span style={{fontSize:'14px'}}>{data.projectdetails?.projectdesc}</span>
                        </div>
                        <div className="data3" style={{marginBottom:'3px',fontSize:'1px'}}>
                            <span style={{fontSize:'13px'}}>Skills: {data.projectdetails?.skillsreq.join(', ')}</span>
                        </div>
                    </div>
                    <div className="jobfoot" style={{color:'gray',fontSize:'8px',marginTop:'14px'}}>
                        <span style={{fontSize:'11px'}}>{date}Days ago</span>
                        <div>
                            
                        </div>
                        {!admin &&worker && status==="all"&& <button onClick={performapplytask}>Apply</button>}
                        {!admin &&worker && status==="applied" && <a href={`mailto:${admindata.email}`}>Client Email Id</a>}
                        {!admin &&worker && status==="shortlisted" && <button onClick={()=>navigate(`/barter4skills/${admindata.username}`)}>Connect</button>}
                        {!admin &&!worker && <div>&emsp;&emsp;&emsp;&emsp;</div>}
                        {!admin &&!worker && <button onClick={performedittask} style={{width:'120px'}}>Edit Project</button>}
                        {!admin &&!worker && <button onClick={peopleapplied} style={{width:'150px'}}>People Applied</button>}
                        {!admin &&!worker && <button onClick={deleteproject} style={{width:'150px'}}>Delete Project</button>}
                        {!admin &&!worker && data?.projectdetails?.projectstatusstatus === 'completed' && <button onClick={()=>navigate(`/rate/${userid}/${data._id}`)}>Rate⭐</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Joboption;
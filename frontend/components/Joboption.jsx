import axios from "axios";
import React from "react"
import { useNavigate } from "react-router-dom";

const Joboption = ({data,key,worker,setvisited,setprojectdata,userid})=>{
    const navigate = useNavigate();
    const date = new Date().getDate()-new Date(data.createdAt).getDate();
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
                            <span style={{fontSize:'14px'}}>{data?.projectdetails?.yearexp}</span>&emsp;| &emsp; <span style={{fontSize:'14px'}}>{data.projectdetails?.amounttobepaid}</span>&emsp;| &emsp; <span style={{fontSize:'14px'}}>{data.projectdetails?.location}</span>
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
                        {worker && <button onClick={performapplytask}>Apply</button>}
                        {!worker && <div>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</div>}
                        {!worker && <button onClick={performedittask} style={{width:'120px'}}>Edit Project</button>}
                        {!worker && <button onClick={peopleapplied} style={{width:'150px'}}>People Applied</button>}
                        {!worker && <button onClick={deleteproject} style={{width:'150px'}}>Delete Project</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Joboption;
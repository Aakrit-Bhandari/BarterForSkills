import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addnewproject = ()=>{
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [localstoragedata, setLocalstoragedata] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("response-userdata")) || {};
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return {};
        }
    });
    const [projectdata, setprojectdata] = useState({
        projectofficials:{
            ideaproviderid: localstoragedata?.userData?._id,
            clientsapplied: []
        },
        projectdetails:{
            position: '',
            projectdesc: '',
            yearexp: '',
            amounttobepaid: '',
            skillsreq: [],
            location: '',
            bartarsystem: '',
            projectstatusstatus: 'findingpeople',
            preferedlocation: ''
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('projectdetails.')) {
            const fieldName = name.split('.')[1];
            setprojectdata((oldData) => ({
                ...oldData,
                projectdetails: {
                    ...oldData.projectdetails,
                    [fieldName]: value
                }
            }));
        } else {
            setprojectdata((oldData) => ({
                ...oldData,
                [name]: value
            }));
        }
    };
    const handleskillsreqChange = (e) => {
        const skillsreqArray = e.target.value.split(',').map(skill => skill.trim());
        setprojectdata((oldData) => ({
            ...oldData,
            projectdetails: {
                ...oldData.projectdetails,
                skillsreq: skillsreqArray
            }
        }));
    };

    const addproject = async(e)=>{
        e.preventDefault();
        try{
            const addProject = await axios.post('http://localhost:5000/createnewproject',projectdata,{
                withCredentials:true
            })
            console.log(addProject);
            if(addProject.data.newprojectadded){
                alert("Project was added successfully... 😃");
                const logic = localstoragedata?.userData?.usertype === 'workprovider'? 'wpd78x':'in23x';
                navigate(`/welcome/${localstoragedata?.userData?.usertype}/${logic}/${localstoragedata?.userData?.username}`);
                return;
            }
            else{
                setErrorMessage("Project was not added... Try again after some time.")
                return;
            }
        }
        catch(error){
            setErrorMessage("Project was not added... Try again after some time.")
        }
    }

    return(
        <>
            {/* navbar */}
            <div className="signup-containe">
            <div className="signup-conten" >
            {/* <div className=""></div> */}
                <div className="add-project">
                    <b className="b">Add New Project</b>
                    <form onSubmit={addproject}>
                        <input type="text" name="projectdetails.position" value={projectdata.projectdetails.position || ''} onChange={handleChange} placeholder="Job Position*" required /><br />
                        <input type="text" name="projectdetails.projectdesc" value={projectdata.projectdetails.projectdesc || ''} placeholder="Project Desc.*" onChange={handleChange} required /><br />
                        <input type="text" placeholder="Year Exp.* i.e. 2-3 years" name="projectdetails.yearexp" value={projectdata.projectdetails.yearexp || ''} onChange={handleChange} required /><br />
                        <input type="text" placeholder="Amount*" name="projectdetails.amounttobepaid" value={projectdata.projectdetails?.amounttobepaid || '₹'} onChange={handleChange} required /><br />
                        <input type="text" placeholder="skillsreq (comma separated)*" onChange={handleskillsreqChange} required /><br />
                        <input type="text" placeholder="Location*" name="projectdetails.location" value={projectdata.projectdetails.location || ''} onChange={handleChange} required /><br />
                        <select name="projectdetails.bartarsystem" value={projectdata.projectdetails.bartarsystem || ''} onChange={handleChange} required style={{marginTop:'10px'}}>
                            <option value="">bartarsystem*</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select><br />
                        <select name="projectdetails.preferedlocation" value={projectdata.projectdetails.preferedlocation || ''} onChange={handleChange} required style={{marginTop:'10px'}}>
                            <option value="">preferedlocation*</option>
                            <option value="remote">Remote</option>
                            <option value="onsite">Onsite</option>
                        </select><br />
                        
                        {errorMessage && <p style={{ color: 'red'}}>{errorMessage}</p>}
                        <button type="submit" style={{marginTop:'10px',height:'30px',width:'50%',}}>Continue</button>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default Addnewproject;
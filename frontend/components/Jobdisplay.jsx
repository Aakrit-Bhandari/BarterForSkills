import React, { useState } from "react";
import Joboption from "./Joboption";
import axios from "axios";

const Jobdisplay = ({projectdata,filtercount,worker,userid})=>{
    const [visited,setvisited] = useState(false);
    const jobsdata = projectdata.length===0?[]:projectdata;
    const [project, setprojectdata] = useState({
        projectofficials:{
            ideaproviderid: userid,
            clientsapplied: []
        },
        projectdetails:{
            position: projectdata.position,
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
    const [errorMessage, setErrorMessage] = useState('');
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
    const performupate = async()=>{
        const updated = await axios.post(`http://localhost:5000/editproject/${project?._id}`,project,{
            withCredentials: true
        })
   }

    return(
        <>
            <div style={{textAlign:'center',marginBottom:'10px'}}>
                {projectdata.length===0 && <span style={{color:'red', fontSize:'13px'}}>0 job results found...</span>}
                {filtercount>0 && <span style={{color:'red', fontSize:'13px'}}>{filtercount} job results found...</span>}<br/>
            </div>
            {/* hidden box for making changes */}
            {visited && 
            <div className="hiddenbox-makingchanges">
                <div className="loginform">
                        <b>Edit Project</b>
                        <form onSubmit={performupate}>
                            <input type="text" name="projectdetails.position" value={project.projectdetails.position || ''} onChange={handleChange} placeholder="Job Position*" required /><br />
                            <input type="text" name="projectdetails.projectdesc" value={project.projectdetails.projectdesc || ''} placeholder="Project Desc.*" onChange={handleChange} required /><br />
                            <input type="text" placeholder="Year Exp.* i.e. 2-3 years" name="projectdetails.yearexp" value={project.projectdetails.yearexp || ''} onChange={handleChange} required /><br />
                            <input type="text" placeholder="Amount*" name="projectdetails.amounttobepaid" value={project.projectdetails?.amounttobepaid || '₹'} onChange={handleChange} required /><br />
                            <input type="text" placeholder="skillsreq (comma separated)*" onChange={handleskillsreqChange} required /><br />
                            <input type="text" placeholder="Location*" name="projectdetails.location" value={project.projectdetails.location || ''} onChange={handleChange} required /><br />
                            <select name="projectdetails.bartarsystem" value={project.projectdetails.bartarsystem || ''} onChange={handleChange} required>
                                <option value="">bartarsystem*</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select><br />
                            <select name="projectdetails.preferedlocation" value={project.projectdetails.preferedlocation || ''} onChange={handleChange} required>
                                <option value="">preferedlocation*</option>
                                <option value="remote">Remote</option>
                                <option value="onsite">Onsite</option>
                            </select><br />
                            <select name="projectdetails.projectstatusstatus" value={project.projectdetails.projectstatusstatus || ''} onChange={handleChange} required>
                                <option value="">Project Status*</option>
                                <option value="findingpeople">Finding People</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select><br />
                            
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <button type="submit">Update</button>
                        </form>
                    </div>
            </div>}
            <div className="jobs">
                {jobsdata.length>0 && jobsdata.map((data,index)=>(
                    <Joboption data={data} key={index} worker={worker} setvisited={setvisited} setprojectdata={setprojectdata} userid={userid}/>
                ))}
            </div>
        </>
    )
}

export default Jobdisplay;
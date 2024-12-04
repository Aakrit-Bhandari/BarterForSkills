import React, { useState } from "react";
import Joboption from "./Joboption";
import axios from "axios";

const Jobdisplay = ({projectdata,filtercount,worker,userid,status})=>{
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
            usertypereq: ''
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
   const handleClose = ()=>{
        setvisited(false);
   }

    return(
        <>
            <div style={{textAlign:'center',marginBottom:'10px'}}>
                {projectdata.length===0 && <span style={{color:'red', fontSize:'13px'}}>0 job results found...</span>}
                {filtercount>0 && <span style={{color:'red', fontSize:'13px'}}>{filtercount} job results found...</span>}<br/>
            </div>
            {/* hidden box for making changes */}
            {visited && 
                <div className="edit-project-modal">
                    <div className="edit-project-form">
                        <b className="edit-project-title">Edit Project</b>
                        <button className="edit-project-close-button" onClick={handleClose}>Close</button>
                        <form onSubmit={performupate}>
                            <input
                                type="text"
                                name="projectdetails.position"
                                value={project.projectdetails.position || ''}
                                onChange={handleChange}
                                placeholder="Job Position*"
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="projectdetails.projectdesc"
                                value={project.projectdetails.projectdesc || ''}
                                onChange={handleChange}
                                placeholder="Project Description*"
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="projectdetails.yearexp"
                                value={project.projectdetails.yearexp || ''}
                                onChange={handleChange}
                                placeholder="Years of Experience* e.g., 2-3 years"
                                required
                            />
                            <br />
                            <input
                                type="number"
                                name="projectdetails.amounttobepaid"
                                value={(project.projectdetails.amounttobepaid) || ''}
                                onChange={handleChange}
                                placeholder="Amount*"
                                required
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="Skills Required (comma-separated)*"
                                value={project.projectdetails?.skillsreq.join(", ") || ''}
                                onChange={handleskillsreqChange}
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="projectdetails.location"
                                value={project.projectdetails.location || ''}
                                onChange={handleChange}
                                placeholder="Location*"
                                required
                            />
                            <br />
                            <select
                                name="projectdetails.bartarsystem"
                                value={project.projectdetails.bartarsystem || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Barter System*</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <br />
                            <select
                                name="projectdetails.usertypereq"
                                value={project.projectdetails.usertypereq || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Preferred Usertype*</option>
                                <option value="freelance">Freelance</option>
                                <option value="intern">Intern</option>
                                <option value="fulltime">Full Time</option>
                            </select>
                            <br />
                            <select
                                name="projectdetails.projectstatusstatus"
                                value={project.projectdetails.projectstatusstatus || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Project Status*</option>
                                <option value="findingpeople">Finding People</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <br />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <br />
                            <button type="submit" className="edit-project-submit-button">Update</button>
                        </form>
                    </div>
                </div>
            }

            <div className="jobs">
                {jobsdata.length>0 && jobsdata.map((data,index)=>(
                    <Joboption data={data} key={index} worker={worker} setvisited={setvisited} setprojectdata={setprojectdata} userid={userid} status={status}/>
                ))}
            </div>
        </>
    )
}

export default Jobdisplay;
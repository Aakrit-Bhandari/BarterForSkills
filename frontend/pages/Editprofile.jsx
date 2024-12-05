import React from "react";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import img from "../public/Images/barter.png"
import "../src/ProfileDetails.css"
import Backbutton from "../components/Backbutton.jsx"
import BackButton from "../components/Backbutton.jsx";

const Editprofile = ()=>{
    const {userId,username} = useParams();
    console.log(username);
    
    const [isModalSkills,setIsModalSkills] = useState(false);
    const [isModalLicence,setisModalLicence]=useState(false);
    const [isModalCertificate,setisModalCertificate]=useState(false);
    const [isModalEducation,setisModalEducation]=useState(false);
    const [isModalLanguage,setisModalLanguage]=useState(false);
    const [isModalWorkExp,setisModalWorkExp] = useState(false);
    //SkillConnect
    const [skills,setSkills] = useState([]);
    const [newSkill,setNewSkill]  = useState("");
    const [experience,setExperience] = useState("");
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    useEffect(()=>{
        const fetchSkills = async()=>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/profile/qualification/skills/${userId}`
                );
                const rawSkills = response.data.datafetched.skills;
                console.log("skills",rawSkills);
                const parsedSkills = rawSkills
                .filter(skill=>skill.skill &&skill.experience)
                .map(skill=>({
                    id:skill._id,
                    skill:skill.skill,
                    experience:skill.experience,
                }))
                setSkills(parsedSkills);
            }
            catch(err)
            {
                alert("error fetching skills",err);
            }
        };
        fetchSkills();
    },[]);
    const addSkill = async()=>{
        if(!newSkill||!experience){alert("Empty skill or exp");return;}
        try{
            console.log(userId);
            const response = await axios.post(
                "http://localhost:5000/profile/qualification/addskill",
                {userId:userId,skill:newSkill,experience}
            );
            console.log(response);
            const addedSkill = {
                id:response.data._id,
                skill:response.data.skill||newSkill,
                experience:response.data.experience||experience,
            };
            // console.log("Api response",response.data);
            alert("Skill added successfully")
            setSkills([...skills,addedSkill]);
            setNewSkill("");
            setExperience("");
        }
        catch(err)
        {
            alert("Error adding skill",err);
        }
    }
    const editSkill = (index) => {
        setCurrentEditIndex(index); 
        const skillToEdit = skills[index];
        setNewSkill(skillToEdit.skill); 
        setExperience(skillToEdit.experience);
    };
    const deleteUserSkill = async(skillId) =>
        {
            console.log("I am here");
            try{
                await axios.delete(`http://localhost:5000/profile/qualification/deleteSkill/${skillId}`,{
                    data:{userId:userId},
                })
                setSkills(skills.filter((skill)=>skill.id!==skillId))
                alert("skill deleted successfulyy");
            }
            catch(err)
            {
                alert("error delete skill:",err);
            }
        }
    const updateSkill = async () => {
        // if(!newSkill||!experience)
        // {
        //     alert("Empty");
        //     return;
        // }
        try {
            const updatedSkills = [...skills]; 
            updatedSkills[currentEditIndex] = { 
                ...updatedSkills[currentEditIndex], 
                skill: newSkill, 
                experience 
            }; 
            setSkills(updatedSkills);
            clearInputs();
            setCurrentEditIndex(null);
    
            await axios.put("http://localhost:5000/profile/qualification/editskills", {
                userId: userId, 
                skills: updatedSkills,
            });
    
            alert("Skills updated successfully!");
        } catch (err) {
            alert("Error updating skills:", err);
        }
    };
    const clearInputs = () => {
        setNewSkill("");
        setExperience("");
    };
    //WorkExpConnect
    const [title,setTitle] = useState([]);
    const [newTitle,setNewTitle] = useState("");
    const [company,setCompany] = useState("");
    useEffect(()=>{
        const fetchWorkExp = async()=>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/profile/qualification/workExp/${userId}`
                );
                setTitle(response.personaldetails.workexperience);
            }
            catch(err)
            {
                console.log("error fetching workexp",err);
            }
        };
        fetchWorkExp();
    },[]);
    const addWorkExp = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:5000/profile/qualification/addWorkExp",
                {userId:userId,title:newTitle,company:company}
            );
            setTitle([...title,response.data]);
            setNewTitle("");
            setCompany("");
        }
        catch(err)
        {
            console.log("Eror adding workexp",err);
        }
    }
    //EducationConnect
    const [education,setEducation] = useState([]);
    const [newEducation,setNewEducation] = useState("");
    const [field,setField] = useState("");
    useEffect(()=>{
        const fetchEducation = async()=>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/profile/qualification/education/${userId}`
                );
                setEducation(response.personaldetails.education);
            }
            catch(err)
            {
                console.log("error fetching education",err);
            }
        };
        fetchEducation();
    },[]);
    const addEducation = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:5000/profile/qualification/addEducation",
                {userId:userId,levelofedu:newEducation,fieldofstudy:field}
            );
            setEducation([...education,response.data]);
            setNewEducation("");
            setField("");
        }
        catch(er)
        {
            console.log("Error adding Education",er);
        }
    }
    //LicenceConnect
    const [licence,setLicence] = useState([]);
    const [newLicence,setNewLicence] = useState("");
    const [year,setYear] = useState("");
    useEffect(()=>{
        const fetchLicence = async()=>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/profile/qualification/licence/${userId}`
                );
                setLicence(response.personaldetails.licence);
            }
            catch(err)
            {
                console.log("error fetching skills",err);
            }
        };
        fetchLicence();
    },[]);
    const addLicence = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:5000/profile/qualification/addLicence",
                {userId:userId,licenceName:newLicence,year:year}
            );
            setLicence([...licence,response.data]);
            setNewLicence("");
            setYear("");
        }
        catch(err)
        {
            console.log("Eror adding Licenec",err);
        }
    }
    //CertificationConnect
    const [certificate,setCertificate] = useState([]);
    const [newCertificate,setNewCertificate] = useState("");
    useEffect(()=>{
        const fetchCertificate = async()=>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/profile/qualification/certificate/${userId}`
                );
                setCertificate(response.personaldetails.certification);
            }
            catch(err)
            {
                console.log("error fetching skills",err);
            }
        };
        fetchCertificate();
    },[]);
    const addCertificate = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:5000/profile/qualification/addCertificate",
                {userId:userId,certificate:newCertificate}
            );
            setCertificate([...certificate,response.data]);
            setNewCertificate("");
        }
        catch(err)
        {
            console.log("Error adding Certificate",err);
        }
    }
    //LanguageConnect
    const [language,setLanguage] = useState([]);
    const [newLanguage,setNewLanguage] = useState("");
    const [fluency,setFluency] = useState("");
    useEffect(()=>{
        const fetchLanguage = async()=>{
            try{
                const response = await axios.get(
                    `http://localhost:5000/profile/qualification/language/${userId}`
                );
                setLanguage(response.personaldetails.language);
            }
            catch(err)
            {
                console.log("error fetching langauge",err);
            }
        };
        fetchLanguage();
    },[]);
    const addLanguage = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:5000/profile/qualification/addLanguage",
                {userId:userId,langName:newLanguage,proficiency:fluency}
            );
            setLanguage([...language,response.data]);
            setNewLanguage("");
            setFluency("");
        }
        catch(err)
        {
            console.log("Error adding Language",err);
        }
    }


    return(
        <>
        <BackButton/>
        <section className="Profile_Qualification_Main Profile_Design">
            
            {isModalSkills && (
                    <div className="Profile_modal-overlay">
                    <div className="Profile_modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="Profile_modal_Heading">Add Skills</h2>
                        <div className="Profile_modal_Inputs">
                            <input type="text" value={newSkill} onChange={(e)=>setNewSkill(e.target.value)} placeholder="Enter your skills" />
                            <input type="number" value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder="Years of Experience"></input>
                        </div>
                        <div className="Profile_modal_display">
                            {skills.map((mp,id)=>(
                                <div key={mp.id} className="Profile_modal_display_flowlist">
                                    <p style={{marginBottom:'0px',color:'purple'}}>{mp.skill} - <span>{mp.experience} years</span></p>
                                    <button onClick={()=>editSkill(id)}>Edit</button>
                                    <button onClick={()=>deleteUserSkill(mp.id)} >Delete</button>
                                </div>
                            ))}
                        </div>
                        <div className="Profile_modal_buttons">
                            {currentEditIndex !== null ? (
                                <button onClick={updateSkill}>Update</button>
                            ) : (
                                <button onClick={addSkill}>Add</button>
                            )}
                            <button onClick={() => setIsModalSkills(false)}>Close</button>
                        </div>
                    </div>
                </div>
                )}
                {isModalCertificate&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onClick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add Certificates</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" onChange={(e)=>setNewCertificate(e.target.value)} placeholder="Enter Certificate" />
                                </div>
                        </div>
                        <div className="Profile_modal_buttons">
                            <button onClick={()=>setisModalCertificate(false)}>Close</button>
                            <button onClick={addCertificate}>Add</button>
                        </div>
                    </div>
                )}
                {isModalLicence&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onCick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add Licence</h2>
                            <div className="Profile_modal_Inputs">
                                <input type="text" onChange={(e)=>setNewLicence(e.target.value)} placeholder="Enter Licence Name" />
                                <input type="number" onChange={(e)=>setYear(e.target.value)} placeholder="Years of Expiry"></input>
                            </div>
                        </div>
                        <div className="Profile_modal_buttons">
                            <button onClick={()=>setisModalLicence(false)}>Close</button>
                            <button onClick={addLicence}>Add</button>
                        </div>
                    </div>
                )}
                {isModalEducation&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onClick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add Education</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" onChange={(e)=>setNewEducation(e.target.value)} placeholder="Level of Education" />
                                    <input type="text" onChange={(e)=>setField(e.target.value)} placeholder="Field of study"></input>
                                </div>
                        </div>
                        <div className="Profile_modal_buttons">
                            <button onClick={()=>setisModalEducation(false)}>Close</button>
                            <button onClick={addEducation} >Add</button>
                        </div>
                    </div>
                )}
                {isModalLanguage&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onClick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add Language</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" onChange={(e)=>setNewLanguage(e.target.value)} placeholder="Language Name" />
                                    <select value={fluency} onChange={(e)=>setFluency(e.target.value)}>
                                        <option>Select</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Native</option>
                                        <option>Fluent</option>
                                        <option>Expert</option>

                                    </select>
                                </div>
                        </div>
                        <div className="Profile_modal_buttons">
                            <button onClick={()=>setisModalLanguage}>Close</button>
                            <button onClick={addLanguage}>Add</button>
                        </div>
                    </div>
                )}
                {isModalWorkExp&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onClick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add WorkExperience</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" onChange={(e)=>setNewTitle(e.target.value)} placeholder="Job title" />
                                    <input type="text" onChange={(e)=>setCompany(e.target.value)}placeholder="Company"></input>
                                </div>
                        </div>
                        <div className="Profile_modal_buttons">
                            <button onClick={()=>setisModalWorkExp(false)}>Close</button>
                            <button onClick={addWorkExp}>Add</button>
                        </div>
                    </div>
                )}
            <div className="Profile_Qualificatoin_ContComp Profile_Desig_Comp">
                <div className="Profile_Design_Heading">
                    <h1 style={{overflow:'hidden'}}>Qualification</h1>
                    <p>We use these details to show you jobs that match your unique skills and experience.</p>
                </div>
                <div className="Profile_Design_Second Profile_Design_cont">
                    <div className="Profile_Design_context">
                        <div className="Profile_fafa_div">
                            <img src={img}/>
                        </div>
                        <h3>Skills</h3>
                    </div>
                    <div className="Profile_Design_context2">
                        <span onClick={()=>setIsModalSkills(true)}>+</span>
                    </div>
                </div>
                <div className="Profile_Design_Third Profile_Design_cont">
                    <div className="Profile_Design_context">
                        <div className="Profile_fafa_div">
                                <img src={img}/>
                        </div>
                        <h3>Add recent work experience</h3>
                    </div>
                    <div className="Profile_Design_context2">
                        <span onClick={()=>setisModalWorkExp(true)}>+</span>
                    </div>
                </div>
                <div className="Profile_Design_Forth Profile_Design_cont">
                    <div className="Profile_Design_context">
                        <div className="Profile_fafa_div">
                            <img src={img}/>
                        </div>
                        <h3>Add education</h3>
                    </div>
                    <div className="Profile_Design_context2">
                        <span onClick={()=>setisModalEducation(true)}>+</span>
                    </div>
                </div>
                <div className="Profile_Design_Fifth Profile_Design_cont">
                    <div className="Profile_Design_context">
                        <div className="Profile_fafa_div">
                            <img src={img}/>
                        </div>
                        <h3>Add licences</h3>
                    </div>
                    <div className="Profile_Design_context2">
                        <span onClick={()=>setisModalLicence(true)}>+</span>
                    </div>
                </div>
                <div className="Profile_Design_Sixth Profile_Design_cont">
                    <div className="Profile_Design_context">
                        <div className="Profile_fafa_div">
                            <img src={img}/>
                        </div>
                        <h3>Add certifications</h3>
                    </div>
                    <div className="Profile_Design_context2">
                        <span onClick={()=>setisModalCertificate(true)}>+</span>
                    </div>
                </div>
                <div className="Profile_Design_Seventh Profile_Design_cont">
                    <div className="Profile_Design_context">
                        <div className="Profile_fafa_div">
                            <img src={img}/>
                        </div>
                        <h3>Add languages</h3>
                    </div>
                    <div className="Profile_Design_context2">
                        <span onClick={()=>setisModalLanguage(true)}>+</span>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Editprofile;
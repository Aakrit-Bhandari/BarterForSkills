import React from "react";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import img from "../Images/barter.png"
import "../src/ProfileDetails.css"
// import Backbutton from "../components/Backbutton.jsx"
import BackButton from "../components/Backbutton.jsx";

const Editprofile = ()=>{
    const {userId,username} = useParams();
    
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
                    `https://barter-5cky.onrender.com/profile/qualification/skills/${userId}`
                );
                const rawSkills = response.data.datafetched.skills;
                // console.log("skills",rawSkills);
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
            const response = await axios.post(
                "https://barter-5cky.onrender.com/profile/qualification/addskill",
                {userId:userId,skill:newSkill,experience}
            );
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
            try{
                await axios.delete(`https://barter-5cky.onrender.com/profile/qualification/deleteSkill/${skillId}`,{
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
            setCurrentEditIndex(null);
    
            await axios.put("https://barter-5cky.onrender.com/profile/qualification/editskills", {
                userId: userId, 
                skills: updatedSkills,
            });
    
            alert("Skills updated successfully!");
        } catch (err) {
            alert("Error updating skills:", err);
        }
    };
    //WorkExpConnect
    const [title,setTitle] = useState([]);
    const [newTitle,setNewTitle] = useState("");
    const [company,setCompany] = useState("");
    const [currentEditWorkIndex,setCurrentWorkIndex] = useState(null);
    useEffect(()=>{
        const fetchWorkExp = async()=>{
            try{
                console.log("userid",userId);
                const response = await axios.get(
                   `https://barter-5cky.onrender.com/profile/qualification/workExp/${userId}`
                );
                console.log("response",response);
                const rawWorkExp = response.data.datafetched.workexperience;
                const parsedWorkExp = rawWorkExp
                .filter (workexp=>workexp.title&&workexp.company)
                .map(workexp=>({
                    id:workexp._id,
                    title:workexp.title,
                    company:workexp.company
                }))
                setTitle(parsedWorkExp);
            }
            catch(err)
            {
                alert("error fetching workexp",err);
            }
        };
        fetchWorkExp();
    },[]);
    const addWorkExp = async()=>{
        if(!newTitle||!company){alert("Empty title or company");return;}
        try{
            const response = await axios.post(
                "https://barter-5cky.onrender.com/profile/qualification/addWorkExp",
                {userId:userId,title:newTitle,company:company}
            );
            const addedWorkExp = {
                id:response.data._id,
                title:response.data.title||newTitle,
                company:response.data.company||company
            }
            alert("WorkExp added Successfully");
            setTitle([...title,addedWorkExp]);
            setNewTitle("");
            setCompany("");
        }
        catch(err)
        {
            console.log("Eror adding workexp",err);
        }
    }
    const editWorkExp = (index)=>{
        setCurrentWorkIndex(index);
        const workExpToEdit = title[index];
        setNewTitle(workExpToEdit.title);
        setCompany(workExpToEdit.company);
    }
    const updateWorkExp = async()=>{
        if(!newTitle||!company)
        {
            alert("Empty title to company");
            return;
        }
        try{
            const updatedWorkExp = [...title];
            updatedWorkExp[currentEditWorkIndex] = {
                ...updateWorkExp[currentEditWorkIndex],
                title:newTitle,
                company
            };
            setTitle(updatedWorkExp);
            setNewTitle("");
            setCompany("");
            setCurrentEditIndex(null);
            await axios.put("https://barter-5cky.onrender.com/profile/qualification/editWorkExp",{
                userId:userId,
                title:updatedWorkExp
            });
            alert("Work experience updated successfully!");
        }catch(err)
        {
            alert("Error updating work Experience:",err);
        }
    }
    const deleteWorkExp = async(workExpId)=>{
        try{
            await axios.delete(`https://barter-5cky.onrender.com/profile/qualification/deleteUserWorkExp/${workExpId}`,{
                data:{userId:userId}
            });
            setTitle(title.filter((workExp)=>workExp.id!==workExpId));
            alert("Work Experience deleted Successfully!");
        }catch(err)
        {
            alert("Error deleting work experience:",err);
        }
    };
    //EducationConnect
    const [education,setEducation] = useState([]);
    const [newEducation,setNewEducation] = useState("");
    const [field,setField] = useState("");
    const [currentEditEducation,setCurrentEditEducation] = useState(null);
    useEffect(()=>{
        const fetchEducation = async()=>{
            try{
                const response = await axios.get(
                    `https://barter-5cky.onrender.com/profile/qualification/education/${userId}`
                );
                const rawEducation = response.data.datafetched.education;
                const parsedEducation = rawEducation
                .filter(edu=>edu.levelofedu&&edu.fieldofstudy)
                .map(edu=>({
                    id:edu._id,
                    levelofedu:edu.levelofedu,
                    fieldofstudy:edu.fieldofstudy,
                }))
                console.log(parsedEducation);
                setEducation(parsedEducation);
            }
            catch(err)
            {
                alert("error fetching education",err);
            }
        };
        fetchEducation();
    },[]);
    const addEducation = async()=>{
        if(!newEducation||!field){
            alert("ERROR ADD EDUCATION");
            return;
        }
        try{
            const response = await axios.post(
                "https://barter-5cky.onrender.com/profile/qualification/addEducation",
                {userId:userId,levelofedu:newEducation,fieldofstudy:field}
            );
            const addedEdu = {
                id:response.data._id,
                levelofedu:response.data.levelofedu||newEducation,
                fieldofstudy:response.data.fieldofstudy||field,
            };
            alert("Education addded")
            setEducation([...education,addedEdu]);
            setNewEducation("");
            setField("");
        }
        catch(er)
        {
            alert("Error adding Education",er);
        }
    }
    const editEducation = (index)=>{
        setCurrentEditEducation(index);
        const educationToEdit = education[index];
        setNewEducation(educationToEdit.levelofedu);
        setField(educationToEdit.fieldofstudy);
    }
    const updateEducation = async()=>{
        try{
            const updatedEducation = [...education];
            updatedEducation[currentEditEducation]={
                ...updateEducation[currentEditEducation],
                levelofedu:newEducation,
                fieldofstudy:field,
            };
            setEducation(updatedEducation);
            setNewEducation("");
            setField("");
            setCurrentEditEducation(null);
            await axios.put("https://barter-5cky.onrender.com/profile/qualification/editEducation",{
                userId:userId,
                updatedEducation,
            })
            alert("Education updated successfully!");
        }
        catch(err){
            alert("Error updating education");
        }
    }
    const deleteUserEducation = async(eduId)=>{
        try{
            await axios.delete(`https://barter-5cky.onrender.com/profile/qualification/deleteUserEducation/${eduId}`,{
                data:{userId:userId}
            });
            setEducation(education.filter((ed)=>ed.id!==eduId));
            alert("Education deleted Successfully");
        }
        catch(err)
        {
            alert("Error deleting edu:",err);
        }
    };
    //LicenceConnect
    const [licence,setLicence] = useState([]);
    const [newLicence,setNewLicence] = useState("");
    const [year,setYear] = useState("");
    const [currentEditLicence,setCurrentLicenceIndex] = useState(null);
    useEffect(()=>{
        const fetchLicence = async()=>{
            try{
                const response = await axios.get(
                   ` https://barter-5cky.onrender.com/profile/qualification/licence/${userId}`
                );
                const rawLicence = response.data.datafetched.licence;
                const parsedLicence = rawLicence
                .filter(licence=>licence.licenceName&&licence.year)
                .map(licence=>({
                    id:licence._id,
                    licencename:licence.licenceName,
                    year:licence.year
                }))
                setLicence(parsedLicence);
            }
            catch(err)
            {
                alert("error fetching skills",err);
            }
        };
        fetchLicence();
    },[]);
    const addLicence = async()=>{
        if(!newLicence||!year){
            alert("ERROR Add licence");
            return
        }
        try{
            const response = await axios.post(
                "https://barter-5cky.onrender.com/profile/qualification/addLicence",
                {userId:userId,licenceName:newLicence,year:year}
            );
            const addedLicence = {
                id:response.data._id,
                licencename:response.data.licenceName||newLicence,
                year:response.data.year||year,
            }
            setLicence([...licence,addedLicence]);
            setNewLicence("");
            setYear("");
        }
        catch(err)
        {
            alert("Eror adding Licenec",err);
        }
    }
    const editLicence = (index)=>{
        setCurrentLicenceIndex(index);
        const licenceToEdit = licence[index];
        setNewCertificate(licenceToEdit.licenceName);
    }
    const updateLicence = async()=>{
        try{
            const updatedLicence = [...licence];
            updatedLicence[currentEditLicence]={
                ...updateLicence[currentEditLicence],
                licencename:newLicence,
                year:year,
            }
            setLicence(updatedLicence);
            setNewLicence("");
            setYear("");
            setCurrentLicenceIndex(null);
            await axios.put("https://barter-5cky.onrender.com/profile/qualification/editLanguage",{
              userId:userId,
              licence:updatedLicence,
            });
            alert("Licence Updated Successfully!");

        }
        catch(err)
        {
            alert("Error Updating licence");
        }
    }
    const deleteUserLicence = async(licenceId)=>{
        try{
            await axios.delete(`https://barter-5cky.onrender.com/profile/qualification/deleteUserLicence/${licenceId}`,{
                data:{userId:userId}
            })
            setLicence(licence.filter((licence)=>licence.id!==licenceId));
            alert("Licence deleted");
        }
        catch(err)
        {
            alert("Error deleting licence",err);
        }
    }
    //CertificationConnect
    const [certificate,setCertificate] = useState([]);
    const [newCertificate,setNewCertificate] = useState("");
    const [currentEditCertifIndex,setCurrCertifIndex] = useState(null);
    useEffect(()=>{
        const fetchCertificate = async()=>{
            try{
                const response = await axios.get(
                    `https://barter-5cky.onrender.com/profile/qualification/certificate/${userId}`
                );
                const rawCertif = response.data.datafetched.certification;
                const parsedCertif = rawCertif
                .filter(certif=>certif.certificate)
                .map(certif=>({
                    id:certif._id,
                    certificate:certif.certificate
                }))
                setCertificate(parsedCertif);
            }
            catch(err)
            {
                alert("error fetching skills",err);
            }
        };
        fetchCertificate();
    },[]);
    const addCertificate = async()=>{
        if(!newCertificate){alert(" ERRORR Addsomthing");return;}
        try{
            const response = await axios.post(
                "https://barter-5cky.onrender.com/profile/qualification/addCertificate",
                {userId:userId,certificate:newCertificate}
            );
            const addedCertificate = {
                id:response.data._id,
                certificate:response.data.certification||newCertificate
            }
            alert("Cerficiation added");
            setCertificate([...certificate,addedCertificate]);
            setNewCertificate("");
        }
        catch(err)
        {
            alert("Error adding Certificate",err);
        }
    }
    const editCertificate = (index)=>{
        setCurrCertifIndex(index);
        const certifToEdit = certificate[index];
        setNewCertificate(certifToEdit.certificate);
    }
    const updateCertificate = async()=>{
        try{
            const updatedCertificate = [...certificate];
            updatedCertificate[currentEditCertifIndex] = {
                ...updateCertificate[currentEditWorkIndex],
                certificate:newCertificate
            };
            setCertificate(updatedCertificate);
            setNewCertificate("");
            setCurrCertifIndex(null);
            await axios.put('https://barter-5cky.onrender.com/profile/qualification/editUserCertificate',{
                userId:userId,
                certificate:updatedCertificate
            });
            alert("Certificate updated Succefully!");
        }
        catch(err)
        {
            alert("error UPDATED successfully")
        }
    }
    const deleteCerificate = async(certifId)=>{
        console.log(certifId);
        try{
            await axios.delete(`https://barter-5cky.onrender.com/profile/qualification/deleteUserCertificate/${certifId}`,{
                data:{userId:userId}
            });
            setCertificate(certificate.filter((certif)=>certif.id!==certifId));
            alert("Certificate deleted")
        }catch(error)
        {
            alert("Error deleting Certificate",error);
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
                    `https://barter-5cky.onrender.com/profile/qualification/language/${userId}`
                );
                const rawLanguage = response.data.datafetched.language;
                const parsedLanguage = rawLanguage
                .filter(lang=>lang.langName&&lang.proficiency)
                .map(lang=>({
                    id:lang._id,
                    langName:lang.langName,
                    proficiency:lang.proficiency
                }))
                setLanguage(parsedLanguage);
            }
            catch(err)
            {
                alert("error fetching langauge",err);
            }
        };
        fetchLanguage();
    },[]);
    const addLanguage = async()=>{
        if(!newLanguage||!fluency){alert("ERROR addsomething");return;}
        try{
            const response = await axios.post(
                "https://barter-5cky.onrender.com/profile/qualification/addLanguage",
                {userId:userId,langName:newLanguage,proficiency:fluency}
            );
            const addedLanguage ={
                id:response.data._id,
                langName:response.data.langName||newLanguage,
                proficiency:response.data.proficiency||fluency
            }
            alert("Language added");
            setLanguage([...language,addedLanguage]);
            setNewLanguage("");
            setFluency("");
        }
        catch(err)
        {
            alert("Error adding Language",err);
        }
    }
    const deleteLanugage = async(langId)=>{
        try{
            await axios.delete(`https://barter-5cky.onrender.com/profile/qualification/deleteUserLanguage/${langId}`,{
                data:{userId:userId}
            });
            setLanguage(language.filter((lang)=>lang.id!==langId));
            alert("language deleted");
        }
        catch(err)
        {
            alert("Error deleting language",err);
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
                            <input type="number" value={Math.abs(experience)} onChange={(e)=>setExperience(e.target.value)} placeholder="Years of Experience"></input>
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
                                    <input type="text" value={newCertificate} onChange={(e)=>setNewCertificate(e.target.value)} placeholder="Enter Certificate" />
                                </div>
                                <div className="Profile_modal_display">
                                    {certificate.map((mp,id)=>(
                                        <div key={mp.id} className="Profile_modal_display_flowlist">
                                            <p style={{marginBottom:'0px',color:'purple'}}>{mp.certificate}</p>
                                            <button onClick={()=>editCertificate(id)}>Edit</button>
                                            <button onClick={()=>deleteCerificate(mp._id)}>Delete</button>
                                        </div>
                                    ))}
                                </div>
                                <div className="Profile_modal_buttons">
                                    {currentEditCertifIndex!==null?(
                                        <button onClick={updateCertificate}>Update</button>
                                    ):(
                                        <button onClick={addCertificate}>Add</button>
                                    )}
                                    <button onClick={()=>setisModalCertificate(false)}>Close</button>
                                </div>
                        </div>
                    </div>
                )}
                {isModalLicence&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onCick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add Licence</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" value={newLicence} onChange={(e)=>setNewLicence(e.target.value)} placeholder="Enter Licence Name" />
                                    <input type="number" value={Math.abs(year)} onChange={(e)=>setYear(e.target.value)} placeholder="Years of Expiry"></input>
                                </div>
                                <div className="Profile_modal_display">
                                {licence.map((mp,id)=>(
                                    <div key={mp.id} className="Profile_modal_display_flowlist">
                                        <p style={{marginBottom:'0px',color:'purple'}}>{mp.licencename}-{mp.year}</p>
                                        <button onClick={()=>editLicence(id)}>Edit</button>
                                        <button onClick={()=>deleteUserLicence(mp.id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                            <div className="Profile_modal_buttons">
                                {currentEditLicence!==null?(
                                    <button onClick={updateLicence}>Update</button>
                                ):(
                                    <button onClick={addLicence}>Add</button>
                                )}
                                <button onClick={()=>setisModalLicence(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
                {isModalEducation&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onClick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add Education</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" value={newEducation} onChange={(e)=>setNewEducation(e.target.value)} placeholder="Level of Education" />
                                    <input type="text" value={field} onChange={(e)=>setField(e.target.value)} placeholder="Field of study"></input>
                                </div>
                                <div className="Profile_modal_display">
                                {education.map((mp,id)=>(
                                    <div key={mp.id} className="Profile_modal_display_flowlist">
                                        <p style={{marginBottom:'0px',color:'purple'}}>{mp.levelofedu}-{mp.fieldofstudy}</p>
                                        <button onClick={()=>editEducation(id)}>Edit</button>
                                        <button onClick={()=>deleteUserEducation(mp.id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                            <div className="Profile_modal_buttons">
                                {currentEditEducation!==null?(
                                    <button onClick={updateEducation}>Update</button>
                                ):(
                                    <button onClick={addEducation}>Add</button>
                                )}
                                <button onClick={()=>setisModalEducation(false)}>Close</button>
                            </div>
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
                                        <option value="">Select</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Native">Native</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                        </div>
                        <div className="Profile_modal_display">
                            {language.map((lang,id)=>(
                                <div key={lang.id} className="Profile_modal_display_flowlist">
                                    <p style={{marginBottom:'0px',color:'purple'}}>{lang.langName}-{lang.proficiency}</p>
                                    <button onClick={()=>deleteLanugage(lang.id)}>delete</button>
                                </div>
                            ))}
                        </div>
                        <div className="Profile_modal_buttons">
                            <button onClick={()=>setisModalLanguage(false)}>Close</button>
                            <button onClick={addLanguage}>Add</button>
                        </div>
                    </div>
                )}
                {isModalWorkExp&&(
                    <div className="Profile_modal-overlay">
                        <div className="Profile_modal_content" onClick={(e)=>e.stopPropagation()}>
                            <h2 className="Profile_modal_Heading">Add WorkExperience</h2>
                                <div className="Profile_modal_Inputs">
                                    <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Job title" />
                                    <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company"></input>
                                </div>
                            <div className="Profile_modal_display">
                                {title.map((mp,id)=>(
                                    <div key={mp.id} className="Profile_modal_display_flowlist">
                                        <p style={{marginBottom:'0px',color:'purple'}}>{mp.title}-{mp.company}</p>
                                        <button onClick={()=>editWorkExp(id)}>Edit</button>
                                        <button onClick={()=>deleteWorkExp(mp.id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                            <div className="Profile_modal_buttons">
                                {currentEditWorkIndex!==null?(
                                    <button onClick={updateWorkExp}>Update</button>
                                ):(
                                    <button onClick={addWorkExp}>Add</button>
                                )}
                                <button onClick={()=>setisModalWorkExp(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            <div className="Profile_Qualificatoin_ContComp Profile_Desig_Comp">
                <div className="Profile_Design_Heading">
                    <h1 style={{overflow:'hidden'}}>Additional Details</h1>
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
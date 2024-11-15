import axios from "axios";
import React, { useState } from "react";

const Searchconsole = ({ setprojectdata,setfiltercount }) => {
    const [filtervalue, setfiltervalue] = useState({
        skills: [],
        exp: '',
        barter: ''
    });

    const performfilter = async () => {
        const filterjobs = await axios.get(`http://localhost:5000/getwork/${filtervalue.skills[0]}/${filtervalue.barter}`,{
            withCredentials:true
        });
        if(filterjobs.data.projectdatapresent){
            setprojectdata(filterjobs.data.projectdatafetched);
            setfiltercount(filterjobs.data.projectdatafetched.length);
        }
        else{
            setprojectdata([]);
            setfiltercount(0);
        }
    }

    const handlechange = (e) => {
        setfiltervalue((olddata) => ({
            ...olddata,
            [e.target.name]: e.target.value // Update filter value for experience
        }));
    };

    const handleskillchange = (e) => {
        const skillsdata = e.target.value.split(',').map(item => item.trim());
        setfiltervalue((olddata) => ({
            ...olddata,
            skills: skillsdata
        }));
    };

    return (
        <div className="search-console">
            <div className="search">
                <input
                    type="text"
                    placeholder="Enter skills keywords separated by commas i.e. c++, java"
                    style={{ width: '50%' }}
                    onChange={handleskillchange}
                />
                <select name="exp" onChange={handlechange} style={{width:'18%'}}>
                    <option value="">Select experience</option>
                    <option value="fresher">Fresher</option>
                    <option value="0-1">0-1 year</option>
                    <option value="2-3">2-3 years</option>
                    <option value="3-4">3-4 years</option>
                    <option value="4-5">4-5 years</option>
                </select>
                <select name="barter" onChange={handlechange} style={{width:'9%'}}>
                    <option value="*">Barter</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <button onClick={performfilter}>Search</button>
            </div>
        </div>
    );
}

export default Searchconsole;

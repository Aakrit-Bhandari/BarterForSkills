import axios from "axios";
import React, { useState } from "react";

const Searchconsole = ({ setprojectdata, setfiltercount }) => {
    const [filtervalue, setfiltervalue] = useState({
        skills: [],
        exp: '',
        barter: ''
    });

    const performfilter = async () => {
        // Validate required fields
        if (filtervalue.skills.length <= 0) {
            alert("Skill type/ Job type needs to be specified");
            return;
        }
        if (!filtervalue.exp) {
            alert("Experience type needs to be selected");
            return;
        }
        if (!filtervalue.barter) {
            alert("Barter preference needs to be selected");
            return;
        }

        try {
            // Send the API request
            const filterjobs = await axios.get(
                `https://barter-5cky.onrender.com/getwork/${filtervalue.skills[0]}/${filtervalue.exp}/${filtervalue.barter}`,
                {
                    withCredentials: true
                }
            );

            // Update the project data and filter count
            if (filterjobs.data.projectdatapresent) {
                setprojectdata(filterjobs.data.projectdatafetched);
                setfiltercount(filterjobs.data.projectdatafetched.length);
            } else {
                setprojectdata([]);
                setfiltercount(0);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            alert("An error occurred while fetching jobs. Please try again later.");
        }
    };

    const handlechange = (e) => {
        setfiltervalue((olddata) => ({
            ...olddata,
            [e.target.name]: e.target.value // Update filter value for experience or barter
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
                    placeholder="Enter skills keywords separated by commas i.e. c++, java or Position i.e. Software eng."
                    style={{ width: '50%' }}
                    onChange={handleskillchange}
                />
                <select name="exp" onChange={handlechange} style={{ width: '18%' }}>
                    <option value="">Select type*</option>
                    <option value="intern">Intern</option>
                    <option value="freelance">Freelance</option>
                    <option value="fulltime">Full time</option>
                </select>
                <select name="barter" onChange={handlechange} style={{ width: '9%' }}>
                    <option value="">Barter*</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <button onClick={performfilter}>Search</button>
            </div>
        </div>
    );
}

export default Searchconsole;

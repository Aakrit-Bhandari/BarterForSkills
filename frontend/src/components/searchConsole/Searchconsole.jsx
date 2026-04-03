import  { useState } from "react";
import { GET_SINGLE_WORK_URL, TYPE_GET } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";

const Searchconsole = ({ setprojectdata, setfiltercount }) => {
  const [filtervalue, setfiltervalue] = useState({
    skills: [],
    exp: "",
    barter: "",
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
      // const filterjobs = await axios.get(
      // `https://barter-5cky.onrender.com/getwork/${filtervalue.skills[0]}/${filtervalue.exp}/${filtervalue.barter}`,
      // {
      // withCredentials: true
      // }
      // );
      const options = { withCredentials: true };
      const filterJobsData = await pokeBarterForSkillsServer(
        `${GET_SINGLE_WORK_URL}/${filtervalue.skills[0]}/${filtervalue.exp}/${filtervalue.barter}`,
        options,
        TYPE_GET,
      );

      // Update the project data and filter count
      if (filterJobsData.projectdatapresent) {
        setprojectdata(filterJobsData.projectdatafetched);
        setfiltercount(filterJobsData.projectdatafetched.length);
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
      [e.target.name]: e.target.value, // Update filter value for experience or barter
    }));
  };

  const handleskillchange = (e) => {
    const skillsdata = e.target.value.split(",").map((item) => item.trim());
    setfiltervalue((olddata) => ({
      ...olddata,
      skills: skillsdata,
    }));
  };

  return (
    <div className="search-console">
      <div className="search">
        <input
          type="text"
          placeholder="Enter Job Position/skills*"
          style={{ width: "50%" }}
          onChange={handleskillchange}
        />
        <select name="exp" onChange={handlechange} style={{ width: "18%" }}>
          <option value="">Select type*</option>
          <option value="intern">Intern</option>
          <option value="freelance">Freelance</option>
          <option value="fulltime">Full time</option>
        </select>
        <select name="barter" onChange={handlechange} style={{ width: "9%" }}>
          <option value="">Barter*</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button onClick={performfilter}>Search</button>
      </div>
    </div>
  );
};

export default Searchconsole;

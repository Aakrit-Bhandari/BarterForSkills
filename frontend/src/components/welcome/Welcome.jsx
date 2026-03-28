import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Jobdisplay from "../jobDisplay/Jobdisplay";
import EmployeeNavbar from "../navbars/EmployeeNavbar";
import Searchconsole from "../searchConsole/Searchconsole";
import Setsearchbar from "../setSearchBar/Setsearchbar";
import SetWorkprovderbar from "../setWorkProviderBar/SetWorkprovderbar";

const Welcome = () => {
  const navigate = useNavigate();
  const [projectdata, setprojectdata] = useState([]);
  const [filtercount, setfiltercount] = useState(0);

  const [uploadprojects, setuploaded] = useState([]);
  const [uploadcount, setuploadcount] = useState(0);

  const [status, setstatus] = useState("all");

  const [worker, setworker] = useState(true);

  const [localstoragedata, setLocalstoragedata] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("response-userdata")) || {};
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {};
    }
  });
  //get project data
  useEffect(() => {
    const getdata = async () => {
      const projectdata = await axios.get(
        // "https://barter-5cky.onrender.com/getworks",
        "http://localhost:3000/getworks",
        {
          withCredentials: true,
        },
      );
      if (projectdata.data.projectdatapresent) {
        //only finding people wors find
        const projectsss = projectdata.data.projectdatafetched.filter(
          (pro) => pro.projectdetails.projectstatusstatus === "findingpeople",
        );
        setprojectdata(projectsss);
      }
    };
    getdata();
  }, []);

  const performlogout = async () => {
    const logout = await axios.get("http://localhost:3000/logout", {
      // const logout = await axios.get("https://barter-5cky.onrender.com/logout", {
      withCredentials: true,
    });
    if (logout.data.logoutdone) {
      localStorage.removeItem("response-userdata");
      navigate("/");
    } else {
      alert("Logout not done... Some Error occured..");
    }
  };

  return (
    <div className="welcome-box">
      {/* <button onClick={performlogout}>Logout</button> */}
      {localstoragedata?.userData?.usertype === "freelance" && (
        <div>
          <EmployeeNavbar
            userdata={localstoragedata}
            performlogout={performlogout}
          />
          <Searchconsole
            setprojectdata={setprojectdata}
            setfiltercount={setfiltercount}
          />
          <Setsearchbar
            setprojectdata={setprojectdata}
            setfiltercount={setfiltercount}
            userid={localstoragedata?.userData?._id}
            setstatus={setstatus}
          />
          <Jobdisplay
            projectdata={projectdata}
            filtercount={filtercount}
            worker={worker}
            userid={localstoragedata?.userData?._id}
            status={status}
          />
        </div>
      )}
      {localstoragedata?.userData?.usertype === "workprovider" && (
        <div>
          <EmployeeNavbar
            userdata={localstoragedata}
            performlogout={performlogout}
            worker={worker}
          />
          {/* display jobs that are posted by this user */}
          {/* <Projectsadded setprojectdata={setuploaded} setfiltercount={setuploadcount} userid={localstoragedata?.userData?._id}/> */}
          <SetWorkprovderbar
            setprojectdata={setuploaded}
            setfiltercount={setuploadcount}
            userid={localstoragedata?.userData?._id}
          />
          <Jobdisplay
            projectdata={uploadprojects}
            filtercount={uploadcount}
            worker={!worker}
            userid={localstoragedata?.userData?._id}
          />
        </div>
      )}
    </div>
  );
};

export default Welcome;

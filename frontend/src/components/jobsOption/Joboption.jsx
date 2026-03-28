import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Joboption = ({
  data,
  userid,
  appliedpage,
  ratepage,
  worker,
  setvisited,
  setprojectdata,
  admin,
}) => {
  const navigate = useNavigate();
  const date = new Date().getDate() - new Date(this.data.createdAt).getDate();
  const [admindata, setadmindata] = useState(null);
  const performapplytask = async () => {
    //add that data to the user
    const apply = await axios.get(
      // `https://barter-5cky.onrender.com/apply-project/${userid}/${data?._id}`,
      `http://localhost:3000/apply-project/${userid}/${data?._id}`,
      {
        withCredentials: true,
      },
    );
    if (apply.data.userAlreadyapplied) {
      alert("You already applied...");
      return;
    } else if (apply.data.planmaxreach) {
      alert(
        "You reached max amount to apply. Upgrade to Pro Premium for unlimited jobs apply.",
      );
      return;
    } else if (apply.data.userApplied) {
      alert("Applied Successfully...");
      return;
    } else {
      alert("Some Error occured try again after some time...");
      return;
    }
  };
  const peopleapplied = () => {
    navigate(`/applied/${userid}/${this.data._id}/barter4skills/console`);
    return;
  };
  const performedittask = () => {
    setvisited(true);
    setprojectdata(data);
  };
  const deleteproject = async () => {
    const deletingtask = await axios.get(
      // `https://barter-5cky.onrender.com/delete-task/${data._id}/${userid}`,
      `http://localhost:3000/delete-task/${data._id}/${userid}`,
      {
        withCredentials: true,
      },
    );
    if (deletingtask.data.projectdeleted) {
      alert("Project Deleted Succesfully... Refresh website..");
      return;
    } else {
      alert("Some Error occured try after some time");
    }
  };
  useEffect(() => {
    const getAdmindata = async () => {
      console.log("thisdata", this.data?.projectofficials?.ideaproviderid);
      const useData = await axios.get(
        // `https://barter-5cky.onrender.com/user/${data?.projectofficials?.ideaproviderid}`,
        `http://localhost:3000/user/${data?.projectofficials?.ideaproviderid}`,
        {
          withCredentials: true,
        },
      );
      console.log("useData", useData);
      if (useData.data.userprofilefound) {
        setadmindata(useData.data.userProfiledata);
        console.log("admindata", admindata);
      }
    };
    getAdmindata();
  }, []);
  return (
    <>
      <div className="jobcomponent">
        <div className="datas">
          <div className="jobshead" style={{ marginTop: "3px" }}>
            <b>{this.data?.projectdetails?.position}</b>
            <br />
            <span style={{ color: "gray", fontSize: "14px" }}>
              Barter4Skills
            </span>
          </div>
          <div
            className="jobsdesc"
            style={{ color: "gray", fontSize: "8px", marginTop: "10px" }}
          >
            <div
              className="data1"
              style={{ marginBottom: "3px", fontSize: "7px" }}
            >
              <span style={{ fontSize: "14px" }}>
                {this.data?.projectdetails?.yearexp}
              </span>
              &emsp;| &emsp;{" "}
              <span style={{ fontSize: "14px" }}>
                ₹{this.data.projectdetails?.amounttobepaid}
              </span>
              &emsp;| &emsp;{" "}
              <span style={{ fontSize: "14px" }}>
                {this.data.projectdetails?.location}
              </span>
              &emsp;| &emsp;{" "}
              <span style={{ fontSize: "14px" }}>
                Barter: {this.data.projectdetails?.bartarsystem}
              </span>
              &emsp;| &emsp;{" "}
              <span style={{ fontSize: "14px" }}>
                Usertype req: {this.data.projectdetails?.usertypereq}
              </span>
            </div>
            <div
              className="data2"
              style={{ marginBottom: "3px", fontSize: "1px" }}
            >
              <span style={{ fontSize: "14px" }}>
                {this.data.projectdetails?.projectdesc}
              </span>
            </div>
            <div
              className="data3"
              style={{ marginBottom: "3px", fontSize: "1px" }}
            >
              <span style={{ fontSize: "13px" }}>
                Skills: {this.data.projectdetails?.skillsreq.join(", ")}
              </span>
            </div>
          </div>
          <div
            className="jobfoot"
            style={{ color: "gray", fontSize: "8px", marginTop: "14px" }}
          >
            <span style={{ fontSize: "11px" }}>{date}Days ago</span>
            <div></div>
            {!ratepage && !admin && worker && status === "all" && (
              <button onClick={performapplytask}>Apply</button>
            )}
            {!ratepage && !admin && worker && status === "applied" && (
              <a href={`mailto:${admindata?.email}`}>Client Email Id</a>
            )}
            {!ratepage && !admin && worker && status === "shortlisted" && (
              <button
                onClick={() =>
                  navigate(`/barter4skills/${admindata?.username}`)
                }
              >
                Connect
              </button>
            )}
            {!ratepage && !admin && !worker && (
              <div>&emsp;&emsp;&emsp;&emsp;</div>
            )}
            {!ratepage && !appliedpage && !admin && !worker && (
              <button onClick={performedittask} style={{ width: "120px" }}>
                Edit Project
              </button>
            )}
            {!ratepage && !appliedpage && !admin && !worker && (
              <button onClick={peopleapplied} style={{ width: "150px" }}>
                People Applied
              </button>
            )}
            {!ratepage && !appliedpage && !admin && !worker && (
              <button onClick={deleteproject} style={{ width: "150px" }}>
                Delete Project
              </button>
            )}
            {!ratepage &&
              !admin &&
              !worker &&
              this.data?.projectdetails?.projectstatusstatus ===
                "completed" && (
                <button
                  onClick={() => navigate(`/rate/${userid}/${this.data._id}`)}
                >
                  Rate⭐
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Joboption;

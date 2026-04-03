import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../backButton/Backbutton.jsx";

export default function Addnewproject() {
  const initialState = {
    projectofficials: {
      ideaproviderid: localstoragedata?.userData?._id,
      clientsapplied: [],
    },
    projectdetails: {
      position: "",
      projectdesc: "",
      yearexp: "",
      amounttobepaid: "",
      skillsreq: [],
      location: "",
      bartarsystem: "",
      projectstatusstatus: "findingpeople",
      usertypereq: "",
    },
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [state, dispatch] = useReducer(changeState, initialState);
  const navigate = useNavigate();
  const [localstoragedata, setLocalstoragedata] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("response-userdata")) || {};
    } catch (error) {
      console.error(error);
      return {};
    }
  });

  const changeState = (state, action) => {
    switch (action.type) {
      case "pD.position":
        return {
          ...state,
          projectdetails: { ...state.projectdetails, position: action.payload },
        };
      case "pD.projectDesc":
        return {
          ...state,
          projectdetails: {
            ...state.projectdetails,
            projectdesc: action.payload,
          },
        };
      case "pD.yearExp":
        return {
          ...state,
          projectdetails: { ...state.projectdetails, yearexp: action.payload },
        };
      case "pD.amountToBePaid":
        return {
          ...state,
          projectdetails: {
            ...state.projectdetails,
            amounttobepaid: action.payload,
          },
        };
      case "pD.skillsReq": {
        const skillsReqArray = action.payload
          .split(",")
          .map((skill) => skill.trim());
        return {
          ...state,
          projectdetails: {
            ...state.projectdetails,
            skillsreq: skillsReqArray,
          },
        };
      }
      case "pD.location":
        return {
          ...state,
          projectdetails: { ...state.projectdetails, location: action.payload },
        };
      case "pD.bartarSystem":
        return {
          ...state,
          projectdetails: {
            ...state.projectdetails,
            bartarsystem: action.payload,
          },
        };
      case "pD.userTypeReq":
        return {
          ...state,
          projectdetails: {
            ...state.projectdetails,
            usertypereq: action.payload,
          },
        };
      default:
        return state;
    }
  };

  const addproject = async (e) => {
    e.preventDefault();
    try {
      const addProject = await axios.post(
        // `https://barter-5cky.onrender.com/createnewproject/${localstoragedata?.userData?._id}`,
        `http://localhost:3000/createnewproject/${localstoragedata?.userData?._id}`,
        state,
        {
          withCredentials: true,
        },
      );
      // console.log(addProject);
      if (addProject.data.planmaxreach) {
        alert(
          "You reached max amount to apply. Upgrade to Pro Premium for unlimited jobs postings.",
        );
        return;
      }
      if (addProject.data.newprojectadded) {
        alert("Project was added successfully... 😃");
        const logic =
          localstoragedata?.userData?.usertype === "workprovider"
            ? "wpd78x"
            : "in23x";
        navigate(
          `/welcome/${localstoragedata?.userData?.usertype}/${logic}/${localstoragedata?.userData?.username}`,
        );
        return;
      } else {
        setErrorMessage("Project was not added... Try again after some time.");
        return;
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Project was not added... Try again after some time.");
    }
  };

  return (
    <>
      <Backbutton />
      <div className="signup-containe">
        <div className="signup-conten">
          <div className="add-project">
            <b className="b">Add New Project</b>
            <form onSubmit={addproject}>
              <input
                type="text"
                name="projectdetails.position"
                value={initialState.projectdetails.position || ""}
                onChange={(e) =>
                  dispatch({ type: "pD.position", payload: e.target.value })
                }
                placeholder="Job Position*"
                required
              />
              <br />
              <input
                type="text"
                name="projectdetails.projectdesc"
                value={initialState.projectdetails.projectdesc || ""}
                placeholder="Project Desc.*"
                onChange={(e) =>
                  dispatch({ type: "pD.projectDesc", payload: e.target.value })
                }
                required
              />
              <br />
              <input
                type="text"
                placeholder="Year Exp.* i.e. 2-3 years"
                name="projectdetails.yearexp"
                value={initialState.projectdetails.yearexp || ""}
                onChange={(e) =>
                  dispatch({ type: "pD.yearExp", payload: e.target.value })
                }
                required
              />
              <br />
              <input
                type="Number"
                placeholder="Amount*"
                name="projectdetails.amounttobepaid"
                value={initialState.projectdetails?.amounttobepaid || "₹"}
                onChange={(e) =>
                  dispatch({
                    type: "pD.amountToBePaid",
                    payload: e.target.value,
                  })
                }
                required
              />
              <br />
              <input
                type="text"
                placeholder="skillsreq (comma separated)*"
                onChange={(e) =>
                  dispatch({ type: "pD.skillsReq", payload: e.target.value })
                }
                value={initialState.projectdetails?.skillsreq.join(", ") || ""}
                required
              />
              <br />
              <input
                type="text"
                placeholder="Location*"
                name="projectdetails.location"
                value={initialState.projectdetails.location || ""}
                onChange={(e) =>
                  dispatch({ type: "pD.location", payload: e.target.value })
                }
                required
              />
              <br />
              <select
                name="projectdetails.bartarsystem"
                value={initialState.projectdetails.bartarsystem || ""}
                onChange={(e) =>
                  dispatch({ type: "pD.bartarSystem", payload: e.target.value })
                }
                required
                style={{ marginTop: "10px" }}
              >
                <option value="">bartarsystem*</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <br />
              <select
                name="projectdetails.usertypereq"
                value={initialState.projectdetails.usertypereq || ""}
                onChange={(e) =>
                  dispatch({ type: "pD.userTypeReq", payload: e.target.value })
                }
                required
                style={{ marginTop: "10px" }}
              >
                <option value="">preferedusertype*</option>
                <option value="freelance">Freelance</option>
                <option value="fulltime">Full Time</option>
                <option value="intern">Intern</option>
              </select>
              <br />

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  style={{
                    marginTop: "10px",
                    height: "30px",
                    width: "50%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(92, 92, 255)",
                  }}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

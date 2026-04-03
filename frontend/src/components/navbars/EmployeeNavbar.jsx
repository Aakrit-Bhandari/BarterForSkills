import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/barter.png";
import { UserStore } from "../../store/UserStore";
export default function EmployeeNavbar({ worker }) {
  const navigate = useNavigate();
  const { userData, performLogout } = useContext(UserStore);
  // const handleSelectChange = (e) => {
  //   const selectedValue = e.target.value;
  //   if (selectedValue === "Employer") {
  //     navigate("/recruiter");
  //   }
  // };
  return (
    <section className="NavEmp_Page_Main_Container">
      <div className="NavEmp_Page_Main_ContComp">
        <div className="NavEmp_Page_Logo_Industry">
          <div className="NavEmp_Page_Logo">
            <img
              src={logo}
              alt="Company_logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            ></img>
          </div>
          <div className="NavEmp_Page_Industry">
            {/* {worker && <span style={{color:'purple'}}><span style={{color:'black'}}>{data?.subscription === "workprovider-basic" ? "Basic" : (data?.subscription === "workprovider-mid")?"Premium":"Pro Premium"}</span></span>}
                        {!worker&&<span style={{color:'purple'}}>{data?.subscription === "freelance-basic" ? "Basic" : (data?.subscription === "freelance-mid")?"Premium":"Pro Premium"}</span>} */}
            &emsp;&emsp;
            <span
              onClick={() =>
                navigate(
                  `/subscription/${userData.usertype}/wpd78x/${userData.username}/${userData?._id}`,
                )
              }
            >
              Subscription
            </span>
          </div>
        </div>
        {/* this is the second protion */}
        <div className="NavEmp_Page_Registration">
          <div className="NavEmp_Page_Buttons">
            {userData ? (
              <>
                <span>
                  Welcome{" "}
                  <b style={{ color: "purple" }}>{userData?.username}😊</b>
                </span>
                <img
                  src={userData.userData.personaldetails.profilephoto}
                  alt=""
                  onClick={() =>
                    navigate(`/barter4skills/${userData.username}`)
                  }
                  style={{
                    borderRadius: "150px",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </>
            ) : null}
          </div>
          <div
            className="NavEmp_Page_Register"
            style={{ width: worker ? "300px" : "200px" }}
          >
            {
              <button
                className="NavPage_buttons"
                onClick={() =>
                  navigate(`/editprofile/${userData._id}/${userData.username}`)
                }
              >
                Edit Profile
              </button>
            }
            {worker && (
              <button
                className="NavPage_buttons"
                onClick={() =>
                  navigate(`/add-project/${userData._id}/${userData.username}`)
                }
              >
                Add Task
              </button>
            )}
            <button onClick={() => performLogout()} className="NavPage_buttons">
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

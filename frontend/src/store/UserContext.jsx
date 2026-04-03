import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CHECK_TOKEN_URL, LOGOUT_URL, TYPE_GET } from "../fetchers/constants";
import { pokeBarterForSkillsServer } from "../fetchers/fetchers";
import {
  FREELANCER,
  SERVE_FREELANCE_URL,
  SERVE_WORKPROVIDER_URL,
  WORKPROVIDER,
} from "./paths";
import { UserStore, initialState } from "./UserStore";

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialState);
  const location = useLocation();
  const navigate = useNavigate();
  //Fetch user Data everyTime

  const options = {
    withCredentials: true,
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchData = await pokeBarterForSkillsServer(
        CHECK_TOKEN_URL,
        options,
        TYPE_GET,
      );
      if (fetchData.tokenalreadypresent) {
        if (fetchData.userData.userData.usertype === FREELANCER) {
          setUserData(fetchData.userData);
          navigate(`${SERVE_FREELANCE_URL}${fetchData.userData.username}`);
        } else if (fetchData.userData.userData.usertype === WORKPROVIDER) {
          setUserData(fetchData.userData);
          navigate(`${SERVE_WORKPROVIDER_URL}${fetchData.userData.username}`);
        }
      } else {
        if (![FREELANCER, WORKPROVIDER, "/"].includes(location.pathname)) {
          navigate("/login");
        }
      }
    };
    fetchUserData();
  }, []);

  const performLogout = async () => {
    // const logout = await axios.get("http://localhost:3000/logout", {
    //   // const logout = await axios.get("https://barter-5cky.onrender.com/logout", {
    //   withCredentials: true,
    // });
    const options = { withCredentials: true };
    const logoutData = await pokeBarterForSkillsServer(
      LOGOUT_URL,
      options,
      TYPE_GET,
    );
    if (logoutData.logoutdone) {
      navigate("/");
    } else {
      alert("Logout not done... Some Error occured..");
    }
  };

  return (
    <UserStore.Provider value={{ userData, performLogout }}>
      {children}
    </UserStore.Provider>
  );
};

export default UserProvider;

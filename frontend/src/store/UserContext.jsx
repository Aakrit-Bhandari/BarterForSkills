import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CHECK_TOKEN_URL, TYPE_GET } from "../fetchers/constants";
import { pokeBarterForSkillsServer } from "../fetchers/fetchers";
import {
  FREELANCER,
  LOGIN_FREELANCE_URL,
  LOGIN_WORKPROVIDER_URL,
  SERVE_FREELANCE_URL,
  SERVE_WORKPROVIDER_URL,
  WORKPROVIDER,
} from "./paths";
import { UserStore, initialState } from "./UserStore";

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialState);
  const location = useLocation();
  const navigate = useNavigate();
  //Fetch user Data everyTime
  const options = {
    withCredentials: true,
  };
  useEffect(() => {
    const fetchUserData = pokeBarterForSkillsServer(
      `${CHECK_TOKEN_URL},${options},${TYPE_GET}`,
    );
    if (fetchUserData.tokenalreadypresent) {
      if (
        location.pathname === LOGIN_FREELANCE_URL &&
        fetchUserData.userData.userData.usertype === FREELANCER
      ) {
        navigate(`${SERVE_FREELANCE_URL}${fetchUserData.userData.username}`);
      } else if (
        location.pathname === LOGIN_WORKPROVIDER_URL &&
        fetchUserData.userData.userData.usertype === WORKPROVIDER
      ) {
        navigate(`${SERVE_WORKPROVIDER_URL}${fetchUserData.userData.username}`);
      }
      setUserData(...userData, fetchUserData.userData);
    } else {
      if (![FREELANCER, WORKPROVIDER, "/"].includes(location.pathname)) {
        navigate("/login");
      }
    }
    fetchUserData();
  }, []);

  return <UserStore.Provider value={userData}>{children}</UserStore.Provider>;
};

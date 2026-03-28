import { createContext } from "react";

export const initialState = {
  username: "",
  usertype: "",
  email: "",
  subscription: "",
  presonalDetails: {
    name: "",
    contactno: "",
    skills: [],
    willwork: "",
    location: "",
    description: "",
    linkedinid: "",
    gender: "",
    rating: "",
    profilephoto: "",
    projectsworkedon: [],
    projectsworkapplied: [],
  },
};

export const UserStore = createContext(initialState);

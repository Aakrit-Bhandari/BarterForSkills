import { createContext } from "react";

// export const initialState = {
//   createdAt:"",
//   username: "",
//   usertype: "",
//   email: "",
//   subscription: "",
//   presonalDetails: {
//     name: "",
//     contactno: "",
//     skills: [],
//     willwork: "",
//     location: "",
//     description: "",
//     linkedinid: "",
//     gender: "",
//     rating: "",
//     profilephoto: "",
//     projectsworkedon: [],
//     projectsworkapplied: [],
//   },
// };
export const initialState = {
  id: "",
  username: "",
  email: "",
  userData: {
    username: "",
    usertype: "",
    email: "",
    password: "",
    subscription: "",
    tasksapplied: 0,
    tasksposted: 0,
    personaldetails: {
      name: "",
      conatactno: "",
      skills: [],
      location: "",
      description: "",
      linkedinid: "",
      gender: "",
      profilephoto: "",
      certification: [],
      licence: [],
      language: [],
      education: [],
      workexperience: [],
      rating: 0,
    },
    projectsworkedon: [],
    projectsworkapplied: [],
    createdAt: "",
    updatedAt: "",
  },
  iat: "",
  exp: "",
};

export const UserStore = createContext({
  userData: initialState,
  performLogout: async () => {},
});

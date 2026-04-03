import { createRoot } from "react-dom/client";
import UserProvider from "./store/UserContext.jsx";

import App from "./App.jsx";
import "./index.css";

//importing broweser routes for routing
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
);

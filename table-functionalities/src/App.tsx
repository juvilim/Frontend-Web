import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./App.css";
import Breadcrumbs from "./components/Breadcrumbs";
import { ROUTES } from "./constants";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="App">
      <Breadcrumbs pathname={pathname} navigate={navigate} />
      <button
        className="navigate-button"
        onClick={() => navigate(ROUTES.find((route) => route.name === "example").path)}
      >
        Go to Example page
      </button>
    </div>
  );
}

export default App;

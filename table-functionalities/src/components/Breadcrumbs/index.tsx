import * as React from "react";
import { NavigateFunction } from "react-router-dom";

import { GITHUB_REPO_PATH, ROUTES } from "../../constants";

import "./style.css";

interface Props {
  pathname: string;
  navigate: NavigateFunction;
}

const Breadcrumbs = ({ pathname, navigate }: Props) => {
  const currentPath = pathname.replace(GITHUB_REPO_PATH, "");
  const data = currentPath.startsWith("/") ? currentPath.split("/") : [currentPath];

  return (
    <nav>
      <ol className="breadcrumbs-ol">
        {data.map((item, index) => {
          const name = item || "home";
          return (
            <React.Fragment key={index}>
              <li onClick={() => navigate(ROUTES.find((route) => route.name === name).path)}>
                {name} {index === data.length - 1 ? " Page" : ""}
              </li>
              {index !== data.length - 1 && <li>/</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

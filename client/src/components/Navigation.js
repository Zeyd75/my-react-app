import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/players"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Players</li>
        </NavLink>
        <NavLink
          to="/clubs"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Clubs</li>
        </NavLink>
        <NavLink
          to="/nations"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Nations</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;

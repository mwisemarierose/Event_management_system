import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNavLink({ to, name, onClick, children, ...props }) {
  return (
    <li
      className="mb-8  hover:text-black transition-all group-hover:transition-all"
      {...props}
    >
      <NavLink
        onClick={onClick}
        to={to}
        end
        className={(navData) => {
          if (navData.isActive) {
            return "flex flex-row font-bold text-black";
          }
          return "flex flex-row text-secondary";
        }}
      >
        {children}
        <span className="text-base ">{name}</span>
      </NavLink>
    </li>
  );
}

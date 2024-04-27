import React, { useState, useEffect } from "react";
import {
  ChartPieIcon,
  LogoutIcon,
  UserIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import { CogIcon, ChatIcon } from "@heroicons/react/outline";
import SideNavLink from "./SideNavLink";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ style, toggle }) => {
  const [togglei, setTogglei] = useState(false);
  const user = localStorage.getItem("userData");
  const dt = JSON.parse(user);
  console.log(dt.role);
  const navigate = useNavigate();
  useEffect(() => {}, [togglei]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className={`${style} flex-col fixed h-[100%] pt-[3vh] lg:pt-[5vh] bg-white border-r p-2`}
    >
      <div className="list-none pr-8">
        <SideNavLink onClick={toggle} name="Dashboard" to="/dashboard/">
          <ChartPieIcon className="w-5 mr-2 " />
        </SideNavLink>
        {dt.role === "admin" ? (
          <SideNavLink
            onClick={toggle}
            name="allEvents"
            to="/dashboard/allEvents"
          >
            <CurrencyDollarIcon className="w-5 mr-2" />
          </SideNavLink>
        ) : (
          <SideNavLink onClick={toggle} name="My events" to="/dashboard/myevents">
            <ChatIcon className="w-5 mr-2" />
          </SideNavLink>
        )}
        <SideNavLink to="/dashboard/settings" name="setting">
          <CogIcon className="w-5 hover:text-primary " onClick={toggle} />
        </SideNavLink>
        <button
          onClick={handleLogout}
          name="Logout"
          to=""
          className=" flex flex-row "
        >
          <LogoutIcon className="w-5 mr-2 " />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../page/Dashboard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AllEvents from "../page/AllEvents";
import MyEvents from "../page/MyEvents";
import CreateEvent from "../page/CreateEvent";
import UpdateEvent from "../page/UpdateEvent";
import Reschedule from "../page/Reschedule";

const DashboardRoutes = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-20">
        <Sidebar toggle={handleClick} style="hidden lg:flex" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/allEvents" element={<AllEvents />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:id" element={<UpdateEvent />} />
          <Route path="/reschedule/:id" element={<Reschedule />} />
        </Routes>
      </div>
    </>
  );
};

export default DashboardRoutes;

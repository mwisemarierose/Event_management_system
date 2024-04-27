import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import DataTable from "../components/DataTable";
import { AiOutlineSend } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";

const AllEvents = () => {
  const token = localStorage.getItem("token");
  const [events, setEvents] = useState([]);

const deleteEvent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      getAllEvents();
    } catch (error) {
      console.log("err", error);
    }
}


  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Availability",
      accessor: "ticketAvailability",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-4">
          <Link
            to={`/dashboard/edit-event/${row.original._id}`}
            className="text-red-500 hover:text-red-700"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              // Perform delete action here
              deleteEvent(row.original._id);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const getAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/event/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.data);
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row">
          <div className="lg:ml-56 min-h-screen bg-[#F9F9FB] mt-[90px] w-[90%]">
            <div className="flex items-left px-1 lg:px-50 pt-8 pb-8">
              <div className="space-x-8 lg:ml-7">
                <Link
                  to="/dashboard/create-event"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryHover "
                >
                  <AiOutlineSend className="text-white w-6 mt-1 -ml-2" />
                  Create Event
                </Link>
              </div>
            </div>
            <div className="m-4 md:m-1 mt-10">
              {events?.length > 0 ? (
                <DataTable
                  data={events}
                  columns={columns}
                  title="All Events"
                  placeholder=""
                />
              ) : (
                <>
                  <h3>No Events</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEvents;

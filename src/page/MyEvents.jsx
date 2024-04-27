import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const MyEvents = () => {
  const token = localStorage.getItem("token");
  const [myEvents, setMyEvents] = useState([]);

  const cancelBooking = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/booking/cancel/${id}`, {
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
      Header: "Number of Tickets",
      accessor: "numTickets",
    },
    {
      Header: "Event Date",
      accessor: "event.date", 
      Cell: ({ value }) => moment(value).format("MMM Do YY")
    },
    {
      Header: "Event Title",
      accessor: "event.title", 
    },
    {
      Header: "Event Location",
      accessor: "event.location", 
    },
    {
      Header: "Action",
      accessor: "", // No need for accessor as it's not directly from data
      Cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => {
              // Perform cancel action here
              cancelBooking(row.original._id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            Cancel
          </button>
          <Link
            to={`/dashboard/reschedule/${row.original._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Reschedule
          </Link>
        </div>
      ),
    },
  ];
  
  const getAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/booking/mybooking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyEvents(response.data.booking);
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
            <div className="m-4 md:m-1 mt-10">
              {myEvents?.length > 0 ? (
                <DataTable
                  data={myEvents}
                  columns={columns}
                  title="My Events"
                  placeholder=""
                />
              ) : (
                <>
                  <h3>No Events right now start make booking</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEvents;

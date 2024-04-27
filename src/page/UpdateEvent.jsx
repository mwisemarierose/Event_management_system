import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateEvent = () => {
  const {id }= useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState({});
  const [date, setDate] = useState({});
  const [location, setLocation] = useState({});
  const [ticketAvailability, setTicketAvailability] = useState({});
  const [description, setDescription] = useState({});

  const onTitleChange = (e) => {
    var title = e.target.value;
    if (title != {}) {
      setTitle({ value: title });
    } else {
      setTitle({ value: title, message: "Write Title" });
    }
  };

  const onDateChange = (e) => {
    var date = e.target.value;
    if (date != "") {
      setDate({ value: date });
    } else {
      setDate({ value: date, message: "Write Date" });
    }
  };
  const onLocationChange = (e) => {
    var location = e.target.value;
    if (location != "") {
      setLocation({ value: location });
    } else {
      setLocation({ value: location, message: "Write Location" });
    }
  };
  const onTicketAvailabilityChange = (e) => {
    var ticketAvailability = e.target.value;
    if (ticketAvailability != "") {
      setTicketAvailability({ value: ticketAvailability });
    } else {
      setTicketAvailability({
        value: ticketAvailability,
        message: "Write Ticket Availability",
      });
    }
  };
  const onDescriptionChange = (e) => {
    var description = e.target.value;
    if (description != "") {
      setDescription({ value: description });
    } else {
      setDescription({ value: description, message: "Write Description" });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (title.value === undefined || title.value === "") {
      setTitle({ message: "Title is required" });
    } else if (date.value === undefined || date.value === "") {
      setDate({ message: "Date is required" });
    } else if (location.value === undefined || location.value === "") {
      setLocation({ message: "Location is required" });
    } else if (
      ticketAvailability.value === undefined ||
      ticketAvailability.value === ""
    ) {
      setTicketAvailability({ message: "Ticket Availability is required" });
    } else if (description.value === undefined || description.value === "") {
      setDescription({ message: "Description is required" });
    } else {
      const data = {
        title: title.value,
        date: date.value,
        location: location.value,
        ticketAvailability: ticketAvailability.value,
        description: description.value,
      };
      try {
        setLoading(true);
        const response = await axios.put(
          `http://localhost:3000/api/event/${id}`,
          data,
        );
        console.log(response.data);
        toast.success("Event Update successfully");
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error) {
          toast.error("An error occurred");
        } else {
          toast.error("An error occurred");
        }
      }
    }
  };

  return (
    <div className={`w-full px-4 flex justify-center items-center`}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="bg-white dark:bg-dark-bg w-full sm:w-3/4  xl:w-4/12 rounded-lg p-4 pb-8">
        <div className="card-title w-full flex flex-wrap justify-center items-center">
          <h3 className="font-bold text-2xl dark:text-black text-center w-full">
            Update Event
          </h3>
          <hr className=" bg-primary border-b my-3 w-full" />
        </div>
        <div className="card-body">
          <form className="py-3 px-1" onSubmit={handleSubmitForm}>
            <div className="input">
              <label className="mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                onChange={onTitleChange}
                className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
              {title.message && (
                <span className="text-red-500 text-xs italic">
                  {title.message}
                </span>
              )}
            </div>
            <div className="input mt-3">
              <label className="mb-2">date</label>
              <input
                type="text"
                placeholder="enter date in format 2021/12/31"
                onChange={onDateChange}
                required
                className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {date.message && (
                <span className="text-red-500 text-xs italic">
                  {date.message}
                </span>
              )}
            </div>
            <div className="input mt-3">
              <label className="mb-2">Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                onChange={onLocationChange}
                required
                className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {location.message && (
                <span className="text-red-500 text-xs italic">
                  {location.message}
                </span>
              )}
            </div>
            <div className="input mt-3">
              <label className="mb-2">ticketAvailability</label>
              <input
                type="number"
                placeholder="Enter number of tickets available"
                onChange={onTicketAvailabilityChange}
                required
                className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {ticketAvailability.message && (
                <span className="text-red-500 text-xs italic">
                  {ticketAvailability.message}
                </span>
              )}
            </div>
            <div className="input mt-3">
              <label className="mb-2">Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                onChange={onDescriptionChange}
                required
                className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {description.message && (
                <span className="text-red-500 text-xs italic">
                  {description.message}
                </span>
              )}
            </div>
            <div className="w-full mt-2 flex justify-center items-center">
              <button
                className="w-full md:w-full flex justify-center font-sans group relative py-2 px-4 border
                  text-lg font-medium rounded-md text-black border-primary bg-white hover:bg-[blue]
                  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DA091F] mt-4"
                type="submit"
              >
                {loading ? "loading..." : "Update Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;

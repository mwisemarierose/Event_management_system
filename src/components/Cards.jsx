import React, { useState } from "react";
import { BsCalendarEvent, BsMapFill, BsTicketFill } from "react-icons/bs";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingleService = ({ event }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [numTickets, setNumTickets] = useState({});
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userData");
  const userdData = JSON.parse(user);
  const [loading, setLoaading] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onChangeNumTickects = (e) => {
    var numTickets = e.target.value;
    if (numTickets != "") {
      setNumTickets({ value: numTickets });
    } else {
      setNumTickets({ value: numTickets, message: "Write num tickets" });
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
   
    if (!token && !userdData) {
      toast.success("You have to login first!!");
    } else if (numTickets.value === undefined || numTickets.value === "") {
      setNumTickets({ message: "Write num tickets" });
    } else {
      const payload = {
        numTickets: numTickets.value, // Access the value property of numTickets object
      };
      try {
        setLoaading(true);
        const res = await axios.post(
          `http://localhost:3000/api/booking/${event._id}`, // Access the _id property of the event object
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/dashboard/myevents");
        console.log(res.data);
        // Check if booking was successful
        if (res.data) {
          toast.success("Booking successful!");
          // Close the modal after booking
          closeModal();
        }
      } catch (error) {
        // Handle errors
        console.error("Booking failed:", error);
        toast.error("Booking failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex bg-white p-6 rounded-lg transition-transform duration-300 relative w-auto h-96 items-left text-left flex-col shadow-xl hover:scale-105">
      <h4 className="text-2xl font-bold mb-4 text-black">{event.title}</h4>
      <p className="text-gray-500 mb-4">{event.description}</p>
      <div className="flex items-center mb-2 text-gray-500">
        <BsCalendarEvent className="mr-2" />
        <span>
          <p>{moment(event.date).format("MMM Do YY")}</p>
        </span>
      </div>
      <div className="flex items-center mb-2 text-gray-500">
        <BsMapFill className="mr-2" />
        <span>{event.location}</span>
      </div>
      <div className="flex items-center mb-4 text-gray-500">
        <BsTicketFill className="mr-2" />
        <span>Tickets available: {event.ticketAvailability}</span>
      </div>
      <button
        onClick={openModal}
        className="text-gray-500 hover:text-blue-600 transition-colors duration-300 absolute bottom-4 right-4 bg-blue-400 rounded-md px-4 py-2 text-white font-bold hover:bg-blue-500 transition-all duration-300"
      >
        Book Now
      </button>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-300 group-hover:w-full"></div>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
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
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal Content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Book Event Tickets
                    </h3>
                    <div className="mt-5">
                      <label
                        htmlFor="numTickets"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of Tickets
                      </label>
                      <input
                        type="number"
                        id="numTickets"
                        name="numTickets"
                        className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                        onChange={onChangeNumTickects}
                      />
                      {numTickets.message && (
                        <span className="text-red-500 text-xs italic">
                          {numTickets.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleBooking}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {loading ? "loading..." : " Book Tickets"}
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleService;

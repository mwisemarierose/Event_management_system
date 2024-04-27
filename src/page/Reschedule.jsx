import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Reschedule = () => {
  const {id }= useParams();
  const [numTickets, setNumTickets] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const onNumTicketsChange = (e) => {
    var numTickets = e.target.value;
    if (numTickets != {}) {
        setNumTickets({ value: numTickets });
    } else {
        setNumTickets({ value: numTickets, message: "Write Title" });
    }
  };



  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (numTickets.value === undefined || numTickets.value === "") {
        setNumTickets({ message: "Title is required" });
    } else {
      const data = {
        numTickets: numTickets.value,
      };
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:3000/api/booking/reschedule/${id}`,
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
            Reschedule Event
          </h3>
          <hr className=" bg-primary border-b my-3 w-full" />
        </div>
        <div className="card-body">
          <form className="py-3 px-1" onSubmit={handleSubmitForm}>
            <div className="input">
              <label className="mb-2">NumTickets</label>
              <input
                type="text"
                placeholder="Enter Tickets"
                onChange={onNumTicketsChange}
                className="w-full mt-2 p-2 text-sm text-gray-500 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
              {numTickets.message && (
                <span className="text-red-500 text-xs italic">
                  {numTickets.message}
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
                {loading ? "loading..." : "Reschedule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState({});
  const [fullName, setFullName] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});
  const [password, setPassword] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onPhoneChange = (e) => {
    var phoneNumber = e.target.value;
    if (phoneNumber != "") {
      setPhoneNumber({ value: phoneNumber });
    } else {
      setPhoneNumber({ value: phoneNumber, message: "Write Phone number" });
    }
  };

  const onEmailChange = (e) => {
    var email = e.target.value;
    if (email != "") {
      setEmail({ value: email });
    } else {
      setEmail({ value: email, message: "Write Email" });
    }
  };

  const onFullNameChange = (e) => {
    var fullName = e.target.value;
    if (fullName != "") {
      setFullName({ value: fullName });
    } else {
      setFullName({ value: fullName, message: "Write Full Name" });
    }
  };
  const onPasswordChange = (e) => {
    var password = e.target.value;
    if (password != "") {
      setPassword({ value: password });
    } else {
      setPassword({ value: password, message: "Write Password" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (fullName.value === undefined || fullName.value === "") {
      setFullName({ message: "Full Name is required" });
    } else if (email.value === undefined || email.value === "") {
      setEmail({ message: "Email is required" });
    } else if (phoneNumber.value === undefined || phoneNumber.value === "") {
      setPhoneNumber({ message: "Phone Number is required" });
    } else if (password.value === undefined || password.value === "") {
      setPassword({ message: "Password is required" });
    } else {
      const payload = {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      };
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/user/register",
          payload
        );
        console.log(response);
        toast.success("acount created successfully");
        setLoading(false);
      } catch (error) {
        console.log("err", error);
        setLoading(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full max-w-lg mt-8 shadow-xl px-10">
          <h2 className="text-2xl font-bold text-center mb-6 mt-8">
            Register
          </h2>

          <div className="mb-4">
            <label htmlFor="" className="block font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter Full Name"
              onChange={onFullNameChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-bg"
            />
            {fullName.message && (
              <span className="text-red-500 text-xs italic">
                {fullName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block font-bold mb-2">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              onChange={onPhoneChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-bg"
            />
            {phoneNumber.message && (
              <span className="text-red-500 text-xs italic">
                {phoneNumber.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={onEmailChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-bg"
            />
            {email.message && (
              <span className="text-red-500 text-xs italic">
                {email.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={onPasswordChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-bg"
            />
            {password.message && (
              <span className="text-red-500 text-xs italic">
                {password.message}
              </span>
            )}
          </div>

          <button
            onClick={handleRegister}
            className="w-full mt-4 bg-bg font-bold text-2xl hover:bg-title text-black py-2 px-4 rounded-md mb-6 transition-colors border border-gray-400"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [loading, setLoading] = useState(false);

  const onEmailChange = (e) => {
    var email = e.target.value;
    if (email !== "") {
      setEmail({ value: email });
    } else {
      setEmail({ value: email, message: "Write Email" });
    }
  }

  const onPasswordChange = (e) => {
    var password = e.target.value;
    if (password !== "") {
      setPassword({ value: password });
    } else {
      setPassword({ value: password, message: "Write Password" });
    }
    }

  const navigate = useNavigate();
  const handleLogin = async(e) => {
        e.preventDefault()
        if(email.value === undefined || email.value === ""){
          setEmail({message: "Email is required"})
        }else if(password.value === undefined || password.value === ""){
          setPassword({message: "Password is required"})
        }else{
            const data = {
                email: email.value,
                password: password.value
            }
            try {
                setLoading(true)
                const response = await axios.post("http://localhost:3000/api/user/login", data)
                console.log(response.data.user)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userData", JSON.stringify(response.data.user))
                toast.success("Login successful")
                navigate("/dashboard")
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                if (error) {
                    toast.error("Invalid email or password");
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
        <div className="w-full max-w-lg mt-8 shadow-xl px-10">
          <h2 className="text-2xl font-bold text-center mb-6 mt-8">
            Login
          </h2>

          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="username"
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

          <button onClick={handleLogin} className="w-full mt-4 bg-bg font-bold text-2xl hover:bg-title text-black py-2 px-4 rounded-md mb-6 transition-colors border border-gray-400">
          {loading ? "Loading..." : "Login"}
        </button>
        </div>
      </div>
    </>
  );
};

export default Login;

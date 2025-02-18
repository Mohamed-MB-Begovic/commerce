/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const updateData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword !== formData.password) {
      return toast.error("Please confirm your password.");
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/users", formData);
      toast.success("Inserted successfully");
      setIsLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.message === "Network Error") {
        toast.error("Network error");
      } else {
        toast.error(error.response?.data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center px-4 sm:px-8 md:px-16">
      <div className="bg-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg px-6 sm:px-8">
        <div className="flex flex-col py-6 sm:py-8">
          <div className="text-center">
            <div className="flex justify-center items-center text-2xl">
              <ion-icon name="cog-outline" className="text-8xl"></ion-icon>
              <span className="ml-2 text-primary">MB</span>
            </div>
            <h2 className="mt-4 mb-2 text-lg sm:text-xl">
              Sign up To <span className="text-primary">Go</span> Signin
            </h2>
          </div>
          <div className="signup-inputs flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8">
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              autoComplete="off"
              onChange={(e) => updateData(e)}
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="text"
              id="email"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => updateData(e)}
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => updateData(e)}
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm sm:text-base"
            />
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
              onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            <p className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left text-sm sm:text-base">
              I already have an account. Please
              <Link to="/signin" className="text-blue-500 hover:underline">
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

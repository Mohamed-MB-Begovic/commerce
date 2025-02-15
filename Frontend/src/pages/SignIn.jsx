/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const updateDate = (e) => {
    setData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const navigatePage = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/users/login", formData);
      toast.success("Login success");
      setIsLoading(false);
      login(data, data.expiresIn);
      navigatePage(data.role);
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response?.data);
      } else {
        toast.error(error.message);
        console.log(error)
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center px-4 sm:px-8 md:px-16">
      <div className="bg-white w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex flex-col py-4 sm:py-8">
          <div className="text-center">
            <div className="flex justify-center items-center text-2xl">
              <ion-icon name="cog-outline" className="text-4xl"></ion-icon>
              <span className="ml-2 text-primary">MB</span>
            </div>
            <h2 className="mt-4 mb-2 text-lg sm:text-xl">
              Login To <span className="text-primary">Go The</span> Dashboard
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8">
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={(e) => updateDate(e)}
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              onChange={(e) => updateDate(e)}
              className="p-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            <p className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left text-sm sm:text-base">
              I don't have an account, please
              <Link to="/signup" className="text-blue-500 hover:underline">
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

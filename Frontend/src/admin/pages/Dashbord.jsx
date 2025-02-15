/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import {

  SearchIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";
import TopCustomers from "../components/TopCustomers";
import TopProducts from "../components/TopProducts";

function Dashbord() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      } min-h-screen flex`}
    >
  

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
      

        {/* Content Area */}
        <div className="p-6">
          {/* Header Section */}
          <div
            className={`${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
            } flex flex-wrap md:flex-nowrap justify-between items-center p-4 rounded shadow`}
          >
            <div>
              <h2 className="text-lg font-bold">Good Morning, Anna!</h2>
              <p className="text-sm">
                Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center px-4 py-2 rounded-md ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <span>01 Jan, 2024 to 31 Jan, 2024</span>
              </div>
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Product
              </button> */}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatCard
              icon={
                <CurrencyDollarIcon className="h-10 w-10 text-green-500 bg-green-100 p-2 rounded-full" />
              }
              title="Total Earnings"
              value="$559.25k"
              change="+16.24%"
              changeColor="text-green-500"
              linkText="View net earnings"
            />
            <StatCard
              icon={
                <ShoppingCartIcon className="h-10 w-10 text-blue-500 bg-blue-100 p-2 rounded-full" />
              }
              title="Orders"
              value="36,894"
              change="-3.57%"
              changeColor="text-red-500"
              linkText="View all orders"
            />
            <StatCard
              icon={
                <UserGroupIcon className="h-10 w-10 text-orange-500 bg-orange-100 p-2 rounded-full" />
              }
              title="Customers"
              value="183.35M"
              change="+29.08%"
              changeColor="text-green-500"
              linkText="See details"
            />
            <StatCard
              icon={
                <CreditCardIcon className="h-10 w-10 text-purple-500 bg-purple-100 p-2 rounded-full" />
              }
              title="My Balance"
              value="$165.89k"
              change="+0.00%"
              changeColor="text-gray-500"
              linkText="Withdraw money"
            />
          </div>


          {/* top customers */}
          <TopCustomers/>
          {/* top products */}
          <TopProducts/>
        </div>
      </div>
    </div>
  );
}

// Search Bar Component


// Stats Card Component
function StatCard({ icon, title, value, change, changeColor, linkText }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {/* <p className={text-sm ${changeColor}}>{change}</p> */}
        <a href="#" className="text-sm text-blue-500 underline">
          {linkText}
        </a>
      </div>
    </div>
  );
}

export default Dashbord;
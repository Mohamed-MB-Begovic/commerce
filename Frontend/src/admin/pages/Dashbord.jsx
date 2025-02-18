/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import {

  SearchIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CreditCardIcon,
} from "@heroicons/react/outline";
// import TopCustomers from "../components/TopCustomers";
import TopProducts from "../components/TopProducts";
import { useUser } from "@/context/UserContext";
import { date } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
function Dashbord() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalOrder,setTotalOrders]=useState()
  const [totalCustomers,setTotalCustomers]=useState()
  const [TopCustomers,setTopCustomers]=useState(null)
const {user}=useUser()



useEffect(()=>{
  fetchTotalPayments()
},[user])
const fetchTotalPayments = async () => {
  try {
    // Fetch total payments
    setLoading(true);
    const response = await axios.get('/api/payments/total');
    console.log(response.data);
    setTotalOrders(response.data.total_payment)
    setTotalCustomers(response.data.totalCustomers)
    setTopCustomers(response.data.topCustomers)
    // setLoading(false);
  } catch (error) {
    console.error(error);
  }
  finally{
    setLoading(false)
  }
}

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
        {loading ? (
        <div>Loading data...</div>
      ) : (
        <div className="p-6">
          {/* Header Section */}
          <div
            className={`${
              isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
            } flex flex-wrap md:flex-nowrap justify-between items-center p-4 rounded shadow`}
          >
            <div>
              <h2 className="text-lg font-bold">Good Morning, {user?.username}!</h2>
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
                <span>{new Date().toString()}</span>
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
              address="/admin/payments"
            />
            <StatCard
              icon={
                <ShoppingCartIcon className="h-10 w-10 text-blue-500 bg-blue-100 p-2 rounded-full" />
              }
              title="Orders"
              value={totalOrder}
              change="-3.57%"
              changeColor="text-red-500"
              linkText="View all orders"
              address="/admin/orders"
            />
            <StatCard
              icon={
                <UserGroupIcon className="h-10 w-10 text-orange-500 bg-orange-100 p-2 rounded-full" />
              }
              title="Customers"
              value={totalCustomers}
              change="+29.08%"
              changeColor="text-green-500"
              linkText="See details"
              address="/admin"
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
              address="/admin"
            />
          </div>


          {/* top customers */}
          <TopCustomersFun customers={TopCustomers}/>
          {/* top products */}
          <TopProducts/> 
        </div>
        )}
      </div>
    </div>
  );
}

// Search Bar Component


// Stats Card Component
function StatCard({ icon, title, value, change,address, changeColor, linkText }) {
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
        <Link to={address} href="#" className="text-sm text-blue-500 underline">
          {linkText}
        </Link>
      </div>
    </div>
  );
}


function TopCustomersFun({customers}){
  // const http = ;
  // console.log(http)
  const members = [
      {
          name: "Lindsay Walton",
          email: "lindsay.walton@example.com",
          title: "Front-end Developer",
          department: "Optimization",
          status: "Active",
          role: "Member",
          image: "https://placehold.co/40x40?text=LW"
      },
      {
          name: "Courtney Henry",
          email: "courtney.henry@example.com",
          title: "Designer",
          department: "Intranet",
          status: "Active",
          role: "Admin",
          image: "https://placehold.co/40x40?text=CH"
      },
      {
          name: "Tom Cook",
          email: "tom.cook@example.com",
          title: "Director of Product",
          department: "Directives",
          status: "Active",
          role: "Member",
          image: "https://placehold.co/40x40?text=TC"
      },
      {
          name: "Whitney Francis",
          email: "whitney.francis@example.com",
          title: "Copywriter",
          department: "Program",
          status: "Active",
          role: "Admin",
          image: "https://placehold.co/40x40?text=WF"
      },
      {
          name: "Leonard Krasner",
          email: "leonard.krasner@example.com",
          title: "Senior Designer",
          department: "Mobility",
          status: "Active",
          role: "Owner",
          image: "https://placehold.co/40x40?text=LK"
      },
      {
          name: "Floyd Miles",
          email: "floyd.miles@example.com",
          title: "Principal Designer",
          department: "Security",
          status: "Active",
          role: "Member",
          image: "https://placehold.co/40x40?text=FM"
      }
  ];
// console.log(customers)
  return (
    // <h2>hello w</h2>
      <div className="container mx-auto p-4">
                  <div className="overflow-x-auto">
                      <div>
                          <h2 className="font-bold my-4">Top Customers</h2>
                      </div>
                      <table className="min-w-full bg-white">
                          <thead>
                              {/* <tr>
                                  <th className="py-2 px-4 border-b text-left">Name</th>
                                  <th className="py-2 px-4 border-b text-left">Total</th>
                                  <th className="py-2 px-4 border-b text-left">Status</th>
                                  <th className="py-2 px-4 border-b"></th>
                              </tr> */}
                          </thead>
                          <tbody>
                              {customers?.map((customer, index) => (
                                  <tr key={index}>
                                   <td className="py-2 px-4 border-b flex items-center">
                                            <img src={customer.image || `https://placehold.co/40x40?text=${customer.firstName[0]}${customer.lastName[0]}`}
                                            alt={`${customer.firstName}'s profile`} className="w-10 h-10 rounded-full mr-4"/>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{customer.firstName} {customer.lastName}</div>
                                                <div className="text-sm text-gray-500">{customer.email}</div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b text-sm text-gray-900">${customer.subtotal}</td>
                                        <td className="py-2 px-4 border-b">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {/* {custo.status} */}Paid
                                            </span>
                                        </td>

                                      <td className="py-2 px-4 border-b text-sm text-blue-500 cursor-pointer">Edit</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
  )
}

export default Dashbord;
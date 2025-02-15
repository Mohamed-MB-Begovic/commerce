/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
 
import { useEffect, useState } from 'react';
// import { HomeIcon, CashIcon, ShoppingCartIcon, DocumentReportIcon, CogIcon, ClipboardListIcon,BellIcon } from '@heroicons/react/outline';
import { HomeIcon, CashIcon, ShoppingCartIcon, ClipboardListIcon, DocumentReportIcon, CogIcon, PlusIcon, EyeIcon,  BellIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon, ChevronDownIcon, 
  SearchIcon} from '@heroicons/react/outline';
import Notification from '../icons/Notification';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// import { CreditCardIcon, CurrencyDollarIcon, ShoppingCartIcon, UserGroupIcon } from "@heroicons/react/outline";

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const location=useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate=useNavigate()
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
 
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    const {user}=useUser();
// console.log(user?.role)
    useEffect(()=>{
        if(!user && user?.role !== "admin"){
          // console.log('user is not admin')
            navigate('/')
        }
    },[user])

    return (

        <div className="flex h-screen bg-white text-black">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-64  bg-gray-900 text-gray-200 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            {/* <div className="flex flex-col items-center p-7">
                <img src="../p-2.png" alt="Profile" className="rounded-full h-[15vh] w-[15vh] mb-2" />
                <h2 className="text-lg font-bold">{user?.username}</h2>
            </div> */}
            <h2 className='p-10 font-medium mx-7 text-[2rem] mb-10'>MBOZ</h2>
            <nav className="p-4">
        {/* Home Link */}
        <NavLink 
          to="/admin" 
          className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          onClick={() => handleLinkClick('/admin')}>
          <HomeIcon className="h-5 w-5 mr-2" />
          Home
        </NavLink>

        {/* Products Dropdown */}
        <div>
          <button
            className={`flex items-center p-2 mb-3 mx-2 w-full text-left ${activeLink === '/admin/products' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
            onClick={() => setProductsDropdownOpen(!productsDropdownOpen)} // Toggle dropdown
          >
            <CashIcon className="h-5 w-5 mr-2" />
            Products
            <span className={`ml-auto transform transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`}>
              {/* Chevron Icon for Dropdown */}
              <ChevronDownIcon className="h-5 w-5" />
            </span>
          </button>
          
          {/* Dropdown links */}
          {productsDropdownOpen && (
            <div className="pl-6">
              <NavLink 
                to="/admin/products/add" 
                className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/products/add' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                onClick={() => handleLinkClick('/admin/products/add')}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Product
              </NavLink>
              <NavLink 
                to="/admin/products/view" 
                className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/products/view' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                onClick={() => handleLinkClick('/admin/products/view')}>
                <EyeIcon className="h-5 w-5 mr-2" />
                View Products
              </NavLink>
            </div>
          )}
        </div>

        {/* Sales Link */}
        <NavLink 
          to="/admin/sales" 
          className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/sales' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          onClick={() => handleLinkClick('/admin/sales')}>
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          Sales
        </NavLink>

        {/* Orders Link */}
        <NavLink 
          to="/admin/orders" 
          className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/orders' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          onClick={() => handleLinkClick('/admin/orders')}>
          <ClipboardListIcon className="h-5 w-5 mr-2" />
          Orders
        </NavLink>

        {/* Payments Link */}
        <NavLink 
          to="/admin/payment" 
          className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/payment' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          onClick={() => handleLinkClick('/admin/payment')}>
          <CashIcon className="h-5 w-5 mr-2" />
          Payments
        </NavLink>

        {/* Reports Link */}
        <NavLink 
          to="/admin/report" 
          className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/report' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          onClick={() => handleLinkClick('/admin/report')}>
          <DocumentReportIcon className="h-5 w-5 mr-2" />
          Reports
        </NavLink>

        {/* Settings Link */}
        <NavLink 
          to="/admin/setting" 
          className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/setting' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
          onClick={() => handleLinkClick('/admin/setting')}>
          <CogIcon className="h-5 w-5 mr-2" />
          Settings
        </NavLink>
      </nav>
            {/* <nav className="p-4">
                <NavLink 
                    to="/admin" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin')}>
                    <HomeIcon className="h-5 w-5 mr-2" />
                    Home
                </NavLink>
                <NavLink 
                    to="/admin/products" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/products' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin/products')}>
                    <CashIcon className="h-5 w-5 mr-2" />
                    Products
                </NavLink>
                
                <NavLink 
                    to="/admin/sales" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/sales' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin/sales')}>
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Sales
                </NavLink>
                <NavLink 
                    to="/admin/orders" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/orders' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin/orders')}>
                    <ClipboardListIcon className="h-5 w-5 mr-2" />
                    Orders
                </NavLink>
                <NavLink 
                    to="/admin/payment" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/payment' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin/payment')}>
                    <CashIcon className="h-5 w-5 mr-2" />
                    Payments
                </NavLink>
                <NavLink 
                    to="/admin/report" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/report' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin/report')}>
                    <DocumentReportIcon className="h-5 w-5 mr-2" />
                    Reports
                </NavLink>
                <NavLink 
                    to="/admin/setting" 
                    className={`flex items-center p-2 mb-3 mx-2 ${activeLink === '/admin/setting' ? 'bg-blue-700' : ''} hover:bg-blue-700`}
                    onClick={() => handleLinkClick('/admin/setting')}>
                    <CogIcon className="h-5 w-5 mr-2" />
                    Settings
                </NavLink>
        
            </nav> */}
        </div>

        <div className="flex-1 lg:ml-64">
        <header
         onClick={() => {
            if (sidebarOpen) {
                setSidebarOpen(false);
            }
        }} 
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } fixed top-0 left-0 lg:left-64 right-0 flex items-center justify-between p-4 shadow z-10`}
        >
          <div className="flex items-center space-x-4">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-6 relative">
            <GlobeAltIcon className="w-6 h-6 cursor-pointer" />
            {/* Notification Icon */}
            <div className="relative">
              <BellIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-72 p-4 rounded shadow-lg z-10 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="font-bold mb-2">Notifications</p>
                  <ul className="space-y-2">
                    <li className="text-sm">You have 3 new messages</li>
                    <li className="text-sm">New user registered</li>
                    <li className="text-sm">Order #12345 shipped</li>
                  </ul>
                </div>
              )}
            </div>
            {/* Dark Mode Toggle */}
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="cursor-pointer"
            >
              {isDarkMode ? (
                <SunIcon className="w-6 h-6 text-gray-400" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="../p-2.png" // Replace with real profile image
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-bold">MB</p>
                <p className="text-xs text-gray-500">Founder</p>
              </div>
            </div>
          </div>
        </header>

            {/* Main content */}
            <main className="mt-16 p-4">
                <Outlet />
            </main>
        </div>
    </div>


    );
};


function SearchBar() {
  return (
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md">
      <SearchIcon className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 bg-transparent outline-none placeholder-gray-500"
      />
    </div>
  );
}

 export default Home;
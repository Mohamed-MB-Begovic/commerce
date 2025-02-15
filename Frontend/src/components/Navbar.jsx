/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import CartIcon from "./Icons/CartIcon";
import DownArrow from "./Icons/DownArrow";
import Logo from "./Icons/Logo";
import MenuIcon from "./Icons/MenuIcon";
import Search from "./Icons/Search";
import TopHeader from "./TopHeader";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import UpArrow from "./Icons/UpArrow";
import LogOut from "./Icons/LogOut";
import { useShopContext } from "../context/Context";
import { HomeIcon, PencilIcon, AdjustmentsIcon,ShoppingBagIcon } from "@heroicons/react/outline";
import UserAvator from './UserAvator';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, activeLink, setActiveLink, logOut } = useUser();
  const [userCheck, setUserCheck] = useState(false);
  const { products } = useShopContext();
  const [isHidden, setIsHidden] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile,setProfile]=useState(null)

useEffect(()=>{
  // window.location.reload()
  setProfile(user?.image)
},[user])
// console.log(profile)
// console.log(user)
// console.log(user.image)
  return (
    <nav className="bg-white">
      {user ? '' : <TopHeader />}
      <div className="container w-full font-serif border-b mx-auto px-4 md:px-10 h-[10vh] flex items-center justify-between">
        {/* Logo */}
        <NavLink to='/' onClick={() => setActiveLink('home')} className='flex-1'>
          <Logo />
        </NavLink>

        {/* Navigation NavLinks */}
        <div className="hidden sm:flex flex-1 justify-center">
          <ul className="flex space-x-9 font-medium font-sans uppercase">
            <li>
              <NavLink to='/' onClick={() => setActiveLink('home')} className={`hover:text-orange-400 ${activeLink === 'home' ? 'text-orange-400' : ''}`}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/user/womens' onClick={() => setActiveLink('womens')} className={`hover:text-orange-400 ${activeLink === 'womens' ? 'text-orange-400' : ''}`}>Womens</NavLink>
            </li>
            <li>
              <NavLink to='/user/men' onClick={() => setActiveLink('mens')} className={`hover:text-orange-400 ${activeLink === 'mens' ? 'text-orange-400' : ''}`}>Mens</NavLink>
            </li>
            {/* <li>
              <NavLink to='/user/kids' onClick={() => setActiveLink('kids')} className={`hover:text-orange-400 ${activeLink === 'kids' ? 'text-orange-400' : ''}`}>Kids</NavLink>
            </li> */}
            <li>
              <NavLink to='/user/collections' onClick={() => setActiveLink('collections')} className={`hover:text-orange-400 ${activeLink === 'collections' ? 'text-orange-400' : ''}`}>Collections</NavLink>
            </li>
          </ul>
        </div>

        {/* Right navigations */}
        <div className="flex-1 relative flex items-center justify-end gap-4">
          {/* Search container */}
          <div className="hidden lg:block  flex items-center relative">
            <input
              type="text"
              placeholder="Search in..."
              className={`border  rounded-full py-2 px-4 w-[300px] outline-none text-sm text-gray-700 font-sans ${isHidden ? 'hidden' : ''}`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              onClick={() => setIsHidden(!isHidden)}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-6 w-6 absolute ${!isHidden  ? 'top-2':'-top-3'} right-3 text-orange-400 cursor-pointer`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          {/* Cart container */}
          <div className="flex items-center relative">
            <Link to='/user/cart'>
              <CartIcon />
            </Link>
            <span className="absolute -right-1 -top-2 bg-orange-500 text-white h-4 w-4 flex justify-center items-center rounded-full">{products ? products.length : '0'}</span>
          </div>

          {user && (
            <div className="">
              <button className="mt-2 ml-2" onClick={() => setUserCheck(!userCheck)}>
               {
               profile ?(
               <img src={user.image} alt="profile" className="w-8 h-8  rounded-full" loading="lazy"/>
              ):
            <UserAvator username={user.username} size={28}/>
               }
              </button>
              {/* <img
                src="/p-2.png"
                alt="User Avatar"
                className="w-8 h-8 ml-3 rounded-full cursor-pointer"
                onClick={() => setUserCheck(!userCheck)}
              /> */}
            </div>
          )}

{userCheck && (
            <div className="w-[230px] absolute top-[120%] z-10 font-sans right-0 md:right-[2%] rounded-sm bg-gray-200 text-gray-700  shadow-md py-2 px-4">
              <div className="w-auto flex gap-2 items-center  py-3 pl-3">
               {
               profile ?(
               <img src={user.image} alt="profile" className="w-[20%] mt-2 rounded-full" loading="lazy"/>
              ):(
                <>
                <div className="mt-2">
            <UserAvator username={user.username} size={30}/>
             </div>
               </>
               )}
                <div className="w-auto font-sans">
                  <span className="text-sm trancate">{user?.username}</span>
                  <span className="text-gray-500 text-[13px] block truncate relative max-w-32 lowercase">{user?.email}</span>
                  {/* <span>{user?.username}</span> */}
                  {/* <span>{user?.password}</span> */}
                  <span></span>
                </div>
              </div>
              
                
              
              <ul className="flex flex-col px-1 py-3">
              {user.role === 'admin' ? (
                <>
                  <li onClick={()=>setIsOpen(false)}>
                    <NavLink
                      to="/admin"
                      className="flex items-center capitalize text-gray-600 p-2 gap-1 hover:bg-gray-500 hover:text-gray-900 rounded-lg"
                    >
                      <HomeIcon className="w-7 h-7 p-1 -mt-[2px] rounded-md bg-orange-100 hover:text-black" />
                      Dashboard
                    </NavLink>
                  </li>
                  <div className="bg-gray-400 h-[1px] mt-2 mb-1"></div>
                <li onClick={()=>setUserCheck(false)}>
                  <button
                    onClick={() => logOut()}
                    className="flex items-center capitalize text-gray-600 gap-1 p-2 hover:bg-gray-500 w-full hover:text-gray-900 rounded-lg"
                  >
                    <LogOut className="w-7 h-7 p-1 -mt-[2px] rounded-md bg-orange-100 hover:text-black" />
                    Logout
                  </button>
                </li>
              </>
                ):(
                <>
                <li onClick={()=>setUserCheck(false)}>
                  <NavLink
                    to="/user/orders"
                    className="flex items-center capitalize text-gray-600 p-2 gap-1 hover:bg-gray-500 hover:text-gray-900 rounded-lg"
                  >
                    <ShoppingBagIcon className="w-7 h-7 p-1 -mt-[2px] rounded-md bg-orange-100 hover:text-black" />
                    Your Orders 
                  </NavLink>
                </li>
                
                <li onClick={()=>setUserCheck(false)}>
                  <NavLink
                    to="/user/edit-profile"
                    className="flex items-center capitalize text-gray-600 p-2 gap-1 hover:bg-gray-500 hover:text-gray-900 rounded-lg"
                  >
                    <PencilIcon className="w-7 h-7 p-1 -mt-[2px] rounded-md bg-orange-100 hover:text-black" />
                    Edit Profile
                  </NavLink>
                </li>
                
                
                <li onClick={()=>setUserCheck(false)}>
                  <NavLink
                    to={user?.role === "admin" ? "/admin-dashbourd" : "/dashbourd"}
                    className="flex items-center capitalize text-gray-600 gap-1 p-2 hover:bg-gray-500 hover:text-gray-900 rounded-lg"
                  >
                    <AdjustmentsIcon className="w-7 h-7 p-1 -mt-[2px] rounded-md bg-orange-100 hover:text-black" />
                    Settings
                  </NavLink>
                </li>
                <div className="bg-gray-400 h-[1px] mt-2 mb-1"></div>
                <li onClick={()=>setUserCheck(false)}>
                  <button
                    onClick={() => logOut()}
                    className="flex items-center capitalize text-gray-600 gap-1 p-2 hover:bg-gray-500 w-full hover:text-gray-900 rounded-lg"
                  >
                    <LogOut className="w-7 h-7 p-1 -mt-[2px] rounded-md bg-orange-100 hover:text-black" />
                    Logout
                  </button>
                </li>
                </>)}
              </ul>
            </div>
          )}
 



          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col items-center py-4 space-y-4 font-sans uppercase">
            <li>
              <NavLink to='/' onClick={() => { setActiveLink('home'); setMenuOpen(false); }} className="hover:text-orange-400">Home</NavLink>
            </li>
            <li>
              <NavLink to='/user/womens' onClick={() => { setActiveLink('womens'); setMenuOpen(false); }} className="hover:text-orange-400">Womens</NavLink>
            </li>
            <li>
              <NavLink to='/user/men' onClick={() => { setActiveLink('mens'); setMenuOpen(false); }} className="hover:text-orange-400">Mens</NavLink>
            </li>
            {/* <li>
              <NavLink to='/user/kids' onClick={() => { setActiveLink('kids'); setMenuOpen(false); }} className="hover:text-orange-400">Kids</NavLink>
            </li> */}
            <li>
              <NavLink to='/user/collections' onClick={() => { setActiveLink('collections'); setMenuOpen(false); }} className="hover:text-orange-400">Collections</NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

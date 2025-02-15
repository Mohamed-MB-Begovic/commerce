/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import Cookie from 'js-cookie'
import { createContext, useContext, useEffect, useState } from "react";

 
const removeToken=async(token)=>{
    return await Cookie.remove(token)
}

 const UserContext=createContext(null);

export const ContextProvider=({children})=>{

const [user,setUser]=useState(null)
const [activeLink,setActiveLink]=useState('home')

// logout functionality
const logOut=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('expiresIn')
    // localStorage.removeItem('cart-items')
    setUser(null)
    // Cookies.remove('token')
  removeToken('token')
  window.location.reload();

}


useEffect(()=>{
    const storedUser=localStorage.getItem('user')
    const expirationTime=localStorage.getItem('expiresIn')

    // check if user token expired or not
    if(storedUser && expirationTime){
        const currentTime=new Date().getTime()
        if(currentTime <= parseInt(expirationTime)){
            setUser(JSON.parse(storedUser))
        }else{
            logOut();
        }
    }
},[])

const login=(userData,expireIn)=>{
const expiresIn=new Date().getTime()+expireIn*1000
localStorage.setItem('expiresIn',expiresIn.toString())
localStorage.setItem('user',JSON.stringify(userData))
setUser(userData)
}
const updateUser=(userData)=>{
    localStorage.setItem('user',JSON.stringify(userData))
setUser(userData)
}

const value={
    user,setUser,login,logOut,updateUser,activeLink,setActiveLink,removeToken
}
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export const useUser=()=>{
    return useContext(UserContext)
}
export default UserContext;
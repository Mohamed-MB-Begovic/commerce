/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
   import {XIcon} from '@heroicons/react/outline'
import { Button } from "./ui/button"
import { useState } from "react"
import { useUser } from "@/context/UserContext";
import axios from 'axios'
import { useShopContext } from "@/context/Context";
import { useOrder } from "@/context/OrderContext";
import { date } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ThankYouMessage from '../pages/ThankYouMessage'

export default function Checkmodel({setShowOrderCheck,data}) {
  // const {products}=useShopContext();
  // const [showThankMessage,setShowThankMessage]=useState(false)
  const { products, total } = useShopContext();
    // console.log(data)
    let result={...data}
    result.orderItems=products
    // console.log(result)

    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(false)
    const {user}=useUser();
    const {setOrder}=useOrder();
    const [code,setCode]=useState('')
    const [confirmOrder,setConfirmOrder]=useState(false)
// const [showThankMessage,setShowThankMessage]=useState(false)

    const verifyOrder=async()=>{
        const orderItems = products.map(product => ({
          productId: product._id,
          quantity: product.quantity,
          price: product.price,
          productImage:product.thumbnail,
          size:product.size
        }));
    
        const checkoutData = {...data,orderItems,code};
    
        try {
          const {res}=await axios.post('/api/orders/verify',checkoutData)
          toast.success('order submited successfully')
          setOrder(orderItems)
          localStorage.setItem("orderItems",JSON.stringify(orderItems))
          setConfirmOrder(false)
          setShowOrderCheck(false)
          localStorage.removeItem("cart-items")
          navigate('/user/order/confirm-order');
      // window.location.reload();
        
      } catch (error) {
      console.log(error)
       toast.error(error.response?.data)
      }
       }

     
  return (
   <div className="fixed w-full  inset-0 bg-black/80  bg-opacity-50 flex justify-center  overflow-hidden items-center z-50">
          <div
           className="bg-white relative p-6 rounded-lg shadow-lg lg:w-[400px]  w-[300px] overflow-hidden"
    //   className="fixed  a data-[state=open]:fade-in-0"

           >
 
            <h2 className="text-2xl font-semibold mb-4">Confirm Order</h2>
            <XIcon className="w-5 absolute right-10 top-8"
              onClick={()=>setShowOrderCheck(false)}
            /> 
             <input type="text" placeholder="code..." 
             onChange={(e)=>setCode(e.target.value)}
              className="p-2 border border-lg mr-3 w-[15rem] text-3x" />
            <button
              className="mt-4 px-4 py-2 mb-5 bg-red-500 text-white rounded"
              onClick={verifyOrder}
            >
              verify
            </button>
          </div>
         
          </div>

    // <div>
     
    // </div>
  )
}

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useShopContext } from "../context/Context";
import { PhoneIcon, MapIcon, LockClosedIcon ,CheckCircleIcon,XCircleIcon, XIcon} from '@heroicons/react/outline';
import axios from "axios";
import toast from "react-hot-toast";
import {useUser} from '../context/UserContext'
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import Checkmodel from "@/components/Checkmodel";
// import toast from "react-hot-toast";
export default function Checkout() {
  const { products, total } = useShopContext();
  const [checkOut,setIsCheckOut]=useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [country, setCountry] = useState('Somalia');
  const [paymentMethod, setPaymentMethod] = useState('');
  // const [productImage, setproductImage] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmOrder,setConfirmOrder]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code,setCode]=useState('')
  const navigate=useNavigate()
  const [showOrderCheck,setShowOrderCheck]=useState(false)
  const [data,setData]=useState()
const {user}=useUser()
// validation state 

const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    streetAddress: "",
  });

  // Handle form validation
const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!streetAddress) newErrors.streetAddress = "Street address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    setIsSubmitting(true)
    if (validate()) {
  //       // Proceed to checkout (set the checkout step visible)
  setIsCheckOut(true)
  setData(
    {
      firstName,
      lastName,
      phoneNumber,
      streetAddress,
      apartment,
      country,
      paymentMethod,
      subtotal: total,
      shippingFee: products.length * 0.5,  // You can adjust this logic
      discount: 0,  // Example value, you can change it based on your logic
      totalAmount: total + (products.length * 0.5),  // Example: total + shipping fee
      userEmail:user?.email,
      code,
  })
  setIsSubmitting(false)
  }else{
    setIsSubmitting(false)
  }
  
  };

  // const verifyOrder=async()=>{
  //   const orderItems = products.map(product => ({
  //     productId: product._id,
  //     quantity: product.quantity,
  //     price: product.price,
  //     productImage:product.thumbnail,
  //     size:product.size
  //   }));

  //   const checkoutData = {
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     streetAddress,
  //     apartment,
  //     country,
  //     paymentMethod,
  //     subtotal: total,
  //     shippingFee: products.length * 0.5,  // You can adjust this logic
  //     discount: 0,  // Example value, you can change it based on your logic
  //     totalAmount: total + (products.length * 0.5),  // Example: total + shipping fee
  //     orderItems,
  //     userEmail:user?.email,
  //     code,
  //   };

  //   try {
  //     const {res}=await axios.post('/api/orders/verify',checkoutData)
  //     toast.success('order submited successfully')
  //     setConfirmOrder(false)
  //     localStorage.removeItem("cart-items")
  //     navigate('/');
  // window.location.reload();
    
  // } catch (error) {
  // console.log(error)
  //  toast.error(error.response?.data)
  // }
  //  }

  const submitOrder=async()=>{

 
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Start order</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapIcon className="h-6 w-6 text-gray-500 mr-2" />
            Shipping address
          </h2>
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
            Your personal information is encrypted and will only be used for delivery purposes.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* {checkoutError && <p className="text-red-500">{checkoutError}</p>} */}  
           <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option>Somalia</option>
                {/* Add other countries if needed */}
              </select>
            </div>
           <div className="flex gap-4">
             <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
               {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
           
             </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
               {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              
            </div>
           </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">+252</span>
                <input
                  type="text"
                  className="flex-1 block w-full border border-gray-300 rounded-r-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
               {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street address *</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                required
              />
               {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apartment, suite, unit (optional)</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
              />
              
            </div>
    

            <Button
              type="submit"
              onClick={handleSubmit}
              className={` rounded-md text-white w-full py-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={checkOut}
            >
              {isSubmitting ? 'processing...' : 'Next'}
            </Button>
            
            {
                checkOut &&(
                    <>
                    {/* payment section v2*/}
                    <Payment amount={total+products.length*0.5} data={data} showOrderCheck={showOrderCheck} setShowOrderCheck={setShowOrderCheck}/>
                    </>
                )

            }

          </form>
        </div>

        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order summary ({products.length} items)</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Item subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated shipping fee</span>
              <span>${products.length * 0.5}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Shipping discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${total+products.length * 0.5}</span>
            </div>
            <div className="">
              <h3 className="font-semibold mb-2 mt-10">Protections for this order</h3>
              <div className="flex items-start mb-2">
                <CheckCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold">On-time Dispatch Guarantee</p>
                  <p className="text-sm text-gray-600">
                    Dispatched within 7 days of payment or receive a 10% delay compensation{" "}
                    <a href="#" className="text-blue-500">
                      View details
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <LockClosedIcon className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="font-semibold">Secure payments</p>
                  <p className="text-sm text-gray-600">Every payment is encrypted somcommerce.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* model */}
      {/* {confirmOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white relative p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Confirm Order</h2>
            <XIcon className="w-5 absolute right-10 top-8"
              onClick={()=>setConfirmOrder(!confirmOrder)}
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
      )} */}
    </div>
  );
}
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//  function order(){}


function Payment({amount,setShowOrderCheck,showOrderCheck,data}){
  const [paymentMethod,setPaymentMethod]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [result,setResult]=useState({...data})
  // console.log(result)
const {user}=useUser()
  const { products, total } = useShopContext();
  // console.log(products)
// let result={...data}
 
  const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // setFormData({ ...formData, [name]: value });
  //   {[n
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentMethod==="" || phoneNumber==="" ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    result.phoneNumber=phoneNumber
    result.paymentMethod=paymentMethod
    const userInfo={
      email:user?.email,
      products
      // code:code,
      // products
    }
    try {
          setIsLoading(true)
          const {res}=await axios.post('/api/orders',userInfo)
          setShowOrderCheck(true)
          setIsLoading(false)
          // setResult(result)
          // console.log(result)
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }finally{
      setIsLoading(false)
    }

    // try {
    //   setIsLoading(true);
    //   // Simulating payment API call
    // //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   // toast.success("Payment successful!");]
    //   // setShowOrderCheck(true)
    //   setShowOrderCheck(true)
    //   // setFormData({ paymentMethod: "", phoneNumber: "", amount: "", reference: "" });
    // } catch (error) {
    //   toast.error("Payment failed. Please try again."+error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className=" py-6">
      {/* <Card> */}
      <div
      className="p-6 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"      
      >
        {/* <CardHeader> */}
        <div className="flex flex-col space-y-10 gap-5 mb-10 ">
          <div className="text-2xl font-semibold leading-none tracking-tight">Payment Gateway</div>
        </div>
 
          <Form  className="mb-4">
            {/* Payment Method */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Payment Method</label>
              <Select
                name="paymentMethod"
                // value={formData.paymentMethod}
                
                // onValueChange={(value) => set({ ...formData, paymentMethod: value })}
                onValueChange={(value)=>setPaymentMethod(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="evc-plus">EVC-Plus</SelectItem>
                  <SelectItem value="edahab">Edahab</SelectItem>
                  <SelectItem value="telesom">Telesom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                name="phoneNumber"
                onChange={(e)=>setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Amount */}
             <div className="mb-4 mt-4">
              <label className="block mb-2 text-sm font-medium">Amount (USD)</label>
              <Input className="font-bold"
                type="number"
                name="amount"
                value={result.totalAmount}
                disabled
                placeholder="Enter amount"
                // required
              />
            </div>

          

            {/* Submit Button */}
            <div className="text-center mt-6">
              <Button
             onClick={handleSubmit}
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </Form>
 
    </div>

    {
      showOrderCheck && <Checkmodel setShowOrderCheck={setShowOrderCheck} data={result}/>
    }
    </div>
  );
};

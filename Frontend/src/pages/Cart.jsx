/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useShopContext } from "../context/Context"
import { useUser } from "../context/UserContext"
import {Link} from 'react-router-dom'
export default function Cart() {
const [quantity,setQuantity]=useState();
    // const products=[
    //     {
    //         id:1,
    //         name:'Beige knitted elastic runner shoes',
    //         price:100,
    //         quantity:20,
            
    //     },
    //     {
    //         id:2,
    //         name:'Beige knitted elastic runner shoes',
    //         price:100,
    //         quantity:20
    //     },
    //     {
    //         id:3,
    //         name:'Beige knitted elastic runner shoes',
    //         price:100,
    //         quantity:20
    //     }
    // ]
    const {user}=useUser()
    const {products,updateQuantity,removeFromCart,total}=useShopContext();
if(!user) return <h2>please login before cart option!</h2>
// console.log(products)
  return (
    <div className="container mx-auto p-4">
    {/* <nav className="text-sm text-gray-500 mb-4">
        <a href="#" className="hover:underline">Home</a> &gt; 
        <a href="#" className="hover:underline"> Shop</a> &gt; 
        <span> Shopping Cart</span>
    </nav> */}
  {
        products?.length <= 0 ? <h2 className="mt-4 font-bold">No Cart Items Found</h2> :

    <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">Product</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Remove</th>
                        <th className="py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
              {
                products?.map((product)=>(
                    <>
                          <tr className="border-b" key={product._id}>
                        <td className="py-4 flex items-center">
                            <img src={product.thumbnail} alt="Beige knitted elastic runner shoes" className="w-16 h-16 mr-4"/>
                            <span className="hidden sm:block">{product.name}</span>
                        </td>
                        <td className="py-4">${product.price}</td>
                        <td className="py-4">
                            <div className="flex items-center">
                                <button className="border px-2" onClick={(e)=>{
                            if(product.quantity > 1){
                                updateQuantity(product.quantity-1,product)
                            }
                                    }} >-</button>
                                <input type="text" min={1}  value={product.quantity}   className="w-12 text-center border-t border-b"/>
                                <button className="border px-2" onClick={(e)=>{
                                    
                             updateQuantity(Number(product.quantity)+1,product)
                                    }} >+</button>
                            </div>
                        </td>
                        <td className="cursor-pointer" onClick={()=>removeFromCart(product)}>
                            x
                        </td>
                        <td className="py-4">${product.price * product.quantity}</td>
                        <td className="py-4 text-right">
                            <button className="text-gray-500 hover:text-red-500">
                                <i className="fas fa-times"></i>
                            </button>
                        </td>
                    </tr>
                    </>
                ))
              }
                
                </tbody>
            </table>
            {/* <div className="flex mt-4">
                <input type="text" placeholder="coupon code" className="border p-2 w-full"/>
                <button className="border p-2 ml-2">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
            <button className="border p-2 mt-4">UPDATE CART</button> */}
        </div>
        <div className="w-full lg:w-1/3 lg:pl-8 mt-8 lg:mt-0 bg-white   p-4 rounded-lg shadow">
            <div className="border p-4">
                <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Subtotal:</span>
                    <span className="text-gray-500">${total}</span>
                </div>
                <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Tax estimate <i className="fas fa-question-circle"></i></span>
                                <span className="text-gray-900">$00.0</span>
                            </div>
                {/* <div className="mb-4">
                    <span>Choose Payment:</span>
                    <div className="mt-2">
                        <label className="block">
                            <input type="radio" name="shipping" className="mr-2"/>  Evc-plus 
                        </label>
                        <label className="block">
                            <input type="radio" name="shipping" className="mr-2"/> E-dahab  
                        </label>
                        <label className="block">
                            <input type="radio" name="shipping" className="mr-2"/> Safaricom  
                        </label>
                    </div>
                </div> */}
                {/* <div className="mb-4">
                    <span>Estimate for Your Country</span>
                    <a href="#" className="block text-sm text-gray-500 hover:underline">Change address</a>
                </div> */}
                {/* cart details v1 */}
                <div className="flex justify-between font-semibold text-lg mb-4">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">${total}</span>
                </div>
                <Link to="/user/cart/order">   <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Checkout</button></Link>


                {/* cart details v2 */}
                      {/* <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Order summary</h2>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-gray-900">$99.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Shipping estimate <i className="fas fa-question-circle"></i></span>
                                <span className="text-gray-900">$5.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Tax estimate <i className="fas fa-question-circle"></i></span>
                                <span className="text-gray-900">$8.32</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg mb-4">
                                <span className="text-gray-900">Order total</span>
                                <span className="text-gray-900">$112.32</span>
                            </div>
                         <Link to="/user/cart/order">   <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Checkout</button></Link>
                        </div> */}

                {/* <Link className="bg-orange-500 px-3 text-white w-full py-2">PROCEED TO CHECKOUT</Link> */}
            </div>
        </div>
    </div>}
</div>
  )
}

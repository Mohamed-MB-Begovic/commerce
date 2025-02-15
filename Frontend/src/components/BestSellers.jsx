/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
// import Love from "./Icons/Love"
import {Link, NavLink} from 'react-router-dom'
import Love from "./Icons/Love"
import { useUser } from "../context/UserContext"
import axios from "axios"


export default function BestSellers() {
    const [tab,setTab]=useState('Men')
    const {setActiveLink}=useUser();
const [isLoading,setIsloading]=useState(false)
    // const products=[
        
    // ]

    

    const [products,setProducts]=useState([
        {
            id:1,
            name:'Beige knitted elastic runner shoes',
            price:100,
            quantity:20,
            
        },
        {
            id:2,
            name:'Beige knitted elastic runner shoes',
            price:100,
            quantity:20
        },
        {
            id:3,
            name:'Beige knitted elastic runner shoes',
            price:100,
            quantity:20
        }
    ])

    useEffect(()=>{
      
        const getProduct=async ()=>{
    //  console.log(products)
         try {
     
             setIsloading(true)
             const {data}=await axios.get(`/api/products/view/${tab}`)
             setProducts(Array.isArray(data)?data:products)
            //  console.log(data)
           //   setMainImg(data.thumbnail)
             setIsloading(false)
         } catch (error) {
             console.log(error)
             setIsloading(false)
         }
        }
        getProduct()
     },[tab])

    //  if(!products || products.length<=0) <h2>loading...</h2>
  return (
    <div className="m-10" data-aos="fade-up" data-aos-delay-200 data-aos-duration="1000">
<h2 className="text-center font-medium font-sans text-[1.3rem] mb-4"><span className="text-orange-400">T</span>op <span className="text-orange-400">p</span>roducts</h2>      
<p className="text-center text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, fugit natus.</p>
{/* tabs */}
<div className="flex items-center justify-center gap-10 mt-5">
    <div onClick={()=>setTab('Men')} className={`p-2 ${tab==="Men" ? `bg-orange-400 text-white `:""}`}>Men</div>
    <div onClick={()=>setTab('featured products')} className={`p-2 ${tab==="featured products" ? `bg-orange-400 text-white `:""}`}>Featured Products</div>
    <div onClick={()=>setTab('on sales')} className={`p-2 ${tab==="on sales" ? `bg-orange-400 text-white `:""}`}>On Sales</div>
</div>
{
    tab==="Men" &&
    <>
    {/* mens */}
<div className="flex justify-center flex-wrap  gap-5 mt-10">
   { products && products.length >0 ?(
    products.map((product)=>(
        <>
        <Link to={`/user/product/${product._id}`}  key={product._id} className="w-[260px] h-[55vh] relative  ">
        <div className="">
        {/* <p className="absolute left-3 bg-green-500 text-white px-3 py-[2px]  rounded-sm top-2">new</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
        className="size-8 absolute right-3 top-2 bg-white p-[7px] text-black rounded-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg> */}
        
        </div>
            <img src={product.thumbnail || './f1.jpg'} alt="product img" className="h-[80%] w-[300px] object-cover"/>
            <p className="mt-2  text-gray-800 capitalize truncate">{product.name}</p>
            <p className=" mt-1 text-gray-600 font-bold">${product.price}</p>
            </Link>
        </>
         
    ))): <h2>no products found</h2>
   }
   
 
</div>
    </>
}
{
    tab==="featured products" &&
    <>
    {/* featured sellers */}
    <div className="mt-5 grid items-center justify-center mx-32 md:grid-cols-2 lg:grid-cols-4 ">
    <div className=" hover:cursor-pointer p-4">
        <img src="./n1.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-2 mt-3 flex gap-[12rem] items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
    <div className=" hover:cursor-pointer p-4">
        <img src="./n2.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-2 mt-3 flex gap-[12rem] items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
    <div className=" hover:cursor-pointer p-4">
        <img src="./n3.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-2 mt-3 flex gap-[12rem] items-center">
            {/* <p className="line-through text-orange-400">$21</p> */}
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
    <div className=" hover:cursor-pointer p-4">
        <img src="./n4.jpg" alt="product image" className="rounded-sm object-contain mb-4" />
        <p className="px-2 text-gray-700">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, officia suscipit. </p>
        <div className=" px-2 mt-3 flex gap-[12rem] items-center">
            <p className="font-medium">$21</p>
            <Love/>
        </div>
    </div>
  
</div>
    </>
}
{
    tab==="on sales" &&
    <>
    {/* on sales */}
<div className="grid items-center justify-center px-20 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
    <div className="w-[260px] h-[55vh] relative ">
    <img src="./p-1.jpg" alt="product img" className="h-[80%] object-fill"/>
    <p className="mt-2 text-center text-gray-800 capitalize">lorem ipsum dolor</p>
    <p className="text-center mt-1 text-gray-600 font-bold">$900</p>
    </div>
    <div className="w-[260px] h-[55vh] ">
    <img src="./p-1.jpg" alt="product img" className="h-[80%] object-fill"/>
    <p className="mt-2 text-center text-gray-800 capitalize">lorem ipsum dolor</p>
    <p className="text-center mt-1 text-gray-600 font-bold">$900</p>
    </div>
    <div className="w-[260px] h-[55vh] ">
    <img src="./p-1.jpg" alt="product img" className="h-[80%] object-fill"/>
    <p className="mt-2 text-center text-gray-800 capitalize">lorem ipsum dolor</p>
    <p className="text-center mt-1 text-gray-600 font-bold">$900</p>
    </div>
    <div className="w-[260px] h-[55vh] ">
    <img src="./p-1.jpg" alt="product img" className="h-[80%] object-fill"/>
    <p className="mt-2 text-center text-gray-800 capitalize">lorem ipsum dolor</p>
    <p className="text-center mt-1 text-gray-600 font-bold">$900</p>
    </div>
</div>
    </>
}

<NavLink to="/user/men" onClick={()=>setActiveLink('mens')}>
    <button  className="bg-orange-400   flex mx-auto py-2 px-4 mt-10 mb-20 font-medium">View All Products</button>
    </NavLink>
    </div>
  )
}

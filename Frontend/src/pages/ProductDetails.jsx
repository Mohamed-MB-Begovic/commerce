/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useShopContext } from '../context/Context';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast'
import RelatedProducts from '../components/RelatedProducts';
export default function ProductDetails() {
  const [mainImg,setMainImg]=useState('/d2.png')
  const [activeTab, setActiveTab] = useState('description');
  const {AddToCart,updateQuantity} =useShopContext();
  const {user} =useUser();
  const [product,setProduct]=useState()
 



const [loading,setIsloading]=useState(false)
const [quantity,setQuantity]=useState(1)
const [relatedProducts,setRelatedProducts]=useState(null)
const [size,setSize]=useState("")
const {id}=useParams();

useEffect(()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    
},[id])
  useEffect(()=>{
    setSize('')
  },[id])

// const relatedProducts = [
//     {
//       id: 1,
//       name: 'Product 1',
//       image: '/f1.jpg',
//       price: 19.99,
//     },
//     {
//       id: 2,
//       name: 'Product 2',
//       image: '/f2.jpg',
//       price: 29.99,
//     },
//     {
//       id: 3,
//       name: 'Product 3',
//       image: '/f3.jpg',
//       price: 39.99,
//     },
//     {
//       id: 4,
//       name: 'Product 4',
//       image: '/f4.jpg',
//       price: 49.99,
//     },
//   ];
useEffect(()=>{     
    const getProduct=async ()=>{
     try {
         setIsloading(true)
         const {data}=await axios.get(`/api/products/${id}`)
        //  console.log(data.data[0])
         setProduct(data.data[0])
         setMainImg(data.data[0].thumbnail)
        //  console.log(data.relatedProducts)
         setMainImg(data.data[0].thumbnail)
        setRelatedProducts(data.relatedProducts)
         setIsloading(false)
     } catch (error) {
         console.log(error)
         setIsloading(false)
     }
    }
    getProduct()
 },[id])

if(!product) return <h2>loading....</h2>
  return (
    <div className="p-4">
 
    <div className="grid grid-cols-1 lg:grid-cols-2 px-4 gap-4">
        <div className="w-[100%]">
            <img src={mainImg} alt="Dark yellow lace cut out swing dress" 
            className="w-[100%]   object-center mb-4"/>
            {/* other product images */}
            {/* <div className="flex space-x-2">
                <img src="/d2.png" alt="Thumbnail 3" className="w-20 h-20" onClick={()=>setMainImg('/d2.png')}/>
                <img src="/d-4.png" alt="Thumbnail 1" onClick={()=>setMainImg('/d-4.png')} className="w-20 h-20"/>
            </div> */}
        </div>
        <div className="pl-2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
                <div className="text-yellow-500">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                </div>
            </div>
            <div className="text-2xl text-yellow-600 font-bold mb-4">${product.price}</div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            {/* <div className="mb-4">
                <span className="font-bold">Color:</span>
                <div className="flex space-x-2 mt-2">
                    <img src="/d2.png" alt="Color option 1" className="w-10 h-10 border"/>
                    <img src="/d-4.png" alt="Color option 2" className="w-10 h-10 border"/>
                </div>
            </div> */}
            <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="size">Size:</label>
                <select id="size" className="border p-2 w-full" value={size} onChange={(e)=>{setSize(e.target.value)
                }}>
                    <option value="">Select a size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <a href="#" className="text-sm text-gray-500 hover:underline mt-2 inline-block">size guide</a>
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="quantity">Qty:</label>
                <input type="number" id="quantity" className="border p-2 w-16" defaultValue="1"
                onChange={(e)=>{
                    updateQuantity(e.target.value,product)
                    setQuantity(e.target.value)
                }
              }/>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded mb-4 w-full" disabled={user?.role==="admin"} onClick={()=>{
               console.log('object')
               if(user){
                if(size ===''){
                    toast.error('please select your size')
                }else{
                AddToCart(product,user,quantity,size)  
                toast.success("product added to cart")
                }
               }else{
                toast.error('please sign in first to add to chart')
               }
                }}>ADD TO CART</button>
            {/* <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-500 hover:underline">Add to Wishlist</a>
                <a href="#" className="text-gray-500 hover:underline">Add to Compare</a>
            </div> */}
            <div className="text-gray-500 mb-4">
                <span className="font-bold">Category:</span> {
                    product.subCategory?.map(category=>(
                    <>
                  <span className='capitalize'>{`${ category } , `}</span> 
                    </>
                    ))
                }
            </div>
            <div className="flex space-x-4">
                <span className="font-bold">Share:</span>
                <a href="#" className="text-gray-500"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-500"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-500"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-500"><i className="fab fa-pinterest"></i></a>
            </div>
        </div>
    </div>
    <div className="mt-8">
                        <div className="border-b border-gray-300 mb-4">
                            <ul className="flex space-x-8">
                                <li className={`pb-2 cursor-pointer ${activeTab === 'description' ? 'border-b-2 border-yellow-600' : ''}`} onClick={() => setActiveTab('description')}>Description</li>
                                {/* <li className={`pb-2 cursor-pointer ${activeTab === 'additional' ? 'border-b-2 border-yellow-600' : ''}`} onClick={() => setActiveTab('additional')}>Additional Information</li> */}
                                <li className={`pb-2 cursor-pointer ${activeTab === 'shipping' ? 'border-b-2 border-yellow-600' : ''}`} onClick={() => setActiveTab('shipping')}>Shipping & Returns</li>
                                <li className={`pb-2 cursor-pointer ${activeTab === 'reviews' ? 'border-b-2 border-yellow-600' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews (2)</li>
                            </ul>
                        </div>
                        <div>
                            {activeTab === 'description' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Product Information</h2>
                                    <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                                    <ul className="list-disc list-inside text-gray-700 mb-4">
                                        <li>Nunc nec porttitor turpis. In eu risus enim, in vulputate velit mollis nec.</li>
                                        <li>Vivamus finibus vel mauris ut vehicula.</li>
                                        <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                                    </ul>
                                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                                </div>
                            )}
                            {/* {activeTab === 'additional' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                                    <p className="text-gray-700">Here you can add additional information about the product.</p>
                                </div>
                            )} */}
                            {activeTab === 'shipping' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Shipping & Returns</h2>
                                    <p className="text-gray-700">Here you can add information about shipping and returns.</p>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                                    <p className="text-gray-700">Here you can add customer reviews.</p>
                                </div>
                            )}
                        </div>
                    </div>
    <RelatedProducts products={relatedProducts}/>
</div>
  )
}

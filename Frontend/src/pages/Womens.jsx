/* eslint-disable react/no-unescaped-entities */
import {Link} from 'react-router-dom'
import ProductLoadingSkeleton from '../components/ProductLoadingSkeleton';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Womens() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchedText,setSearchedText]=useState('')
  // const [getfunction,setgetFuncton]=useState()
  
  useEffect(() => {
   const getProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/api/products/womens');
        setProducts(data);
        setFilteredProducts(data); // Initially, show all products
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getProduct();
  }, []);


  const handleChange = async (e) => {
    const text = e.target.value;
    setSearchedText(text)
    const filtererdData = await products.filter((product) =>
      product.name.toLowerCase().includes(text)
    );
    if (filtererdData.length > 0) {
      setFilteredProducts(filtererdData);
    
    }
    if (filtererdData.length === 0) {
      // getProduct();
      setFilteredProducts()

    }
    if (!text) {
      // getProduct();
    }
  };


  return (
    <div className="min-h-screen" >
         <div className="container  lg:mx-auto lg:px-8 py-8">
 <div className="">
     <div className="flex justify-between items-center flex-wrap gap-4 px-4 mb-6">
              <h2 className="text-lg font-bold">Women's Collections</h2>
              <div className="flex gap-3">
              <div className="flex items-center relative -ml-2 ">
              <input type="text" placeholder="Search in..." 
              className={`border rounded-full py-2 px-4 w-[300px] outline-none text-sm text-gray-700 font-sans `}
           onChange={handleChange}
              />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 

              // onClick={()=>setIsHidden(!isHidden)}
viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
className="h-6 w-6 absolute right-3 text-orange-400"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            </div>
              <select className="hidden lg:block  border px-2 py-1 rounded">
                <option>Sort by: Relevant</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
              </div>
            </div>

  <div className="min-w-4xl flex justify-center flex-wrap  gap-5 ">
  
  {isLoading &&<div className='w-[90rem] px-4'> 
    <ProductLoadingSkeleton/>
    </div>}
  {/* {isLoading && <ProductLoadingSkeleton/>} */}
  {/* {!filteredProducts && <h2 className="text-center w-full mx-auto">{`no product found like ${searchedText}`}</h2>} */}

            <div data-aos="fade-up" data-aos-delay-200 data-aos-duration="1000" 
            // className="grid lg:grid-cols-4 md:grid-cols-2 p-8"
className="grid grid-cols-2 px-2 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 " 
            
            >
              {/* Sample Products */}
              {filteredProducts?.map((product) => (
                <Link to={`/user/product/${product._id}`} key={product._id}>
                 <div className=" lg:min-h-[60vh]  lg:w-[100%]">  
                    <img
                      src={product.thumbnail}
                      alt="Product"
                      // className="h-72 w-full object-cover mb-4"
                      className="h-[30vh] w-full lg:w-[20rem]  lg:h-[60vh] object-cover mb-4 rounded-sm" 
                    />
                    <h3 className="font-bold truncate">{product.name}</h3>
                    <p className="text-gray-500">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            {!isLoading && filteredProducts?.length === 0 && (
              <div className="w-screen text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700">
                  No products found.
                </h3>
                {/* <p className="text-gray-500">Try adjusting your filters.</p> */}
              </div>
            )}

 </div>
 </div>
 </div>
 
  )
}




// className="h-[30vh] w-full lg:w-[100%] lg:h-72 p- object-cover mb-4 rounded-sm"   image 
{/* <div className=" lg:min-h-[60vh]  lg:w-full p-2 ">  each card */}
// className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 " the main card

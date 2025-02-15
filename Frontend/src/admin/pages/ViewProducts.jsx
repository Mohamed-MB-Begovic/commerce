/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline';
import axios from 'axios'
import Loading from '../../components/Loading.jsx';
const ViewProducts = () => {
// const [products,setProducts]=useState(null)
 

  // const [products, setProducts] = useState([
  //   { id: 1, name: 'Product A', price: '$20.00', quantity: 100, status: 'in stock', stockQuantity: 100 },
  //   { id: 2, name: 'Product B', price: '$15.00', quantity: 50, status: 'in stock', stockQuantity: 100 },
  //   { id: 3, name: 'Product C', price: '$25.00', quantity: 200, status: 'in stock', stockQuantity: 100 },
  //   { id: 4, name: 'Product D', price: '$30.00', quantity: 150, status: 'in stock', stockQuantity: 100 },
  //   { id: 5, name: 'Product E', price: '$18.00', quantity: 300, status: 'in stock', stockQuantity: 100 },
  //   { id: 6, name: 'Product F', price: '$22.00', quantity: 400, status: 'in stock', stockQuantity: 100 },
  // ]);
  const [products, setProducts] = useState()
  const [loading,setLoading]=useState(false)
      const getProducts=async ()=>{
      // console.log('object')
    try {
      setLoading(true)
      const {data}=await axios.get('/api/products')
      setProducts(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('error in fetching products',error)
    }
    }
  useEffect(()=>{
    getProducts()
    },[])
// console.log(products)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // To hold the selected product for viewing
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewDetails = (product) => {
    setSelectedProduct(product); // Open the modal with the selected product's details
  };

  const closeModal = () => {
    setSelectedProduct(null); // Close the modal
  };

  const handleDelete=async(id)=>{
    // console.log(id)
    try {
      const {res}=await axios.delete(`/api/products/${id}`)
      // console.log(res)
      setProducts(products.filter(product=>product._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  if(loading)return <Loading/>
 
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
 
   {!products ?<h2>error in fetching products data</h2> : products?.length <=0 ?<h2 className='font-medium  capitalize'>there is no products yet</h2> :<>
   <table className="min-w-full table-fixed border-collapse border border-gray-400">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-6 py-3 text-left border border-gray-400">Image</th>
            <th className="px-6 py-3 text-left border border-gray-400  truncate">Product Name</th>
            <th className="px-6 py-3 text-left border border-gray-400 truncate">Description</th>
            <th className="px-6 py-3 text-left border border-gray-400">Price</th>
            <th className="px-6 py-3 text-left border border-gray-400 w-10">Stock Quantity</th>
            <th className="px-6 py-3 text-left border border-gray-400">Status</th>
            <th className="px-6 py-3 text-left border border-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          { currentItems?.map((product, index) => (
            <tr key={product._id} className={`hover:bg-gray-700 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-transparent'}`}>
              <img src={product.thumbnail} alt='product thumbnail' className="border-gray-400 w-12 mx-6  "/>
              <td className="px-6 py-3 border border-gray-400 truncate">{product.name}</td>
              <td className="px-6 py-3 border border-gray-400 truncate max-w-[200px]">{product.description}</td>
              <td className="px-6 py-3 border border-gray-400">{product.price}</td>
              <td className="px-6 py-3 border border-gray-400">{product.stockQuantity}</td>
              <td className="px-6 py-3 border border-gray-400">{product.status}</td>
              <td className="px-6 py-3 border border-gray-400   space-x-4 ">
                <button
                  onClick={() => console.log(`Update product with ID: ${product._id}`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => console.log(`Delete product with ID: ${product._id}`)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" onClick={()=>handleDelete(product._id)}/>
                </button>
                <button
                  onClick={() => handleViewDetails(product)} // Open the modal with product details
                  className="text-green-500 hover:text-green-700"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {/* Pagination */}
      <div className="mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(products?.length / itemsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      </>
 }
      {/* Modal for viewing product details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
            <p><strong>Stock Quantity:</strong> {selectedProduct.stockQuantity}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;

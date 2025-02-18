/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { PencilIcon  } from '@heroicons/react/outline';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample data
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/Table"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const sampleOrders = [
  { 
    ID: 1, 
    firstName: 'John Doe', 
    status: 'processing', 
    createdAt: '2024-11-01', 
    subtotal: 150.0, 
    streetAddress: '123 Elm Street, City', 
    orderItems: [
      { price: 'Item 1', quantity: 2, productImage: 'https://via.placeholder.com/50' }, 
      { price: 'Item 2', quantity: 1, productImage: 'https://via.placeholder.com/50' }
    ]
  },
  { 
    ID: 2, 
    firstName: 'Jane Smith', 
    status: 'Shipped', 
    createdAt: '2024-10-25', 
    subtotal: 200.0, 
    streetAddress: '456 Oak Avenue, City', 
    orderItems: [
      { price: 'Item 3', quantity: 1, productImage: 'https://via.placeholder.com/50' }, 
      { price: 'Item 4', quantity: 3, productImage: 'https://via.placeholder.com/50' }
    ]
  },
  { 
    ID: 3, 
    firstName: 'Michael Lee', 
    status: 'Delivered', 
    createdAt: '2024-11-05', 
    subtotal: 50.0, 
    streetAddress: '789 Pine Road, City', 
    orderItems: [
      { price: 'Item 5', quantity: 1, productImage: 'https://via.placeholder.com/50' }
    ]
  },
  // Add more orders here...
];

const Orders = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrders] = useState('');
  const [selectedStatus, setSelectedStatus]  = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null); // For order details modal
  const [showOrderModal, setShowOrderModal] = useState(false); // For controlling modal visibility
  const [orderStatus, setOrderStatus] = useState(''); // For status in modal
  const [loading,setLoading]=useState(false)
  const [value, setValue] = useState("");

  useEffect(() => {
    // console.log(filteredOrders)
    filterOrders();
  }, [selectedStatus]) ;
// useEffect(()=>{
//   getOrders();
// },[])
  const getOrders=async ()=>{
    // console.log('object')
  try {
    setLoading(true)
    const {data}=await axios.get('/api/orders')
      setFilteredOrders(data)
      setOrders(data)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.log('error in fetching orders',error)
  }
  }

  const filterOrders = () => {
    if(selectedStatus){
      if(selectedStatus !=='all'){
        setFilteredOrders(orders.filter(order => order.status === selectedStatus) )
        }
        else{
          setFilteredOrders(orders)
        }
    }

    else {
      getOrders() 
      // ||
      // setFilteredOrders(orders);
    }
  };


  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders?.slice(indexOfFirstOrder, indexOfLastOrder);

  const openOrderDetails = (order) => {
    // console.log(order.status)
    setSelectedOrder(order);

    setOrderStatus(order.status); // Set the current status in the modal
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };
  const chooseOption = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order._id === id ? { ...order, status: newStatus } : order
    ));
    filterOrders();
  };

  const handleSaveStatus = async() => {
    // setOrders(orders.map(order => 
    //   order._id === selectedOrder._id ? { ...order, status: orderStatus } : order
    // ));
    if (orderStatus === selectedOrder.status) {
      return toast.error("he is already a" + orderStatus);
    }
    try {
      const {response} = await axios.post(
        "/api/orders/" + selectedOrder._id,
        { orderStatus }
      );
   filterOrders();
    closeOrderModal(); 
    toast.success('successfully updated ')
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
    // Close the modal after saving
  };
if(loading)return <h2>Loading....</h2>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Orders Management</h1>
 
    {  
      currentOrders?.length>0 &&(
        <>
      <div className="mb-6 flex justify-between items-center">
      {/* tabs */}
        <div className="flex space-x-4">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSelectedStatus('all')}
          >
            All Orders
          </button>
          {/* <button
            className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => setSelectedStatus('Pending')}
          >
            Pending
          </button> */}
          <button
            className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={() => setSelectedStatus('processing')}
          >
            processing
          </button>
          <button
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setSelectedStatus('Shipped')}
          >
            Shipped
          </button>
          <button
            className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => setSelectedStatus('Delivered')}
          >
            Delivered
          </button>
        </div>
      </div>
            {/* table of content */}
    <Table >
        <TableHeader>
          <TableRow  >
            <TableHead >ID</TableHead>
            <TableHead >Customer</TableHead>
            <TableHead >Date</TableHead>
            <TableHead >Amount</TableHead>
            <TableHead >Status</TableHead>
            <TableHead >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentOrders?.map((order) => (
            <TableRow key={order.id} className="border-b">
              <TableCell className="px-4 py-2">{order.ID}</TableCell>
              <TableCell className="px-4 py-2">{order.firstName}</TableCell>
              <TableCell className="px-4 py-2">{order.createdAt}</TableCell>
              <TableCell className="px-4 py-2">${order?.subtotal?.toFixed(2)}</TableCell>
              <TableCell className="px-4 py-2">
                <span className={`px-2 py-1 rounded ${order.status === 'processing' ? 'bg-yellow-300' : order.status === 'Shipped' ? 'bg-green-300' : 'bg-gray-300'}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="px-4 py-2 flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  onClick={() => openOrderDetails(order)}
                >
              <PencilIcon className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> 

{/* pagination */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(Math.ceil(filteredOrders?.length / ordersPerPage))].map((_, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      </>

)}
         
      {/* if there is no orders */}
      {!loading && currentOrders.length === 0 && (
              <div className=" text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700">
                  No orders found.
                </h3>
                {/* <p className="text-gray-500">Try adjusting your filters.</p> */}
              </div>
            )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div>
              <p><strong>Customer:</strong> {selectedOrder.firstName}</p>
              <p><strong>Order ID:</strong> {selectedOrder.ID}</p>
              <p><strong>Date:</strong> {selectedOrder.createdAt}</p>
              <p><strong>Address:</strong> {selectedOrder.streetAddress}</p>

              <div className="mt-4">
                <strong>Items:</strong>
                <div className="space-y-4 mt-2">
                  {selectedOrder.orderItems.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <img src={item.productImage} alt={item.name} className="w-12 h-12 rounded-md" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <strong>Total Amount:</strong> ${selectedOrder.subtotal.toFixed(2)}
              </div>

              <div className="mt-4">
                <label className="block mb-2">Update Status:</label>
                <select
                  value={orderStatus}
                  onChange={(e)=>setOrderStatus(e.target.value)}
                  className="block w-full border border-gray-300 p-2 rounded"
                >
                  <option value="Shipped" className={`${orderStatus==="Shipped"? 'bg-blue-500 text-white':""}`}>Shipped</option>
                  <option value="processing" className={`${orderStatus==="processing"? 'bg-blue-500 text-white':""}`}>Processing</option>
                  <option value="Delivered" className={`${orderStatus==="Delivered"? 'bg-blue-500 text-white':""}`}>Delivered</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  onClick={handleSaveStatus}
                >
                  Save
                </button>
                <button
                  className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  onClick={closeOrderModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import axios from 'axios'
const sampleOrders = [
  {
    _id: "6773b3cb375efc28ccf689c5",
    firstName: "Tom",
    lastName: "Del",
    phoneNumber: "3849839849",
    streetAddress: "39849389",
    apartment: "9384938",
    country: "Somalia",
    paymentMethod: "E-dahab",
    subtotal: 21,
    status: "Processing",
    orderItems: [
      {
        quantity: 1,
        price: 21,
        productImage: "http://res.cloudinary.com/dkghkvnh7/image/upload/v1732606741/fh4ei5a8ptmax51dtzo5.jpg",
      },
    ],
    createdAt: "2024-12-31T09:05:15.659Z",
  },
  {
    _id: "6773b3cb375efc28ccf689d7",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "1234567890",
    streetAddress: "123 Main St",
    apartment: "Apt 4B",
    country: "Somalia",
    paymentMethod: "Zaad",
    subtotal: 50,
    status: "Shipped",
    orderItems: [
      {
        quantity: 2,
        price: 25,
        productImage: "http://res.cloudinary.com/dkghkvnh7/image/upload/v1732606741/sample.jpg",
      },
    ],
    createdAt: "2024-12-30T08:15:10.123Z",
  },
];

const statusColors = {
  processing: "bg-yellow-500",
  Shipped: "bg-blue-500",
  Delivered: "bg-green-500",
};

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading]=useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
       try {
         setIsLoading(true);
         const { data } = await axios.get('/api/orders/user');
         setOrders(data);
 
         setIsLoading(false);
       } catch (error) {
         console.log(error);
         setIsLoading(false);
       }
     };
     getOrders();
   }, []);
 
  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {isLoading && <h2 className="w-full m-auto">Loading.... </h2>}
      <Select onValueChange={setFilter}>
        <SelectTrigger className="w-40 mb-4">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardContent className="p-4 grid grid-cols-1 gap-3 lg:grid-cols-2 md:grid-cols-2">
                  <div className="">
                    <p className="text-lg font-semibold">Order #{order._id}</p>
                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm">Total: <span className="font-bold">${order.subtotal}</span></p>
                    <p className="text-sm">Payment: {order.paymentMethod}</p>
                  </div>
                  <div className="flex items-center gap-4 lg:justify-self-end md:justify-self-end">
                    <span className={`px-2 py-1 rounded-lg text-white ${statusColors[order.status]}`}>{order.status}</span>
                    <Link to={`/user/order/${order._id}`} variant="outline" >View Details</Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}

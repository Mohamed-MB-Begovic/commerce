import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios'
export default function OrderDetails() {
  const { id } = useParams();
  const [isLoading,setIsLoading]=useState(false)
  const [order,setOrders] = useState({});
  useEffect(() => {
    const getOrder = async () => {
      // console.log(orderId)
       try {
         setIsLoading(true);
         const { data } = await axios.get('/api/orders/user/'+id);
         setOrders(data[0]);
         setIsLoading(false);
       } catch (error) {
         console.log(error);
         setIsLoading(false);
       }
     };
     getOrder();
   }, []);
 
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {!order && <h2>loading...</h2>}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl ring-1 ring-gray-900/5">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Order Summary
              </h1>
              <p className="mt-2 text-gray-500">Order ID: {order._id}</p>
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              {order.status}
            </span>
          </div>

          {/* Customer & Payment Info */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Customer Information
                </h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Name</dt>
                    <dd className="font-medium">
                      {order.firstName} {order.lastName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Contact</dt>
                    <dd className="font-medium">{order.phoneNumber}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {order.streetAddress}, {order.apartment}
                  <br />
                  {order.country}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Details
                </h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Method</dt>
                    <dd className="font-medium">{order.paymentMethod}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Total Amount</dt>
                    <dd className="text-2xl font-bold text-gray-900">
                      ${order.subtotal}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Order Date
                </h3>
                <p className="text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
          <div className="space-y-4">
            {order.orderItems?.map((item, index) => (
              <Card key={index} className="hover:bg-gray-50 transition-colors">
                <CardContent className="flex   p-4 gap-4 sm:gap-6">
                  <img
                    src={item.productImage}
                    alt="Product"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-gray-100"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h4 className="font-medium text-gray-900">
                          Product {index + 1}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => window.history.back()}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              ← Back to Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

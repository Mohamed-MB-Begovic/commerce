import {useOrder} from '../context/OrderContext'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const ThankYouMessage = () => {
const {order}=useOrder();
// console.log(items)
//   // const items=[
//   //   {
//   //     quantity: 1,
//   //     price: 21,
//   //     productImage: "http://res.cloudinary.com/dkghkvnh7/image/upload/v1732606741/fh4ei5a8ptmax51dtzo5.jpg",
//   //   },
//   //   {
//   //     quantity: 1,
//   //     price: 21,
//   //     productImage: "http://res.cloudinary.com/dkghkvnh7/image/upload/v1732606741/fh4ei5a8ptmax51dtzo5.jpg",
//   //   },
//   //   {
//   //     quantity: 1,
//   //     price: 21,
//   //     productImage: "http://res.cloudinary.com/dkghkvnh7/image/upload/v1732606741/fh4ei5a8ptmax51dtzo5.jpg",
//   //   },
//   // ]
const navigate=useNavigate()

  const orderTotal = order.reduce((total, item) => total + (item.quantity * item.price), 0);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 my-8">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Thank you for your order! 🎉
      </h2>

      <div className="space-y-6">
        {order.map((item, index) => (
          <div 
            key={index}
            className="flex items-center border-b border-gray-200 pb-6 last:border-0"
          >
            <img
              src={item.productImage}
              alt="Product"
              className="w-24 h-24 object-cover rounded-lg shadow-sm"
            />

            <div className="ml-6 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">Quantity</p>
                  <p className="text-lg font-medium">{item.quantity}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500">Price Each</p>
                  <p className="text-lg font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="col-span-2">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="font-semibold">Item Total</span>
                    <span className="text-lg font-bold text-indigo-600">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total Amount:</span>
          <span className="text-2xl font-bold text-indigo-600">
            ${orderTotal.toFixed(2)}
          </span>
        </div>
        <div className="mt-8 flex justify-end">
            <Button
              // onClick={() => window.history.back()}
              onClick={() =>{ 
                navigate('/')
                 window.location.reload();
              }}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              ← Back to Home
            </Button>
          </div>
      </div>

      <p className="mt-8 text-center text-gray-500 text-sm">
        Your order will be processed within 24 hours. We'll send you a confirmation email shortly!
      </p>
    </div>
  );
};

export default ThankYouMessage;
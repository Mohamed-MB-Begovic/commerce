/* eslint-disable react/prop-types */
 
const OrderDetails = ({ order, onClose }) => (
  <div className="modal">
    <button onClick={onClose}>Close</button>
    <h2>Order Details</h2>
    <p><strong>Order ID:</strong> {order.id}</p>
    <p><strong>Customer:</strong> {order.customerName}</p>
    <p><strong>Status:</strong> {order.status}</p>
    <p><strong>Total:</strong> ${order.total}</p>
    <p><strong>Items:</strong></p>
    <ul>
      {order.items.map((item) => (
        <li key={item.id}>{item.name} - ${item.price}</li>
      ))}
    </ul>
  </div>
);

export default OrderDetails;
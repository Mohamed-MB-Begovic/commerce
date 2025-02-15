/* eslint-disable react/prop-types */

const OrderTable = ({ orders, loading, onRowClick }) => {
    if (loading) return <p>Loading...</p>;
    if (!orders.length) return <p>No orders found.</p>;
  
    return (
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} onClick={() => onRowClick(order)}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>${order.total}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default OrderTable;
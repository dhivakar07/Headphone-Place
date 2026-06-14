import Navbar from "./common/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import auth from "/src/config/firebase.js";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first!");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/order/${user.uid}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <section className="order_section">
        <h1>My Orders ✅</h1>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="order_details" key={order._id}>
              <h3>Order Summary</h3>
              {order.cartdetails.map((item) => (
                <div className="order_price" key={item._id}>
                  <b>{item.productName}</b>{" "}
                  <p>
                    Qty: {item.quantity} ₹{item.productOffprice * item.quantity}
                  </p>
                </div>
              ))}
              <h3>Total: ₹{order.total}</h3>
              <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </section>
    </>
  );
}

export default Order;

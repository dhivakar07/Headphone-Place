import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./common/Navbar";
import axios from "axios";
import auth from "/src/config/firebase.js";
function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartdetails = location.state?.cartdetails || [];

  let total = 0;
  cartdetails.forEach((item) => {
    total += item.quantity * item.productOffprice;
  });

  const handlePayment = (amount) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first!");
      return;
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      description: "Place Order",
      handler: async function (res) {
        alert("Payment Successful! ID: " + res.razorpay_payment_id);

        try {
          await axios.post("https://headphone-place.vercel.app/order", {
            userId: user.uid,
            paymentId: res.razorpay_payment_id,
            cartdetails,
            total,
          });

          console.log("Order saved successfully");
          navigate("/order", { state: { cartdetails } });
        } catch (err) {
          console.error("Error saving order:", err);
          alert("Order save failed. Please contact support.");
        }
      },
      prefill: {
        name: "Dhivakar",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    razorpay.on("payment.failed", function (res) {
      console.error(res.error);
      alert("Payment Failed. Please try again.");
    });
  };

  return (
    <>
      <Navbar />
      <section className="checkout_section">
        <h1>Place Order</h1>
        {cartdetails.map((item) => (
          <div className="checkout_prods" key={item._id}>
            <img src={item.productImg} alt="productImg" />
            <p>
              <b>{item.productName}</b> Qty:{item.quantity}
            </p>
            <p>₹{item.productOffprice * item.quantity}</p>
          </div>
        ))}
        <h3>Total: ₹{total}</h3>
        <button onClick={() => handlePayment(total)}>BUY NOW</button>
      </section>
    </>
  );
}

export default Checkout;

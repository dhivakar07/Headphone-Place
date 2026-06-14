import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "/src/config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./common/Navbar";

function Cart() {
  const [cartdetails, setcartdetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) return;
        const res = await axios.post(
          "https://headphone-place-one.vercel.app/cart",
          {
            userId: user.uid,
          },
        );
        setcartdetails(res.data);
        console.log("Cart items:", res.data);
      } catch (err) {
        console.error(err);
      }
    });
    return () => unsubscribe();
  }, []);

  let total = 0;
  if (Array.isArray(cartdetails)) {
    cartdetails.forEach((item) => {
      total += item.quantity * item.productOffprice;
    });
  }

  //handleInc
  const handleInc = async (id) => {
    try {
      const res = await axios.put(
        `https://headphone-place-one.vercel.app/cart/inc/${id}`,
      );
      setcartdetails((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: res.data.cartItem.quantity }
            : item,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  //handleDec
  const handleDec = async (id) => {
    try {
      const res = await axios.put(
        `https://headphone-place-one.vercel.app/cart/dec/${id}`,
      );
      setcartdetails((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, quantity: res.data.cartItem.quantity }
            : item,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  //handleRemove
  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(
        `https://headphone-place-one.vercel.app/cart/remove/${id}`,
      );
      alert("Item removed from cart!");
      console.log(res.data);
      setcartdetails((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to remove item");
      console.log(err);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartdetails } });
  };

  return (
    <>
      <Navbar />
      <section className="cart_section">
        <h1 className="cart_title">Shopping Cart</h1>
        {cartdetails.map((item) => (
          <div className="cart_box" key={item._id}>
            <div className="cart_box-one">
              <div className="cart_box-one-img">
                <img src={item.productImg} alt={item.productName} />
              </div>
              <div className="cart_box-one-text">
                <h3>{item.productName}</h3>
                <p>{item.plugtype}</p>
                <div className="cart_box-qty">
                  <p>Qty: {item.quantity}</p>
                  <p className="cart_qty-btn">
                    <small onClick={() => handleInc(item._id)}>+</small> |
                    <small onClick={() => handleDec(item._id)}>-</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="cart_box-two">
              <h3>₹ {item.productOffprice * item.quantity}</h3>
              <s>MRP. ₹ {item.productPrice * item.quantity}</s>
              <button
                className="cart_remove"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="cart_total">
          <p>
            Total : <b>₹{total}</b>
          </p>
        </div>
      </section>
      <div className="cart_checkout-btn">
        <button onClick={handleCheckout}>CHECK OUT</button>
      </div>
    </>
  );
}

export default Cart;

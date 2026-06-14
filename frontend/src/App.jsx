import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Home from "./components/Home";
import Addproduct from "./components/Addproduct";
import IEMs from "./components/Products/IEMs";
import IEMsDetail from "./components/ProductDetail/IEMsDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Headphones from "./components/Products/Headphones";
import HeadphonesDetail from "./components/ProductDetail/HeadphonesDetail";
import DACsAndAmps from "./components/Products/DACsAndAmps";
import DACsAndAmpsDetail from "./components/ProductDetail/DACsAndAmpsDetail";
import Order from "./components/Order";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />

          <Route path="/products/IEMs" element={<IEMs />} />
          <Route path="/products/Headphones" element={<Headphones />} />
          <Route path="/products/DACsAndAmps" element={<DACsAndAmps />} />

          <Route path="/product/IEMs/:id" element={<IEMsDetail />} />
          <Route
            path="/product/Headphones/:id"
            element={<HeadphonesDetail />}
          />
          <Route
            path="/product/DACsAndAmps/:id"
            element={<DACsAndAmpsDetail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

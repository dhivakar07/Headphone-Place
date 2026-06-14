import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import auth from "/src/config/firebase.js";
import Navbar from "../common/Navbar";
import Service from "../common/Service";
import Footer from "../common/Footer";
function DACsAndAmps() {
  const [admin, setadmin] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [eValue, seteValue] = useState("");
  const [filtered, setfiltered] = useState([]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (user.uid === "HtKb2vByrgPKwREbWHCnglHzhi42") {
        setadmin(true);
      } else {
        setadmin(false);
      }
    }
  });

  useEffect(() => {
    const getproduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/products/DACsAndAmps`,
        );
        setProducts(res.data);
        setfiltered(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getproduct();
  }, []);

  const handleproduct = (item) => {
    navigate(`/product/DACsAndAmps/${item._id}`);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    seteValue(searchValue);

    if (searchValue.trim() === "") {
      setfiltered(products);
    } else {
      const filteredList = products.filter((item) =>
        item.name.toLowerCase().includes(searchValue.trim().toLowerCase()),
      );
      setfiltered(filteredList);
    }
  };

  const handleProductRemove = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/product/DACsAndAmps/remove/${id}`,
        {
          id,
        },
      );
      alert("Item removed from cart!");
      console.log(res.data);
      setProducts((prev) => prev.filter((item) => item._id !== id));
      setfiltered((prev) => prev.filter((item) => item._id !== id));
      console.log("Removed Product Successfully");
    } catch (err) {
      alert("Failed to Remove Product");
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <section className="product_section">
        <div className="product_banner">
          <img src="/Dacs-Banner.jpg" alt="" />
          <div className="product_banner-header">
            <h1>DACs & Amps</h1>
            <p>
              Browse the ultimate range of DACs & Amps, curated for every
              audiophile
            </p>
          </div>
        </div>
        <div className="search">
          <input
            type="search"
            name="search"
            placeholder="Search by product name"
            className="searchbox"
            value={eValue}
            onChange={handleSearch}
          />
        </div>
        <div className="product_container">
          {filtered.map((item) => {
            return (
              <div
                key={item._id}
                className="product_box"
                onClick={() => handleproduct(item)}
              >
                {admin && (
                  <button
                    className="product_remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductRemove(item._id);
                    }}
                  >
                    Remove
                  </button>
                )}
                <img src={item.img.url} alt="" />
                <div className="product_text">
                  <h2 className="product_name">{item.name}</h2>
                  <p className="product_feature">{item.feature}</p>
                  <p className="product_price">
                    ₹ {item.offprice} <s>MRP: ₹ {item.price}</s>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Service />
      <Footer />
    </>
  );
}
export default DACsAndAmps;

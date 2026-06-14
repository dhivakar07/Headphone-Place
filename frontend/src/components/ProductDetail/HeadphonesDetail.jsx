import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/Navbar";
import auth from "/src/config/firebase.js";
function HeadphonesDetail() {
  const { id } = useParams();
  const [productdetail, setProductdetail] = useState(null);
  const [plugtype, setplugtype] = useState("3.5mm");

  useEffect(() => {
    const getproductdetail = async () => {
      try {
        const res = await axios.get(
          `https://headphone-place.vercel.app/product/Headphones/${id}`,
        );
        setProductdetail(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getproductdetail();
  }, [id]);
  if (!productdetail) {
    return <p>Loading product details...</p>;
  }

  const handleAddtoCart = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in first!");
      return;
    }
    console.log(user.uid);
    try {
      await axios.post("https://headphone-place.vercel.app/addtocart", {
        userId: user.uid,
        productId: productdetail._id,
        productName: productdetail.name,
        productImg: productdetail.img.url,
        productPrice: productdetail.price,
        productOffprice: productdetail.offprice,
        plugtype,
        quantity: 1,
      });
      alert(`${productdetail.name} added to cart!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <>
      <Navbar />
      <section className="product_detail-container">
        <div className="product_detail">
          <div className="product_detail-img">
            <img src={productdetail.img?.url} alt={productdetail.name} />
          </div>

          <div className="product_detail-content">
            <h2 className="product_detail-name">{productdetail.name}</h2>
            <p className="product_detail-feature">{productdetail.feature}</p>
            <p className="product_detail-price">
              ₹ {productdetail.offprice} <s>₹ {productdetail.price}</s>
            </p>
            <div className="product_plugtype">
              <p className="product_detail-plugtype">Plug Type : {plugtype}</p>
              <div className="product_plugtype-box">
                <button
                  className="product_plugtype-btn"
                  onClick={() => setplugtype("3.5mm")}
                >
                  3.5mm
                </button>
                <button
                  className="product_plugtype-btn"
                  onClick={() => setplugtype("Type-C")}
                >
                  Type-C
                </button>
              </div>
            </div>
            <button className="product_addtocart-btn" onClick={handleAddtoCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <section className="about_product-section">
        <h1>About {productdetail.name}</h1>
        <p>{productdetail.description}</p>
      </section>
      <section className="product_extras">
        <div className="product_warranty">
          <h1 className="product_warranty-title">1 Year Warranty</h1>
          <p className="product_warranty-desc">
            Don't sweat it, this {productdetail.name} comes with a 1 Year
            warranty from
            {productdetail.name} that covers manufacturing defects. All products
            featured on Headphone Place are backed by an original manufacturer's
            warranty.
          </p>
        </div>
        <div className="product_accessories">
          <h1>Accessories to Get you Started</h1>
          <ol>
            <li>Packaging Box*1</li>
            <li>Warranty Card *1</li>
            <li>Type-C / 3.5mm Earphone Cable x1</li>
            <li>Ear-Tips * 3 pairs (S, M, L)</li>
            <li>Manual * 1</li>
          </ol>
        </div>
      </section>
    </>
  );
}

export default HeadphonesDetail;

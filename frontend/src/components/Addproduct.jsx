import { useState } from "react";
import Navbar from "./common/Navbar";
import axios from "axios";

function Addproduct() {
  const [category, setcategory] = useState("");
  const [name, setname] = useState("");
  const [feature, setfeature] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState();
  const [offprice, setoffprice] = useState();
  const [file, setfile] = useState(null);

  const [imgurl, setimgurl] = useState("");
  const [coverimg, setcoverimg] = useState(false);
  const [error, seterror] = useState("");
  const [add, setadd] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      console.error("No file selected");
      setcoverimg(false);
      return;
    }
    setfile(selectedFile);
    setcoverimg(true);
    const previewUrl = URL.createObjectURL(selectedFile);
    setimgurl(previewUrl);
  };

  const handleAddProduct = async () => {
    if (!category || !name || !feature || !description || !price || !file) {
      seterror("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("feature", feature);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("offprice", offprice);
    formData.append("file", file);
    console.log(formData);
    try {
      setadd(true);
      const res = await axios.post(
        "https://headphone-place-one.vercel.app/addproduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setcategory("");
      setname("");
      setfeature("");
      setdescription("");
      setprice("");
      setoffprice("");
      setfile(null);
      setimgurl("");
      setcoverimg(false);
      seterror("Product Added Successfully...!");
      console.log("Saved in MongoDB:", res.data.product);
    } catch (err) {
      seterror("Failed to add product.");
      console.error(err);
    } finally {
      setadd(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="add_prod-section">
        <div className="add_prod-header">
          <h1>Add a New Product</h1>
        </div>
        <div className="add_prod-container">
          <label htmlFor="category">Select Product Category *</label>
          <select
            id="productType"
            className="selector"
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">-- Choose an option --</option>
            <option value="IEMs">IEMs</option>
            <option value="Headphones">Headphones</option>
            <option value="DACsAndAmps">DACsAndAmps</option>
            <option value="HomeAudio">HomeAudio</option>
          </select>

          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            placeholder="eg : Tangzu - Wan'er S.G 2 Red Lion Edition"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <label htmlFor="feature">Product Feature *</label>
          <input
            type="text"
            placeholder="eg : In Ears With 10mm Dynamic Driver"
            value={feature}
            onChange={(e) => setfeature(e.target.value)}
          />
          <label htmlFor="description">Product Description *</label>
          <textarea
            placeholder="Enter the product description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
          <label htmlFor="price">Product Price *</label>
          <input
            type="number"
            placeholder="eg : 2299"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
          <label htmlFor="offerprice">Product Offer Price *</label>
          <input
            type="number"
            placeholder="eg : 1299"
            value={offprice}
            onChange={(e) => setoffprice(e.target.value)}
          />
          <label htmlFor="image">Cover Image *</label>
          <div className="add_prod-imgbox">
            <div className="img_display">
              {coverimg ? (
                <img src={imgurl} />
              ) : (
                <small>No image seleted</small>
              )}
            </div>
            <div className="img_inputfile">
              <input
                className="add_prod-inputfile"
                type="file"
                onChange={handleFileChange}
              />
              <small>Upload a product image (JPEG/PNG).</small>
            </div>
          </div>
          {error && <p className="add_prod-error">{error}</p>}
          <button className="add_prod-btn" onClick={handleAddProduct}>
            {add ? "Adding.." : "Add Product"}
          </button>
        </div>
      </section>
    </>
  );
}

export default Addproduct;

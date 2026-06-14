const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("./cloudinary.config");
const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect MongoDB: " + err));

const ProductSchema = new mongoose.Schema({
  category: String,
  name: String,
  feature: String,
  description: String,
  price: Number,
  offprice: Number,
  img: { public_id: String, url: String },
});

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productName: String,
  productImg: String,
  productPrice: Number,
  productOffprice: Number,
  plugtype: String,
  quantity: { type: Number, default: 1 },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  paymentId: String,
  cartdetails: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

const models = {
  IEMs: mongoose.model("IEMs", ProductSchema, "IEMs"),
  Headphones: mongoose.model("Headphones", ProductSchema, "Headphones"),
  DACsAndAmps: mongoose.model("DACsAndAmps", ProductSchema, "DACsAndAmps"),
  HomeAudio: mongoose.model("HomeAudio", ProductSchema, "HomeAudio"),
  Cart: mongoose.model("Cart", CartSchema, "Cart"),
  Order: mongoose.model("Order", OrderSchema, "Order"),
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add Product
app.post("/addproduct", upload.single("file"), async (req, res) => {
  try {
    const { category, name, feature, description, price, offprice } = req.body;

    const Model = models[category];
    if (!Model) {
      return console.log("Invalid category");
    }

    cloudinary.uploader
      .upload_stream({ folder: "headphone_img" }, async (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error });
        }

        const product = await Model.create({
          category,
          name,
          feature,
          description,
          price,
          offprice,
          img: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        });
        res.json({ message: "Uploaded successfully", product });
      })
      .end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to Cart
app.post("/addtocart", async (req, res) => {
  try {
    const model = models["Cart"];
    const {
      userId,
      productId,
      productName,
      productImg,
      productPrice,
      productOffprice,
      plugtype,
      quantity,
    } = req.body;

    const alreadyAdded = await model.findOne({ userId, productId });
    if (alreadyAdded) {
      return res.json({
        message: "Item already in cart",
        cartItem: alreadyAdded,
      });
    }
    const cartItem = model.create({
      userId,
      productId,
      productName,
      productImg,
      productPrice,
      productOffprice,
      plugtype,
      quantity,
    });

    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch {
    res.status(500).json({ error: err.message });
  }
});

// Get Cart Product
app.post("/cart", async (req, res) => {
  try {
    const model = models["Cart"];
    const { userId } = req.body;
    const cartItems = await model.find({ userId });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Inc Product Qty in cart
app.put("/cart/inc/:id", async (req, res) => {
  try {
    const model = models["Cart"];
    const item = await model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    item.quantity += 1;
    await item.save();
    res.json({ message: "Quantity increased", cartItem: item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Dec Product Qty in cart
app.put("/cart/dec/:id", async (req, res) => {
  try {
    const model = models["Cart"];
    const item = await model.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      res.json({ message: "Quantity decreased", cartItem: item });
    } else {
      res.status(400).json({ error: "Quantity cannot be less than 1" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete Product in cart
app.delete("/cart/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = models["Cart"];
    const deletedItem = await model.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Item removed successfully", deletedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Order Product store
app.post("/order", async (req, res) => {
  try {
    const { userId, paymentId, cartdetails, total } = req.body;

    const Order = models["Order"]; // make sure you registered this model
    if (!Order) {
      return res.status(400).json({ error: "Order model not found" });
    }

    const order = await Order.create({
      userId,
      paymentId,
      cartdetails,
      total,
    });

    res.status(201).json({ message: "Order saved successfully", order });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: err.message });
  }
});

//Get Order
// GET all orders for a user
app.get("/order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const Order = models["Order"];
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get IEMs Products
app.get("/products/IEMs", async (req, res) => {
  try {
    const model = models["IEMs"];
    if (!model) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const products = await model.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching IEMs:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Headphones Products
app.get("/products/Headphones", async (req, res) => {
  try {
    const model = models["Headphones"];
    if (!model) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const products = await model.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching Headphones:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get DACsAndAmps Products
app.get("/products/DACsAndAmps", async (req, res) => {
  try {
    const model = models["DACsAndAmps"];
    if (!model) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const products = await model.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching DACsAndAmps:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//Remove IEMs Products
app.delete("/product/IEMs/remove/:id", async (req, res) => {
  try {
    const model = models["IEMs"];
    const { id } = req.params;
    const productDelete = await model.findByIdAndDelete(id);
    if (!productDelete) {
      console.log();
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Remove Headphones Product
app.delete("/product/Headphones/remove/:id", async (req, res) => {
  try {
    const model = models["Headphones"];
    const { id } = req.params;
    const productDelete = await model.findByIdAndDelete(id);
    if (!productDelete) {
      console.log();
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Remove DACsAndAmps Product
app.delete("/product/DACsAndAmps/remove/:id", async (req, res) => {
  try {
    const model = models["DACsAndAmps"];
    const { id } = req.params;
    const productDelete = await model.findByIdAndDelete(id);
    if (!productDelete) {
      console.log();
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get Specific IEMs Product Details
app.get("/product/IEMs/:id", async (req, res) => {
  const { id } = req.params;

  const model = models["IEMs"];
  if (!model) {
    return console.log("Invalid category");
  }

  const product = await model.findById(id);
  res.json(product);
});

//Get Specific Headphones Product Details
app.get("/product/Headphones/:id", async (req, res) => {
  const { id } = req.params;

  const model = models["Headphones"];
  if (!model) {
    return console.log("Invalid category");
  }

  const product = await model.findById(id);
  res.json(product);
});

//Get Specific DACsAndAmps Product Details
app.get("/product/DACsAndAmps/:id", async (req, res) => {
  const { id } = req.params;

  const model = models["DACsAndAmps"];
  if (!model) {
    return console.log("Invalid category");
  }

  const product = await model.findById(id);
  res.json(product);
});

module.exports = app;

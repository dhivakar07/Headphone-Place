# 🎧 Headphone Place

A full-stack e-commerce web application for premium audio gear — IEMs, Headphones, DACs & Amps, and Home Audio products. Built with React, Node.js, MongoDB, and integrated with Razorpay for payments.

🔗 **Live Demo:** [headphone-place-umjw.vercel.app](https://headphone-place-umjw.vercel.app)  
📁 **GitHub:** [github.com/dhivakar07/Headphone-Place](https://github.com/dhivakar07/Headphone-Place)

---

## 📸 Features

### 👤 User
- Sign up & Login via **Firebase Authentication**
- Browse products by category (IEMs, Headphones, DACs & Amps, Home Audio)
- View detailed product pages
- Add products to cart with plug type selection
- Increase / Decrease / Remove items in cart
- Checkout and pay securely via **Razorpay**
- View order history after successful payment

### 🔐 Admin
- Admin login through Firebase
- Add new products with image upload (via **Cloudinary**)
- Remove products from any category

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | Firebase |
| Image Storage | Cloudinary |
| Payment Gateway | Razorpay |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Vercel (Serverless) |

---

## 📂 Project Structure

```
Headphone-Place/
├── frontend/         # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── firebase.config.js
│   └── package.json
│
└── backend/          # Express.js backend
    ├── server.js
    ├── cloudinary.config.js
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Firebase project
- Cloudinary account
- Razorpay account

### 1. Clone the Repository

```bash
git clone https://github.com/dhivakar07/Headphone-Place.git
cd Headphone-Place
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/products/IEMs` | Get all IEM products |
| GET | `/products/Headphones` | Get all Headphone products |
| GET | `/products/DACsAndAmps` | Get all DAC & Amp products |
| GET | `/product/IEMs/:id` | Get specific IEM product |
| GET | `/product/Headphones/:id` | Get specific Headphone product |
| GET | `/product/DACsAndAmps/:id` | Get specific DAC & Amp product |
| POST | `/addproduct` | Add a new product (Admin) |
| DELETE | `/product/IEMs/remove/:id` | Remove an IEM product (Admin) |
| DELETE | `/product/Headphones/remove/:id` | Remove a Headphone product (Admin) |
| DELETE | `/product/DACsAndAmps/remove/:id` | Remove a DAC & Amp product (Admin) |

### Cart
| Method | Endpoint | Description |
|---|---|---|
| POST | `/addtocart` | Add item to cart |
| POST | `/cart` | Get cart items for a user |
| PUT | `/cart/inc/:id` | Increase item quantity |
| PUT | `/cart/dec/:id` | Decrease item quantity |
| DELETE | `/cart/remove/:id` | Remove item from cart |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/order` | Save order after payment |
| GET | `/order/:userId` | Get all orders for a user |

---

## 🧾 Database Schema

### Product
```js
{
  category: String,
  name: String,
  feature: String,
  description: String,
  price: Number,
  offprice: Number,
  img: { public_id: String, url: String }
}
```

### Cart
```js
{
  userId: String,
  productId: ObjectId,
  productName: String,
  productImg: String,
  productPrice: Number,
  productOffprice: Number,
  plugtype: String,
  quantity: Number
}
```

### Order
```js
{
  userId: String,
  paymentId: String,
  cartdetails: Array,
  total: Number,
  createdAt: Date
}
```

---

## 🚀 Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com)
- **Backend** is deployed as a serverless function on Vercel

Make sure to add all environment variables in your Vercel project settings before deploying.

---

## 📬 Contact

**Dhivakar**  
GitHub: [@dhivakar07](https://github.com/dhivakar07)

---

> Built with passion for audio enthusiasts 🎵

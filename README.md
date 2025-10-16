# 🛍️ Cartify — Modern MERN E-Commerce Platform

Cartify is a full-stack e-commerce web application built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It provides a seamless shopping experience with secure authentication, dynamic product listings, real-time cart management, and checkout powered by **Stripe**.

---

## 🚀 Features

### 👤 Authentication
- Email and password registration / login  
- Continue with **Google OAuth**  
- Protected routes using JWT  
- Persistent sessions  

### 🛒 Shopping Experience
- Browse categorized collections (Men, Women, Kids)  
- Filter and sort products by price, rating, and relevance  
- Detailed product pages with description and reviews  
- Responsive cart system with item quantity updates  

### 💳 Payments & Orders
- Integrated **Stripe Checkout** for secure payments  
- Automatic order creation and storage on success  
- Order history page for users to track past purchases  

### ⚙️ Admin Features
- Add / edit / delete products (admin only)  
- Image uploads handled with **Multer** and stored in MongoDB  
- Transaction-safe product creation using Mongoose sessions  

### 🌐 UI & Design
- Modern React + Tailwind CSS interface  
- Mobile-responsive layout  
- Smooth animations with Framer Motion  

---

## 🧩 Tech Stack

**Frontend**
- React 18  
- React Router  
- Tailwind CSS  
- Axios  
- Framer Motion  

**Backend**
- Node.js  
- Express  
- MongoDB & Mongoose  
- Multer (for image uploads)  
- Stripe API (payments)  
- JSON Web Tokens (JWT) for authentication  
- Google OAuth2  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/eyuelhaile/cartify.git
cd cartify
````

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3. Environment variables

Create a `.env` file in both `/server` and `/client` directories.

#### Server `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```

#### Client `.env`

```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

### 4. Run the app

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd client
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**

---

## 🧠 Project Structure

```
Cartify/
├── client/           # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/           # Express backend
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── ...
└── README.md
```

---

## 💳 Stripe Integration

* Uses **Stripe Checkout Sessions** for payments.
* On successful payment, a new order is automatically created and saved in the database.
* Works with **test cards** (e.g., `4242 4242 4242 4242`) during development.

---

## 🔐 Authentication Flow

1. Users can sign up using **email/password** or **Google OAuth**.
2. Authenticated users receive a JWT stored in secure cookies.
3. Protected routes ensure only logged-in users can access cart, checkout, and order pages.

---

## 🧾 Future Enhancements

* Product reviews and ratings
* Inventory management
* User profile customization
* Email notifications on order success
# Saanjh Vibe - E-Commerce Backend Setup

## 🎯 What's New

Your website now has a complete backend system for order management!

### Features:
✅ **Order Submission Form** - Customers fill in details and place orders  
✅ **SQLite Database** - Orders are stored and saved  
✅ **Admin Panel** - View, manage, and track all orders  
✅ **WhatsApp Checkout** - Alternative checkout via WhatsApp  
✅ **Order Statistics** - Track total orders, revenue, pending orders  

---

## 📋 Files Added

1. **server.js** - Backend server with Express.js
2. **package.json** - Node.js dependencies
3. **admin.html** - Admin panel to view and manage orders
4. **orders.db** - SQLite database (created automatically)

---

## 🚀 How to Run the Backend

### Step 1: Install Node.js
Download from [nodejs.org](https://nodejs.org) if not already installed.

### Step 2: Install Dependencies
Open terminal in the website folder and run:
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
🎉 Saanjh Vibe server running on http://localhost:3000
📊 Admin panel: http://localhost:3000/admin.html
```

### Step 4: Access the Admin Panel
Open your browser and go to:
```
http://localhost:3000/admin.html
```

---

## 📱 How Customers Use It

1. Customers add items to cart on index.html
2. Click "Place Order" button on cart page
3. Fill in their details:
   - Full Name
   - Email (optional)
   - Phone Number
   - Delivery Address
4. Click "Place Order"
5. Order is saved to database
6. You receive order in admin panel

---

## 👨‍💼 Admin Panel Features

- **View all orders** with customer details
- **Order statistics** (total, pending, completed, revenue)
- **View order details** - See items, customer info, address
- **Mark as Completed** - Update order status
- **Delete orders** - Remove orders if needed
- **Auto-refresh** - Updates every 30 seconds

---

## 🔧 API Endpoints

If you want to integrate with other systems:

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

---

## 📦 Backend + WhatsApp

The website still has the WhatsApp checkout option! Customers can choose:

1. **Place Order** (Backend) - Info saved to database
2. **Checkout via WhatsApp** - Direct WhatsApp message to your number

---

## ⚠️ Important Notes

- Keep the terminal running while using the website
- The database file `orders.db` is created automatically
- Orders persist even after restarting the server
- For production, you'll need to deploy this to a hosting service

---

## 🆘 Troubleshooting

**Problem:** "Cannot find module 'express'"  
**Solution:** Run `npm install` to install dependencies

**Problem:** "Port 3000 already in use"  
**Solution:** Change PORT in server.js to a different number (e.g., 3001)

**Problem:** Admin panel shows "Error loading orders"  
**Solution:** Make sure the server is running on http://localhost:3000

**Problem:** Orders not saving  
**Solution:** Check that the server is still running in the terminal

---

## 📞 Your WhatsApp Number

Business WhatsApp: **+918349206021**  
Orders can still be sent via WhatsApp as an alternative checkout method!

---

Happy selling! 🎉

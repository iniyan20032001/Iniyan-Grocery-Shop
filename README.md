# Grocery Shop Website

A complete grocery shopping website built with HTML, CSS, and JavaScript. Features include product catalog, shopping cart, billing, user authentication, order tracking, admin dashboard, and PWA support.

## Features

### Customer Features
- **Product Catalog**: Browse products across 10 categories
- **Search**: Search products by name or category
- **Shopping Cart**: Add items, update quantities, remove items
- **Billing**: Automatic calculation with tax (5%)
- **Payment**: QR code payment modal
- **Bill Printing**: Print formatted bills
- **Order Tracking**: View order status (Pending, Packed, Out for Delivery, Delivered)
- **Delivery Slots**: Select delivery date and time
- **User Authentication**: Login/Signup with email, mobile, or Google (mock)

### Admin Features
- **Manage Menu**: Add, edit, and delete products
- **Sales Report**: Monthly sales reports with statistics
- **Order Management**: Update order statuses
- **Product Management**: Full CRUD operations for products

### Technical Features
- **PWA Support**: Progressive Web App with offline support
- **Responsive Design**: Mobile-first responsive layout
- **LocalStorage**: All data stored in browser localStorage
- **No Backend Required**: Pure frontend implementation

## Getting Started

1. **Open the website**: Simply open `index.html` in a web browser
2. **No installation required**: All files are static HTML/CSS/JS

## Usage

### For Customers

1. **Sign Up/Login**: 
   - Click "Login" in the header
   - Create an account or use mock Google login
   - Default admin password: `admin123` (for admin access)

2. **Browse Products**:
   - View all products on the home page
   - Filter by category using category buttons
   - Search for specific products

3. **Add to Cart**:
   - Click "Add to Cart" on any product
   - View cart by clicking "Cart" in header

4. **Checkout**:
   - Review cart items
   - Select delivery date and time
   - Click "Pay Now" to see QR code
   - Confirm payment to place order

5. **Track Orders**:
   - Click "My Orders" to view all orders
   - See order status and details

### For Admins

1. **Access Admin Dashboard**:
   - Login as any user
   - Click "Admin" in header
   - Enter admin password: `admin123`

2. **Manage Products**:
   - Go to "Manage Menu" tab
   - Add new products with details
   - Edit or delete existing products

3. **View Sales Report**:
   - Go to "Sales Report" tab
   - Select month to view statistics
   - See total sales, order count, and top products

4. **Manage Orders**:
   - Go to "Order Management" tab
   - Update order statuses
   - View all customer orders

## Product Categories

1. Rice & Grains
2. Spices & Masala
3. Cooking Oils
4. Snacks & Biscuits
5. Beverages
6. Personal Care
7. Home Cleaning
8. Vegetables & Fruits
9. Dairy & Frozen
10. Miscellaneous

## File Structure

```
APP/
├── index.html          # Main product catalog page
├── cart.html           # Shopping cart & checkout
├── orders.html         # Order tracking
├── admin.html          # Admin dashboard
├── login.html          # Login/signup page
├── css/
│   ├── style.css       # Main styles
│   ├── admin.css       # Admin-specific styles
│   └── responsive.css  # Mobile responsiveness
├── js/
│   ├── app.js          # Main application logic
│   ├── auth.js         # Authentication logic
│   ├── cart.js         # Cart & billing logic
│   ├── orders.js       # Order tracking
│   ├── admin.js        # Admin features
│   └── pwa.js          # PWA service worker registration
├── manifest.json       # PWA manifest
└── service-worker.js   # PWA service worker
```

## Data Storage

All data is stored in browser localStorage:
- `grocery_users`: User accounts
- `grocery_products`: Product catalog
- `grocery_orders`: All orders
- `grocery_cart_{userId}`: User's shopping cart
- `grocery_currentUser`: Currently logged in user
- `grocery_adminPassword`: Admin password (default: admin123)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Service Worker support required for PWA features
- localStorage support required

## Notes

- This is a frontend-only application with no backend
- Data persists in browser localStorage
- Clearing browser data will reset all information
- Google OAuth is mocked (creates a test user)
- QR code is a placeholder image
- Product images use placeholder service

## Admin Access

- Default admin password: `admin123`
- Can be changed in localStorage
- Admin access is session-based (resets on page refresh)

## License

This project is open source and available for educational purposes.


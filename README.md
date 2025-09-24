# Product Store

This is an e-commerce style application built with modern technologies, providing a platform for browsing and interacting with products such as chairs, lamps, beds, and more.

It features product browsing, favorites, reviews, shopping cart, checkout via Stripe, order history, and an admin panel for product & order management. Key functionalities include authentication, form validation, and a responsive UI.

---

## Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Page Descriptions](#page-descriptions)
   - [Index Page](#index-page)
   - [Product Page](#product-page)
   - [Favorites](#favorites)
   - [Cart](#cart)
   - [Orders](#orders)
   - [Admin Pages](#admin-pages)
   - [Additional Pages](#additional-pages)
4. [Technical Details](#technical-details)
5. [Future Improvements](#future-improvements)
6. [Live Version](#live-version)

---

## Project Overview

Product Store allows users to explore products, mark them as favorites, manage a shopping cart, and complete purchases via Stripe. It includes:

- **Core Components**: A responsive header with search, a theme toggler, and navigation.
- **Product Management**: Admin users can add products and view the full catalog.
- **Shopping & Orders**: Add products to the cart, modify quantities, remove items, checkout, and view past orders.
- **User Features**: Favorites system, reviews, and personalized access with authentication.
- **Modern UI/UX**: Clean, responsive design powered by Tailwind and ShadCN.

---

## Features

- **Browse Products**: Users can view products like chairs, lamps, beds, and more.
- **Favorites**: Add or remove products from favorites.
- **Reviews**: Leave and manage reviews on products.
- **Shopping Cart**: Add items, update quantities, remove products, and view totals.
- **Checkout Flow**: Complete purchases using a custom API that integrates with Stripe for payment.
- **Order History**: Users can see a list of paid orders and their details.
- **Admin Panel**: Admin users can manage products and see all orders.
- **Search Bar**: Find products quickly via instant search.
- **Theme Toggler**: Switch between light and dark modes.
- **Responsive Design**: Fully optimized for mobile and desktop.

---

## Page Descriptions

### **Index Page**

- Lists all products with category filters.
- Search bar for instant results.
- Quick navigation using the responsive header.

### **Product Page**

- Product image, title, description, and price.
- Add/remove from favorites and cart.
- Review section for user feedback.

### **Favorites**

- Displays the user’s favorite products.
- Remove items directly from the list.

### **Cart**

- Shows products added by the user.
- Update quantities or remove items.
- Proceed to checkout.

### **Orders**

- Lists all orders the user has paid for.
- View order details, including purchased products and amounts.

### **Admin Pages**

For admin users only:

- **All Products**: View the full catalog and manage products.
- **Create Product**: Add a new product with validation.
- **All Orders**: View all user orders with details.

### **Additional Pages**

- Authentication (Sign In / Sign Up via Clerk).
- Profile management through Clerk.

---

## Technical Details

- **Framework**: Next.js with TypeScript.
- **Styling**: Tailwind CSS and ShadCN UI components.
- **Database**: Prisma ORM.
- **Authentication**: Clerk.
- **Validation**: Zod for forms and server actions.
- **Routing**: App Router (Next.js 13+).
- **Payment**: Stripe integration via custom checkout API.

---

## Future Improvements

- Enhanced cart features (save for later, wishlist integration).
- Advanced order tracking (status updates, notifications).
- Multi-currency support for Stripe payments.

---

## Live Version

https://course-nextjs2025-product-store.vercel.app

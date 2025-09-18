# Product Store

This is an e-commerce style application built with modern technologies, providing a platform for browsing and interacting with products such as chairs, lamps, beds, and more.

It features product browsing, favorites management, reviews, search, and an admin panel for product management. Key functionalities include authentication, form validation, and a responsive UI.

---

## Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Page Descriptions](#page-descriptions)
   - [Index Page](#index-page)
   - [Product Page](#product-page)
   - [Favorites](#favorites)
   - [Reviews](#reviews)
   - [Admin Pages](#admin-pages)
   - [Additional Pages](#additional-pages)
4. [Technical Details](#technical-details)
5. [Future Improvements](#future-improvements)
6. [Live Version](#live-version)

---

## Project Overview

Product Store allows users to explore products, mark them as favorites, and leave reviews. It includes:

- **Core Components**: A responsive header with search, a theme toggler, and navigation.
- **Product Management**: Admin users can add new products and view the full catalog.
- **User Features**: Favorite system, reviews with edit/delete options, and personalized access with authentication.
- **Modern UI/UX**: Clean, responsive design powered by Tailwind and ShadCN.

---

## Features

- **Browse Products**: Users can view products like chairs, lamps, beds, and more.
- **Favorites**: Add or remove products from favorites (fully functional).
- **Reviews**: Leave reviews on products and delete them if desired.
- **Search Bar**: Search for products at the top of the page with instant results.
- **Theme Toggler**: Switch between light and dark modes.
- **Admin Panel**: Admin users can view all products and create new ones.
- **Responsive Design**: Fully optimized for mobile and desktop.

---

## Page Descriptions

### **Index Page**

The main page lists products with options to:

- Browse by category.
- Use the search bar to find products.
- Quickly navigate using the responsive header.

### **Product Page**

Displays details about a specific product:

- Product image, title, and description.
- Options to add/remove from favorites.
- Review section for user feedback.

### **Favorites**

- Dedicated section showing the user’s favorite products.
- Ability to remove items directly.

### **Reviews**

- Leave a review on a product.
- Delete your review at any time.

### **Admin Pages**

For admin users only:

- **All Products**: View the full catalog.
- **Create Product**: Add a new product via a form with validation.

### **Additional Pages**

- Authentication (Sign In / Sign Up with Clerk).
- Profile management through Clerk.

---

## Technical Details

- **Framework**: Next.js with TypeScript for type safety and scalability.
- **Styling**: Tailwind CSS for styling and ShadCN UI components for prebuilt elements.
- **Database**: Prisma ORM for database operations.
- **Authentication**: Clerk for secure user sign-up and login.
- **Validation**: Zod for validating form and server actions.
- **Routing**: App Router (Next.js 13+) for modern file-based routing.

---

## Future Improvements

Planned enhancements to expand the functionality:

- **Shopping Cart**: Add to cart, update quantity, and remove items.
- **Checkout Flow**: Streamlined process for completing purchases.
- **Order History**: Track past purchases and re-order easily.
- **Payment Integration**: Support for payment gateways like Stripe.

---

## Live version

https://course-nextjs2025-product-store.vercel.app

# UrbanNest - Property Rental & Booking Platform

> A modern full-stack rental marketplace where property owners can list rental properties and tenants can discover, book, and pay for accommodations through a seamless digital experience.


---

## Live Demo

**https://urbannest-property-rental-client.vercel.app**

---

## Overview

UrbanNest is a full-stack property rental platform designed to connect property owners and tenants through a secure and intuitive marketplace. Owners can manage listings and booking requests, while tenants can browse properties, save favorites, book accommodations, and complete payments—all within a single application.

---

## Features

### Authentication & Authorization

* Email and password authentication
* Google OAuth login with automatic Tenant role assignment
* JWT-based authentication using Bearer tokens
* Role-based access control for Tenant, Owner, and Admin users
* Persistent sessions that maintain authentication after page refresh

### Property Discovery

* Browse approved property listings in a responsive grid layout
* Search properties by location
* Filter listings by property type and price range
* Server-side sorting by price (Low to High and High to Low)
* Animated Featured Properties section using Framer Motion

### Booking & Payments

* One-click property booking
* Booking form with move-in date, contact information, and notes
* Secure payment integration using Stripe
* Booking status tracking (Pending, Approved, Rejected)
* Payment status tracking (Unpaid and Paid)

### Favorites & Reviews

* Save properties to a personal favorites list
* Submit ratings and written reviews
* Dynamic review section powered by database content

### Owner Dashboard

* Dashboard analytics for earnings, properties, and bookings
* Monthly earnings visualization using Recharts
* Add, update, and delete property listings
* Approve or reject booking requests
* View rejection feedback from administrators

### Admin Dashboard

* Manage platform users and update roles
* Approve or reject property listings with feedback
* Monitor all bookings across the platform
* View complete transaction history

### User Experience

* Fully responsive design for mobile, tablet, and desktop
* Smooth animations powered by Framer Motion
* Consistent design system with custom loading, error, and 404 pages

---

## Technology Stack

| Package                   | Version | Purpose                          |
| ------------------------- | ------- | -------------------------------- |
| `next`                    | ^15     | React framework with App Router  |
| `react`                   | ^19     | User interface library           |
| `tailwindcss`             | ^4      | Utility-first CSS framework      |
| `framer-motion`           | ^12     | UI animations                    |
| `recharts`                | ^2      | Analytics and charts             |
| `axios`                   | ^1      | HTTP client with JWT interceptor |
| `better-auth`             | ^1.6    | Authentication                   |
| `@stripe/react-stripe-js` | ^3      | Stripe React components          |
| `@stripe/stripe-js`       | ^5      | Stripe JavaScript SDK            |
| `react-icons`             | ^5      | Icon library                     |
| `react-hot-toast`         | ^2      | Toast notifications              |

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── dashboard/        # Tenant, Owner, and Admin dashboards
│   ├── properties/       # Property listing and details
│   └── payment/          # Stripe payment flow
│
├── components/
│   ├── auth/             # Route protection
│   ├── home/             # Home page components
│   └── shared/           # Shared UI components
│
├── context/              # Authentication context
└── lib/                  # Axios instance and Better Auth configuration
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/nilanjanajui/urbannest_property_rental-client.git

# Navigate to the project
cd urbannest_property_rental-client

# Install dependencies
npm install

# Configure environment variables
cp .env.local

# Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-server.onrender.com/api
NEXT_PUBLIC_SERVER_URL=https://your-server.onrender.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

---

## Related Repositories

* **Server Repository:** https://github.com/nilanjanajui/urbannest_property_rental-server

---

## License

This project is intended for educational and portfolio purposes.

---

<p align="center">
Built with Next.js, Tailwind CSS, Better Auth, and Stripe.
</p>

# UrbanNest - Property Rental & Booking Platform

> A modern, full-stack property rental marketplace built with **Next.js**, **Better Auth**, **Stripe**, and **MongoDB**, enabling property owners to manage rental listings while providing tenants with a seamless property discovery, booking, and payment experience.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Better%20Auth-Authentication-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" />
</p>

---

## Live Application

**Application:** https://urbannest-property-rental-client.vercel.app


---

# Overview

UrbanNest is a production-ready rental marketplace designed to simplify the interaction between property owners and tenants.

The platform enables owners to publish and manage rental properties while allowing tenants to search listings, save favorites, submit booking requests, complete secure online payments, and manage their bookings through dedicated dashboards.

Built with the latest **Next.js App Router**, UrbanNest focuses on performance, scalability, security, and an intuitive user experience.

---

# Technology Stack

<p align="center">
<img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,nodejs,express,mongodb,git,github,vscode&theme=dark"/>
</p>

| Category           | Technologies         |
| ------------------ | -------------------- |
| Framework          | Next.js 15, React 19 |
| Styling            | Tailwind CSS 4       |
| Authentication     | Better Auth, JWT     |
| Payments           | Stripe               |
| Database           | MongoDB              |
| HTTP Client        | Axios                |
| Animations         | Framer Motion        |
| Data Visualization | Recharts             |

---

# Features

## Authentication & Authorization

* Email and password authentication
* Google OAuth integration
* JWT-based API authorization
* Persistent user sessions
* Protected routes
* Role-based access control
* Tenant, Owner, and Admin dashboards

---

## Property Marketplace

* Browse approved rental properties
* Search by location
* Filter by property type
* Filter by price range
* Server-side sorting
* Responsive property grid
* Featured property showcase

---

## Booking System

* Property booking requests
* Booking approval workflow
* Booking status tracking
* Move-in scheduling
* Booking history

---

## Online Payments

* Secure Stripe integration
* Payment intent creation
* Online checkout
* Payment verification
* Transaction history

---

## Owner Dashboard

Owners can

* Add new properties
* Edit listings
* Delete listings
* Manage booking requests
* Track monthly revenue
* Monitor bookings
* View analytics
* Review administrator feedback

---

## Admin Dashboard

Administrators can

* Manage users
* Update user roles
* Review submitted properties
* Approve or reject listings
* Monitor platform bookings
* View transaction history

---

## User Experience

* Responsive design
* Mobile-first layout
* Framer Motion animations
* Custom loading screen
* Error handling
* 404 page
* Consistent design system
* Fast page navigation

---

# Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── payment/
│   └── properties/
│
├── components/
│   ├── auth/
│   ├── home/
│   └── shared/
│
├── context/
├── hooks/
├── lib/
├── services/
└── utils/
```

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/nilanjanajui/urbannest_property_rental-client.git

cd urbannest_property_rental-client
```

## Install dependencies

```bash
npm install
```

## Configure environment variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=https://your-server.onrender.com/api

NEXT_PUBLIC_SERVER_URL=https://your-server.onrender.com

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Start the development server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# Project Highlights

* Next.js 15 App Router architecture
* JWT-secured REST API communication
* Better Auth authentication
* Google OAuth integration
* Stripe payment processing
* Server-side searching, filtering, and sorting
* Owner analytics dashboard
* Responsive UI for all devices
* Modern component architecture
* Production deployment on Vercel

---

# Related Projects

| Repository | Link                                                             |
| ---------- | ---------------------------------------------------------------- |
| Server     | https://github.com/nilanjanajui/urbannest_property_rental-server |
| Live Demo  | https://urbannest-property-rental-client.vercel.app              |

---

# License

This project was developed for educational and portfolio purposes.

---

<p align="center">
Built with using Next.js, React, Tailwind CSS, Better Auth, MongoDB, and Stripe.
</p>

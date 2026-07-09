<div align="center">

# 🏙️ UrbanNest
### Full-Stack Property Rental & Booking Marketplace

**A production-grade rental platform connecting property owners and tenants —
end-to-end booking, secure payments, and role-based dashboards, built on the modern web stack.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-4F46E5?style=for-the-badge)](https://urbannest-property-rental-client.vercel.app)
[![Server Repo](https://img.shields.io/badge/⚙️_Server_Repo-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/nilanjanajui/urbannest_property_rental-server)

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logo=auth0&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</div>

---

## 💡 Why UrbanNest?

Most rental-listing demos stop at "browse and view." UrbanNest goes further — it's a **three-role marketplace** (Tenant, Owner, Admin) with a real booking lifecycle, Stripe-powered payments, and analytics dashboards, built to mirror how production rental platforms (like Airbnb-style marketplaces) actually work under the hood.

**At a glance:**

| | |
|---|---|
| 🔐 **Auth** | Email/password + Google OAuth via Better Auth, JWT-secured APIs |
| 🏘️ **Marketplace** | Server-side search, filter, and sort across live property listings |
| 📅 **Booking Engine** | Request → Approval → Move-in scheduling → History, fully tracked |
| 💳 **Payments** | Stripe Payment Intents with verified, auditable transactions |
| 📊 **Dashboards** | Role-specific views for Tenants, Owners, and Admins with revenue analytics |
| 📱 **UX** | Fully responsive, animated with Framer Motion, custom loading & error states |

---

## 🖥️ Tech Stack

<div align="center">
<img src="https://skillicons.dev/icons?i=nextjs,react,tailwind,nodejs,express,mongodb,git,github,vscode&theme=dark" />
</div>

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Styling** | Tailwind CSS v4 |
| **Auth** | Better Auth, JWT, Google OAuth |
| **Payments** | Stripe (Payment Intents API) |
| **Database** | MongoDB |
| **HTTP Client** | Axios |
| **Animation** | Framer Motion |
| **Data Viz** | Recharts |

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- Email/password + Google OAuth login
- JWT-secured API layer with protected routes
- Persistent sessions and role-based access control (Tenant / Owner / Admin)

### 🏘️ Property Marketplace
- Search by location, filter by type & price range
- Server-side sorting for performance at scale
- Responsive property grid with featured listings showcase

### 📅 Booking System
- End-to-end booking request → approval workflow
- Real-time status tracking and move-in scheduling
- Full booking history per user

### 💳 Payments
- Stripe checkout with Payment Intent creation
- Server-side payment verification
- Transaction history logging

### 🏠 Owner Dashboard
- Add / edit / delete listings
- Manage incoming booking requests
- Revenue tracking & analytics
- View admin feedback on submitted listings

### 🛡️ Admin Dashboard
- User management & role updates
- Property approval/rejection workflow
- Platform-wide booking & transaction oversight

### 🎨 Experience
- Mobile-first, fully responsive design
- Framer Motion micro-interactions
- Custom loading screen, error boundaries, and 404 page

---

## 🗂️ Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Auth routes & flows
│   ├── dashboard/       # Role-based dashboards
│   ├── payment/         # Stripe checkout flow
│   └── properties/      # Listings & search
│
├── components/
│   ├── auth/
│   ├── home/
│   └── shared/
│
├── context/             # Global state providers
├── hooks/                # Custom React hooks
├── lib/                  # Config & integrations
├── services/             # API service layer
└── utils/                 # Helpers
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nilanjanajui/urbannest_property_rental-client.git
cd urbannest_property_rental-client

# Install dependencies
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-server.onrender.com/api
NEXT_PUBLIC_SERVER_URL=https://your-server.onrender.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

```bash
# Run the dev server
npm run dev
```

Visit **http://localhost:3000**

---

## 🏆 Project Highlights

- ⚡ Built on **Next.js 15 App Router** for modern rendering performance
- 🔒 **JWT-secured REST API** with Better Auth + Google OAuth
- 💳 Real **Stripe payment integration** — not a mock checkout
- 🔍 **Server-side search, filter & sort** for scalable data handling
- 📊 **Analytics dashboard** for owners with revenue tracking
- 📱 Fully **responsive UI** across devices
- ☁️ **Live production deployment** on Vercel

---

## 🔗 Related Repositories

| Repository | Link |
|---|---|
| 🖥️ Client (this repo) | You're here |
| ⚙️ Server / API | [urbannest_property_rental-server](https://github.com/nilanjanajui/urbannest_property_rental-server) |
| 🌐 Live Demo | [urbannest-property-rental-client.vercel.app](https://urbannest-property-rental-client.vercel.app) |

---

## 📄 License

This project was developed for educational and portfolio purposes under the **MIT License**.

<div align="center">

**Built with ❤️ using Next.js, React, Tailwind CSS, Better Auth, MongoDB & Stripe**

</div>

# BKP-Homes (Luxora)

BKP-Homes (branded as **Luxora**) is a premium, state-of-the-art luxury furniture and e-commerce platform. It provides customers with an immersive shopping experience featuring interactive 3D modeling, custom furniture design wizards, real-time manufacturing and order tracking, and a comprehensive admin control center.

Built with a modern web stack utilizing **Next.js 15**, **Three.js (React Three Fiber)**, **Express**, and **Prisma ORM with PostgreSQL**.

---

## 🌟 Key Features

*   **🕶️ Immersive 3D Showroom & Room Viewer**
    *   Interactive 3D furniture inspection directly in the browser using Three.js and `@react-three/fiber`.
    *   360-degree room viewer allowing users to visualize products in high-fidelity 3D scenes.
*   **🎨 Custom Furniture Design Wizard**
    *   Allows customers to customize materials, colors, finishes, and dimensions.
    *   Direct request system for personalized furniture quotes, with custom image/photo uploads.
*   **📦 Real-Time Order & Production Tracking**
    *   Full-cycle visual order tracking showing steps from Design Discussion, Material Selection, and Manufacturing to Quality Check and Delivery.
*   **📊 Admin & Analytics Dashboard**
    *   Comprehensive portal for management of products, custom orders, tracking, support tickets, and sales metrics.
    *   Interactive analytics graphs powered by `recharts`.
*   **🌍 Multilingual Support (i18n)**
    *   Fully localized interfaces and language switcher configurations using `next-intl`.
*   **💬 Support Ticketing & WhatsApp Integration**
    *   Integrated help desk supporting ticket creation and updates.
    *   Floating chat support widget with direct WhatsApp redirection.
*   **🔐 Secure Multi-Role Authentication**
    *   Credentials-based authentication with OTP verification.
    *   Role-based access control protecting admin endpoints/pages and customer actions.

---

## 🛠️ Technology Stack

### Frontend
*   **Core:** React 19, Next.js 15 (App Router), TypeScript
*   **Styling:** Tailwind CSS, PostCSS
*   **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
*   **Animations:** Framer Motion, Swiper
*   **State Management:** Zustand
*   **Data Fetching & Cache:** TanStack React Query v5, Axios
*   **Forms & Validation:** React Hook Form, Zod

### Backend
*   **Runtime:** Node.js, Express, TypeScript
*   **Database & ORM:** PostgreSQL, Prisma ORM
*   **Authentication:** JSON Web Tokens (JWT), BcryptJS
*   **Media Hosting:** Cloudinary
*   **Mailing:** Nodemailer (SMTP integration)
*   **Logging & Security:** Winston, Helmet, Express Rate Limit, CORS

---

## 📂 Project Structure

```
bkp-homes/
├── backend/
│   ├── src/
│   │   ├── config/             # Configuration files (cloudinary, cors, jwt, database, etc.)
│   │   ├── middleware/         # Auth, Error, Rate Limiting, File Upload validation middleware
│   │   ├── modules/            # API endpoints split into modules (auth, products, orders, etc.)
│   │   ├── prisma/             # Schema configuration and database seeding script
│   │   ├── utils/              # Helper functions (logger, mailer, token generators)
│   │   └── server.ts           # Server initialization
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/                 # Static assets, 3D GLTF models
│   ├── src/
│   │   ├── app/                # Next.js App Router pages (admin, products, contact, dashboard, etc.)
│   │   ├── components/
│   │   │   ├── features/       # Feature-specific components (3D room viewer, customizer, cart)
│   │   │   ├── layout/         # Header, Footer, Mobile Navigation, Widgets
│   │   │   └── ui/             # Reusable UI primitives (Buttons, Modals, Skeleton, Badges)
│   │   ├── hooks/              # Custom React hooks (useAuth, useCart, useOrders)
│   │   ├── lib/                # Shared utilities, API client (Axios), currency formatting
│   │   ├── services/           # Backend API communication layers
│   │   ├── store/              # Zustand global state stores (auth, cart, currency)
│   │   ├── styles/             # Global CSS rules
│   │   └── types/              # TypeScript interfaces and type declarations
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
*   [PostgreSQL](https://www.postgresql.org/) database instance
*   [Git](https://git-scm.com/)

---

### 1. Setup Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
4.  Configure the environment variables in `.env`:
    *   Set `DATABASE_URL` to your PostgreSQL database connection string.
    *   Set `JWT_SECRET` and `JWT_REFRESH_SECRET` to secure keys.
    *   Configure `CLOUDINARY_*` details to enable product and custom design image uploads.
    *   Configure SMTP details for transactional/OTP mail delivery.
5.  Generate the Prisma Client:
    ```bash
    npm run prisma:generate
    ```
6.  Apply database migrations:
    ```bash
    npm run prisma:migrate
    ```
7.  Seed the database with default products and configuration:
    ```bash
    npm run seed
    ```
8.  Start the development server:
    ```bash
    npm run dev
    ```
    The backend server will run on `http://localhost:5000`.

---

### 2. Setup Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` root:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    NEXT_PUBLIC_WHATSAPP=+919000000000
    ```
4.  Start the Next.js development server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` in your browser to view the application.

---

## 📡 API Modules (v1)

The backend exposes RESTful endpoints grouped into separate modules under `/api/v1/`:

*   `/auth` - Registration, login, JWT refresh tokens, OTP verify & resend
*   `/users` - Customer profile management, roles, and addresses
*   `/products` - Catalog search, categories, filter aggregates, detail fetch
*   `/cart` - Server-persisted shopping cart item updates
*   `/wishlist` - Saved products listing and modification
*   `/orders` - Order placements, tracking state updates, and checkout histories
*   `/custom-furniture` - Request submissions for custom quotes & custom designs
*   `/support` - Dedicated ticketing support desk requests
*   `/analytics` - Admin metrics (total revenue, sales trends, recent orders)

---

## 🤝 Contributing

Contributions are welcome! Please create an issue or pull request for any bugs, suggestions, or features.

## 📄 License

This project is private and proprietary. All rights reserved.

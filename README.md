# NOIR & BEAN — Premium Digital Storefront & Café Operating Platform

<div align="center">

![NOIR & BEAN Banner](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80)

### *Coffee. Food. Slow Moments.*
**A modern, production-grade digital storefront, ordering engine, table reservation system, and hospitality operating platform built for specialty coffee brands.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-C48B56?style=for-the-badge)](LICENSE)

[Live Demo](#-getting-started) • [Feature Showcase](#-key-features) • [Tech Stack](#-tech-stack) • [Route Architecture](#-route-architecture)

</div>

---

## 📌 Repository Information (For GitHub)

* **Repository Name Recommendation**:
  * `noir-and-bean-cafe` *(Recommended)*
  * *Alternatif*: `noir-bean-hospitality-platform` atau `specialty-coffee-storefront`
* **GitHub Repository About / Description**:
  > *"☕ Production-grade digital storefront, omnichannel ordering engine, table reservation floorplan, Kitchen Display System (KDS), and customer retention platform for specialty cafés. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS."*
* **Topics / Tags**:
  `nextjs`, `react19`, `typescript`, `tailwindcss`, `cafe-website`, `restaurant-pos`, `kitchen-display-system`, `food-and-beverage`, `ecommerce`, `online-ordering`, `reservation-system`

---

## 📖 Overview

**NOIR & BEAN** is not a static promotional restaurant landing page. It is a **commercial-grade café digital product** engineered to maximize guest acquisition, average order value (AOV), seat turnover, and customer lifetime value (LTV).

Designed with a warm architectural editorial aesthetic (Matte Obsidian, Warm Ochre, Steamed Linen, and Caramel Amber), the platform bridges digital discovery with physical café hospitality in **Karawang, West Java**.

---

## ✨ Key Features

### 1. 🛍️ Digital Storefront & Editorial Showcase
* **Immersive Visuals**: High-contrast editorial typography paired with curated photography and smooth micro-animations.
* **Atmosphere Ambient Audio Player**: Integrated background audio toggling ambient sounds of slow-pour coffee shop acoustic vibes.
* **Coffee Ritual Quiz**: Interactive recommendation questionnaire recommending single origin beans and brewing methods matching user mood and flavor profiles.
* **Local Discovery & Microdata**: Complete Schema.org `Restaurant` JSON-LD, OpenGraph tags, semantic SEO, dynamic `sitemap.xml`, and `robots.txt`.

### 2. ⚡ Omnichannel Ordering Engine (`/order`)
* **3-Fulfillment Pipeline**: Seamless switching between **Dine-In** (table assignment), **Pickup** (counter take-away), and **Local Delivery** (Karawang courier).
* **"Order Ahead on the Way" (ETA Synchronized Brew)**:
  * Proprietary hospitality feature: baristas sync espresso extraction and milk steaming precisely 4 minutes before customer arrival based on selected travel time (10, 15, or 25 mins).
  * Preserves crema, aroma, and temperature at the **Peak Flavor Window**.
* **Cart & Add-on Customizer**: Milk alternatives (Oat, Almond), ice levels, sugar sweetness, and single-origin upgrades persisted in `CartContext` with LocalStorage sync.
* **Voucher & Coupon Engine**: Built-in support for promo campaigns (`SLOW-AFTERNOON-50`, `BRUNCH-DUO-150K`, `EARLY-BIRD-2X`) and dynamic E-Gift Card redemptions (`NOIR-GIFT-XXXX`).

### 3. 📅 Table Reservation & Interactive Floorplan (`/reservation`)
* **Live Interactive Architectural Floorplan**: Visual canvas depicting the café's interior layout with realtime zone status (Available, Low Availability, Fully Booked):
  * *Glasshouse Courtyard* (Natural lighting & lush foliage)
  * *Main Indoor Lounge* (Leather booths & ambient acoustics)
  * *Mezzanine Focus Desk* (Ergonomic work desks & dedicated power outlets)
  * *Outdoor Canopy Garden* (Pet-friendly open terrace)
* **Automated Booking Confirmation**: Instant confirmation modal with booking reference `#NB-RES-XXXX`, Google Calendar shortcut, and direct WhatsApp concierge dispatch.

### 4. 🍳 Realtime Kitchen Display System & 80mm ESC-POS Printer (`/admin/kds`)
* **3-Column Ticket Pipeline**: Realtime order progression (`QUEUED` ➔ `IN PROGRESS` ➔ `READY`).
* **Station Routing**: Filter instantly by *Barista / Coffee Bar* or *Kitchen / Pastry & Warm Food*.
* **Elapsed Urgency Timer**: Color transitions alerting staff to tickets exceeding 10 minutes (amber) or 15 minutes (pulsing crimson).
* **Web Audio Alerting**: Native browser 880Hz audio ping synthesized via Web Audio API notifying incoming orders.
* **80mm Thermal Receipt Simulator**: High-fidelity ESC-POS monospace receipt layout with paper-tear serrations, PB1 tax breakdown, and 1-click `window.print()` trigger.

### 5. 💳 Payment Simulation & Webhook Integration (`/api/checkout/simulate`)
* Production-like simulation of **Midtrans Snap / Xendit Sandbox**.
* Simulates instant QRIS generation, Virtual Account transfer, status settlement webhooks, and automated customer WhatsApp receipt notification.

### 6. 🔁 Retention & Monetization Engines
* **Coffee Bean Subscription Box (`/subscription`)**:
  * Origin selection: *Aceh Gayo Anaerobic*, *Mt. Halu Washed*, *Bali Kintamani Honey*, *Toraja Sapan Natural*.
  * Grind profiles: *Whole Beans*, *Fine Espresso*, *Medium V60*, *Coarse Cold Brew*.
  * Flexible frequencies: Weekly, Bi-weekly, Monthly with automated 15% VIP discount calculation.
* **Digital E-Gift Cards & Vouchers (`/gift-cards`)**:
  * Custom nominal or presets (Rp 50.000 to Rp 500.000).
  * 4 visual card themes (*Noir Signature*, *Slow Morning*, *Celebration & Joy*, *Botanical Calm*).
  * Live card visual preview, voucher code generator, and instant WhatsApp gifting share link.

### 7. 📊 Executive Management & Business Analytics (`/admin`)
* **Financial KPIs**: Realtime Net Revenue, Average Order Value (AOV), Table Occupancy Rate, and Repeat Guest Rate.
* **7-Day Revenue Trend & Hourly Heatmap**: Identify rush hour spikes (08:00–10:00 Morning Rush & 19:00–21:00 Evening Chill).
* **Live Product Inventory Manager**: Inline price updates and 1-click stock availability toggles.
* **Conversion Funnel Analytics**: Visual drop-off monitoring from *Menu Visits* ➔ *Add to Bag* ➔ *Checkout Initiation* ➔ *Completed Orders*.

---

## 🗺️ Route Architecture

```bash
noir-bean/
├── /                     # Editorial Brand Homepage & Hero
├── /menu                 # Filterable Categorized Digital Menu
├── /menu/[id]            # Product Detail & Ingredient Customization
├── /order                # 4-Step Checkout Engine & ETA Brew Sync
├── /reservation          # Table Booking & Interactive Floorplan
├── /experience           # Interior Architecture & Slow Coffee Manifesto
├── /subscription         # Coffee Bean Subscription Box
├── /gift-cards           # Digital E-Gift Card Customizer & Generator
├── /account              # Noir Rewards & Member Tier Tracker
├── /promotions           # Seasonal Privileges & Happy Hour Passes
├── /events               # Private Cupping & Gathering Booking
├── /about                # Roastery Philosophy & Founder Journey
├── /contact              # Direct Location, Hours & WhatsApp Support
├── /admin                # Executive Dashboard, Menu & Reservation Desk
├── /admin/kds            # Barista & Kitchen Display System + 80mm Printer
├── /api/checkout/simulate# Payment Gateway & Webhook Simulator API
├── /robots.txt           # Search Engine Crawler Optimization
└── /sitemap.xml          # Dynamic Canonical Sitemap
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16.3.6 (App Router)](https://nextjs.org/) |
| **Runtime / Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio Engine** | Web Audio API (Synthesizer & Audio Nodes) |
| **Persistence** | React Context + LocalStorage Hydration |
| **Packaging** | NPM / Turbopack |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.17.0` or higher
* **NPM**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/noir-and-bean-cafe.git
   cd noir-and-bean-cafe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Production Verification

To build and validate the application for production deployment:

```bash
npm run build
npm run start
```

> **Build Status**: Compiles with **0 errors and 0 warnings** across all 20 static and dynamic routes.

---

## 📋 Recommended Demo Walkthrough

1. **Experience the Atmosphere**: Visit `/` and toggle the atmosphere audio player on the top announcement bar.
2. **Find Your Bean**: Go to `/menu` and take the *Coffee Ritual Quiz* to receive a tailored coffee suggestion.
3. **Simulate Order Ahead**: Visit `/order`, choose *Pickup*, toggle **"Order Ahead On The Way"**, and select your travel ETA.
4. **Try E-Gift Card Customization**: Visit `/gift-cards`, create a custom voucher, and test the voucher code on `/order`.
5. **Operate the Kitchen**: Open `/admin/kds` in a new tab, filter by Barista station, advance order status, and print an 80mm receipt.
6. **Inspect Financials**: Open `/admin` to review the revenue chart, popular item velocity, and conversion funnel.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built for commercial portfolio demonstration.

# STEP 3: ADMIN DASHBOARD, BUSINESS ANALYTICS, LOYALTY, POLISH & QA

> **Brand**: NOIR & BEAN  
> **Focus**: Commercial Back-Office Operations, Real-Time Inventory & Reservation Controls, Conversion Funnel, Customer Loyalty Program, Micro-Interactions, SEO, Accessibility & Final QA Audit.

---

## 1. OBJECTIVES & SCOPE

Step 3 delivers the business side of the digital storefront and elevates the entire application to an elite commercial standard. By completing this step:
1. A realistic, functional back-office Admin Suite (`/admin`) is built with Live KPIs, Revenue & Order Volume Charts, and Recent Order feeds.
2. Operational sub-modules are deployed:
   - **Menu Inventory Manager**: Toggle in-stock/out-of-stock items, adjust prices, edit descriptions, duplicate items with instant reactive UI reflection.
   - **Reservation Desk**: Filter by date (Today/Tomorrow/Week) and status (Confirmed/Pending/Cancelled), with one-click status transitions.
   - **Promotion Manager**: Track campaign performance (views, claims, redemptions), pause/resume campaigns.
   - **Customer Insights & Conversion Funnel**: Interactive analytics showing the 4-stage funnel (10,842 Visitors → 6,421 Menu Views → 1,104 Order Attempts → 842 Completed Orders at 7.8% conversion).
3. Customer Loyalty Concept (`Noir Rewards`) showcasing point accumulation, visual progress bars, and tiered reward redemptions.
4. Comprehensive Polish: Skeleton loading screens, empty states, form validation errors, toast feedback system, and refined micro-animations.
5. Technical Hardening: Full SEO & LocalBusiness schema, WCAG accessibility checks, responsive verification (320px to 1920px), and zero-error production build.

---

## 2. APPLICATION ROUTES & COMPONENTS

```text
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx         # Dedicated Admin Sidebar & Topbar shell
│   │   ├── page.tsx           # Executive Dashboard & KPI Overview
│   │   ├── menu/page.tsx      # Inventory & Price Management
│   │   ├── reservations/page.tsx # Front-desk Table Booking Manager
│   │   ├── analytics/page.tsx # Conversion Funnel & Visitor Insights
│   │   └── promotions/page.tsx # Marketing Campaign Manager
│   ├── account/
│   │   └── page.tsx           # Noir Rewards Loyalty Card & Order History
│   ├── robots.ts              # SEO Crawl rules
│   └── sitemap.ts             # XML Sitemap generator
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx   # Collapsible modern back-office navigation
│   │   ├── KpiCard.tsx        # Trend badge, metric value, icon
│   │   ├── RevenueChart.tsx   # 7-day visual revenue curve (SVG/CSS bar chart)
│   │   ├── OrderVolumeChart.tsx # Peak order hours breakdown
│   │   ├── PopularProductsRanking.tsx
│   │   ├── RecentOrdersTable.tsx
│   │   ├── MenuTableEditable.tsx
│   │   └── ReservationTableFilterable.tsx
│   ├── loyalty/
│   │   ├── LoyaltyCard.tsx    # Digital membership card with barcode
│   │   ├── PointsProgressBar.tsx # Smooth SVG progress ring/bar
│   │   └── RewardsCatalog.tsx # Tiered redemption vouchers
│   ├── feedback/
│   │   ├── ToastContainer.tsx # Notification alerts (Success, Info, Error)
│   │   ├── SkeletonCard.tsx   # Loading placeholders for menu/dashboard
│   │   └── EmptyState.tsx     # Reusable illustration & CTA for empty lists
│   └── seo/
│       └── JsonLdSchema.tsx   # Structured Schema.org LocalBusiness data
└── data/
    └── adminMockData.ts       # Centralized business analytics & metrics
```

---

## 3. ADMIN EXECUTIVE DASHBOARD (`app/admin/page.tsx`)

### 1. Today's Overview KPI Cards:
```text
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│ TODAY'S SALES      │  │ TOTAL ORDERS       │  │ RESERVATIONS       │  │ NEW CUSTOMERS      │
│ Rp 4.850.000       │  │ 127                │  │ 32                 │  │ 18                 │
│ +14.2% vs yesterday│  │ +8.5% vs yesterday │  │ 4 pending review   │  │ +22% this week     │
└────────────────────┘  └────────────────────┘  └────────────────────┘  └────────────────────┘
```

### 2. Interactive Charts & Analytics:
- **7-Day Revenue Trends**: Interactive chart plotting daily revenue (Mon: Rp 3.8M to Sun: Rp 5.6M).
- **Peak Hour Order Distribution**: Bar chart displaying busiest periods (peak morning 08:00–10:00 and afternoon 14:00–16:00).
- **Top 5 Bestsellers Ranking**:
  1. Noir Latte (42 sold today)
  2. Burnt Cheesecake (28 sold today)
  3. Dirty Cream Coffee (24 sold today)
  4. Truffle Mushroom Croissant (19 sold today)
  5. Matcha Cloud (16 sold today)

### 3. Live Recent Orders Feed:
Table with real-time status badges:
- `#NB-2048` · Leo · Rp 86.000 · Dine In (Table 07) · `PREPARING`
- `#NB-2047` · Maya · Rp 124.000 · Pickup (18:45) · `READY FOR PICKUP`
- `#NB-2046` · Dimas · Rp 45.000 · Delivery · `COMPLETED`
- Status action dropdown to toggle order status directly in demo.

---

## 4. ADMIN OPERATIONAL MODULES

### 1. Menu & Inventory Management (`app/admin/menu/page.tsx`)
- Product listing with search and category filters.
- **Instant Availability Toggle**: Switch items between `AVAILABLE` and `OUT OF STOCK` (updates the public customer menu in real time).
- **Inline Price Editor**: Adjust prices directly (e.g. increase Noir Latte from Rp 38.000 to Rp 40.000).
- **Action Buttons**: `Duplicate Item`, `Edit Details`, `Delete` (with confirmation modal).

### 2. Reservation Desk (`app/admin/reservations/page.tsx`)
- Table management view:
  - `18:00` · Leo (4 Guests) · Area: Courtyard · `CONFIRMED`
  - `19:00` · Sarah (2 Guests) · Area: Main Dining · `PENDING`
  - `20:30` · Daniel (6 Guests) · Area: Mezzanine · `CONFIRMED`
- Filters: Date (`Today`, `Tomorrow`, `This Week`) and Status (`All`, `Confirmed`, `Pending`, `Cancelled`).
- Quick actions: `Approve`, `Reschedule`, `Cancel`.

### 3. Customer Funnel & Conversion Insights (`app/admin/analytics/page.tsx`)
Visual 4-step conversion funnel:
```text
10,842 Total Visitors
      │
      ▼  (59.2% rate)
6,421 Menu Views
      │
      ▼  (17.2% rate)
1,104 Order Checkout Initiations
      │
      ▼  (76.3% completion)
  842 Completed Paid Orders
      │
Overall Conversion Rate: 7.8% (Benchmark: Top 5% in F&B eCommerce)
```
- Demographic and peak traffic insights (72% Mobile, 24% Desktop, 4% Tablet).

### 4. Promotion Campaign Manager (`app/admin/promotions/page.tsx`)
- Shows active campaigns:
  - *Afternoon Coffee (14:00 - 17:00)*: `ACTIVE` · 1,284 views · 213 claims · 87 redemptions.
  - *Weekend Brunch Pass*: `ACTIVE` · 850 views · 94 claims · 42 redemptions.
- Controls: Toggle `Active / Paused`, edit discount rates, add new promo code.

---

## 5. CUSTOMER RETENTION: NOIR REWARDS (`app/account/page.tsx`)

An elegant customer loyalty experience:
- **Card Preview**: Minimalist virtual gold/charcoal member card displaying customer name (`LEO SYAFIQ`), membership tier (`NOIR BLACK`), and member ID QR code.
- **Current Balance**: `420 Points`.
- **Progress Ring / Bar**: `████████░░ 80 points until next reward`.
- **Redemption Catalog**:
  - `[☕ Free Single Origin Coffee]` — 500 pts (80 pts to unlock)
  - `[🍰 Free Artisan Dessert Slice]` — 750 pts
  - `[🎁 Rp 50.000 Dining Voucher]` — 1,000 pts
- Button: `Redeem In-Store via QR`.

---

## 6. POLISH, STATES & MICRO-INTERACTIONS

### 1. State Handling:
- **Loading Skeletons**: Fluid pulse animations for menu grids, dashboard cards, and checkout forms.
- **Empty States**:
  - Empty Cart with `[ EXPLORE MENU ]` CTA.
  - Empty Filter Results with `Clear Search` recommendation.
  - Zero Reservations for Selected Date.
- **Form Validation & Error States**:
  - Inline error text for missing phone number, empty table selection, or expired time slots.
  - Non-intrusive Toast feedback system (`Order Placed Successfully`, `Table Reserved`, `Item Added`).

### 2. Micro-Interactions:
- Image hover zoom (`transform ease-out duration-300`).
- Subtle card elevation shifts on pointer hover.
- Smooth slide-in drawers and backdrop blurs.
- Interactive quantity counter animations.

---

## 7. SEO, PERFORMANCE & ACCESSIBILITY AUDIT

### 1. Search Engine Optimization (SEO):
- Descriptive Title Tags: `NOIR & BEAN — Specialty Coffee & Slow Moments | Karawang`
- Meta Descriptions tailored for discovery and conversion.
- Open Graph (OG) image, Twitter Card tags, and Canonical URLs.
- **JSON-LD Schema Markup (`schema.org/CafeOrCoffeeShop`)**:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "NOIR & BEAN",
    "image": "https://noirandbean.com/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Galuh Mas Raya",
      "addressLocality": "Karawang",
      "addressRegion": "Jawa Barat",
      "postalCode": "41361",
      "addressCountry": "ID"
    },
    "openingHours": "Mo-Su 08:00-22:00",
    "priceRange": "Rp 25.000 - Rp 95.000",
    "servesCuisine": "Specialty Coffee, Modern Brunch, Artisanal Pastry"
  }
  ```

### 2. Accessibility (WCAG 2.1 AA Compliance):
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Contrast ratio >= 4.5:1 between text and background across dark espresso and warm cream tokens.
- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`).
- Accessible buttons and interactive elements with explicit `aria-label` where applicable.

### 3. Responsive Screen Matrix Verification:
- Mobile Small: `320px`, `375px`, `390px`, `430px`.
- Tablet: `768px`, `834px`.
- Laptop / Desktop: `1024px`, `1280px`, `1440px`, `1920px`.
- Check: No horizontal scrollbars, touch targets >= 44px, sticky order bar sits above mobile browser bars.

---

## 8. STEP 3 ACCEPTANCE CRITERIA & FINAL QA AUDIT

- [ ] `/admin` displays accurate summary metrics (Sales, Orders, Reservations, New Customers).
- [ ] 7-day revenue chart and peak order distribution charts render smoothly.
- [ ] Admin menu inventory allows toggling items `IN STOCK / OUT OF STOCK` and reflects on `/menu`.
- [ ] Admin reservation table supports filtering by date and updating booking status (`Confirmed / Cancelled`).
- [ ] Analytics conversion funnel (10,842 Visitors → 842 Orders) is clearly displayed with mock labels.
- [ ] Loyalty page (`/account`) displays the Noir Rewards card, progress meter, and redemption tiers.
- [ ] Skeletons, empty states, and inline form validation work reliably.
- [ ] Meta tags, Open Graph, and JSON-LD schema are present and valid.
- [ ] Production build (`npm run build`) compiles with zero TypeScript errors and zero broken imports.
- [ ] Full user journey tested end-to-end: Land → Explore Menu → Customize → Checkout (#NB-2048) → Table Reservation (#RS-4821) → Admin Monitoring.

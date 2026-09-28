# STEP 2: INTERACTIVE ORDERING, RESERVATION SYSTEM & BRAND EXPERIENCE

> **Brand**: NOIR & BEAN  
> **Focus**: End-to-End Cart & Checkout Engine, Table Reservation System, Editorial Experience Storytelling, About Page, Events, Promotions & Social Discovery.

---

## 1. OBJECTIVES & SCOPE

Step 2 transforms the storefront into a fully interactive digital commerce and hospitality platform. By completing this step:
1. Users can review, adjust, and persist their cart drawer / page with accurate subtotal, service charges, and fees.
2. A 4-step interactive checkout flow is established for **Dine In**, **Pickup**, and **Delivery** with demo payment methods and live confirmation (`#NB-2048`).
3. An interactive Table Reservation system (`/reservation`) is implemented with calendar selection, guest count, real-time time-slot availability, and confirmation cards (`#RS-4821`).
4. Editorial storytelling pages are crafted: `/experience` and `/about`.
5. Community pages are delivered: `/events` with booking inquiry and `/promotions` with promotional claim actions.
6. Social proof and discovery modules: Verified reviews (4.9/5 rating summary), filterable Instagram-style photo gallery with lightbox viewer, and Karawang location module with WhatsApp CTAs.

---

## 2. APPLICATION ROUTES & COMPONENTS

```text
src/
├── app/
│   ├── order/
│   │   └── page.tsx           # Multi-step Checkout & Order tracker
│   ├── reservation/
│   │   └── page.tsx           # Table booking system & confirmation
│   ├── experience/
│   │   └── page.tsx           # Atmosphere & editorial photo essay
│   ├── about/
│   │   └── page.tsx           # Brand story, philosophy & sourcing
│   ├── events/
│   │   └── page.tsx           # Private events & workshop inquiry
│   ├── promotions/
│   │   └── page.tsx           # Active offers & coupon claim demo
│   └── contact/
│       └── page.tsx           # Hours, location, maps & WhatsApp direct line
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx     # Slide-over cart overlay
│   │   └── CartItemRow.tsx    # Line item with quantity adjustments & remove button
│   ├── checkout/
│   │   ├── StepOrderReview.tsx
│   │   ├── StepCustomerDetails.tsx
│   │   ├── StepPaymentDemo.tsx
│   │   └── OrderConfirmation.tsx
│   ├── reservation/
│   │   ├── DatePicker.tsx
│   │   ├── TimeSlotGrid.tsx
│   │   ├── GuestSelector.tsx
│   │   └── ReservationSuccessModal.tsx
│   ├── gallery/
│   │   ├── GalleryFilter.tsx
│   │   ├── GalleryGrid.tsx
│   │   └── LightboxModal.tsx
│   ├── events/
│   │   └── EventInquiryModal.tsx
│   └── social/
│       ├── ReviewsSection.tsx
│       └── LocationMapCard.tsx
└── types/
    ├── order.ts
    └── reservation.ts
```

---

## 3. CART SYSTEM SPECIFICATION (`components/cart/CartDrawer.tsx`)

### Cart Data Model:
```typescript
export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customizationSummary: string; // e.g. "Oat Milk · Less Sugar · Normal Ice"
  unitPriceWithAddons: number;
}
```

### Financial Calculations:
- **Subtotal**: Sum of `(unitPriceWithAddons * quantity)`.
- **Service Fee**: Flat `Rp 5.000` (or 5% hospitality fee).
- **Government Tax (PB1)**: 10% calculated automatically.
- **Estimated Total**: `Subtotal + Service Fee + PB1`.

### Cart Interactions:
- Slide-over drawer accessible from anywhere via the Navbar bag icon or Sticky Order Bar.
- Increment (`+`), decrement (`-`), and remove item button with smooth transition.
- Empty State: Elegant layout with text:
  > *"Your cart is empty. Looks like you haven't added anything yet."*  
  > `[ EXPLORE MENU ]` CTA directing to `/menu`.
- Action buttons:
  - `CONTINUE SHOPPING` (closes drawer).
  - `CHECKOUT →` (navigates to `/order`).

---

## 4. MULTI-STEP ONLINE ORDERING & CHECKOUT (`app/order/page.tsx`)

### The 4-Step Checkout Pipeline:
```text
[ 1. ORDER REVIEW ] ───> [ 2. DETAILS & FULFILLMENT ] ───> [ 3. PAYMENT DEMO ] ───> [ 4. ORDER CONFIRMED ]
```

### 1. Order Type Selection:
- **Dine In**:
  - Requires **Table Number** selection (e.g., Table 01 to 24, Indoor / Mezzanine / Outdoor Terrace).
- **Pickup**:
  - Requires **Estimated Pickup Time** (e.g. *In 15 minutes*, *In 30 minutes*, *Specific time today*).
- **Local Delivery**:
  - Delivery address input, delivery notes (e.g., "Leave at security lobby").

### 2. Customer Information:
- Full Name
- WhatsApp Number (formatted with country code `+62`)
- Order Notes / Special Dietary Instructions (e.g., "Extra napkin, cutlery please")

### 3. Payment Demo (Interactive Simulation):
- Options:
  - `QRIS` (Displays realistic demo QR code for BCA/GoPay/OVO/Dana scan).
  - `BCA / Mandiri Virtual Account` (Generates demo copyable VA number).
  - `Cash at Counter` (For Dine-in and Pickup).
  - `GoPay / OVO E-Wallet`.
- Demo notice pill: *"Demo Mode: No actual payment will be charged."*

### 4. Order Confirmation State:
```text
ORDER CONFIRMED!
Order #NB-2048

Estimated preparation:
15–20 minutes

Status: [ BREWING & PREPARING ]
Dine In · Table 07

[ DOWNLOAD RECEIPT ]     [ TRACK ON WHATSAPP ]
```
- Emits toast notification and clears active cart.

---

## 5. TABLE RESERVATION SYSTEM (`app/reservation/page.tsx`)

### Form Fields & Validation:
1. **Date Picker**: Today, tomorrow, or up to 30 days ahead.
2. **Time Slots**:
   - `10:00`, `11:30`, `13:00`, `15:00`, `17:30`, `19:00`, `20:30`.
   - Realistic slot availability logic: e.g., `19:00` marked as `FULL / UNAVAILABLE` to simulate peak dinner rush.
3. **Guest Count**: 1, 2, 3, 4, 5, 6, or `7+ (Large Party)`.
4. **Seating Area Preference**:
   - *Main Dining Room* (Warm acoustic wood)
   - *Glasshouse Courtyard* (Lush tropical greenery)
   - *Mezzanine Focus Lounge* (Quiet, work-friendly)
5. **Contact Details**: Name, WhatsApp, Email, Special Request (e.g. "Anniversary setup, high chair needed").

### Confirmation Screen:
```text
RESERVATION CONFIRMED
Reservation #RS-4821

Date: Saturday, 28 September 2026
Time: 19:00 WIB
Party: 4 Guests
Area: Glasshouse Courtyard

[ ADD TO GOOGLE / APPLE CALENDAR ]
[ GET DIRECTIONS (GOOGLE MAPS) ]
[ CHAT ON WHATSAPP ]
```

---

## 6. EDITORIAL EXPERIENCE & BRAND PAGES

### 1. Experience Page (`app/experience/page.tsx`)
Rich editorial essay using high-resolution photography and typography:
- **01. The Craft of Extraction**: Dialing in beans on a customized Slayer Espresso machine, water mineral profile, and single-origin profiles.
- **02. The Artisanal Kitchen**: In-house baker crafting flaky viennoiserie, French brioche, and slow-fermented sourdough daily.
- **03. The Space**: Brutalist concrete softened with Indonesian teakwood, acoustic ceiling baffling, warm 2700K ambient lighting.
- **04. Day to Night Ritual**: Morning focus sanctuary with fiber optic Wi-Fi transitioning to intimate low-lit evening jazz lounge.

### 2. About Page (`app/about/page.tsx`)
- The story behind NOIR & BEAN: Founded in Karawang as an antidote to frantic commercial spots.
- **Coffee Sourcing**: Direct trade partnerships with smallholder farmers in Toraja, Gayo, and Mount Puntang.
- **Sustainability Promise**: 100% compostable takeaway cups, zero single-use plastics, and repurposing coffee grounds for local organic composting.

---

## 7. COMMUNITY, PROMOTIONS & SOCIAL PROOF

### 1. Events Page (`app/events/page.tsx`)
- Featured Events:
  - *Coffee Cupping & Sensory Workshop* (Every 2nd Saturday)
  - *Acoustic Sessions in the Courtyard* (Friday Evenings)
  - *Private Gathering & Corporate Meetups* (Custom reservations)
- **Plan an Event Inquiry Form**:
  - Name, Organization/Company, WhatsApp, Event Type, Estimated Guests, Preferred Date, Requirements.

### 2. Promotions Page (`app/promotions/page.tsx`)
- Active Promotional Cards:
  - **Afternoon Coffee Ritual (14:00 — 17:00)**: Buy any signature coffee, receive 50% off any pastry.
  - **Weekend Brunch Bundle**: 2 Mains + 2 Coffees for Rp 150.000.
  - **Digital Regular Card**: Earn double stamps on morning orders before 10:00.
- Interactive `CLAIM OFFER` button with code generation (e.g. `NOIR-AFTERNOON-50`).

### 3. Reviews & Social Proof
- Aggregate score banner: **4.9 / 5.0** based on 1,248 verified customer reviews.
- Filterable customer review cards with star ratings, quotes, visit types (*Solo work, Date, Family brunch*), and timestamp.

### 4. Instagram-Style Gallery with Lightbox (`/experience` or dedicated section)
- Filters: `ALL`, `COFFEE`, `FOOD`, `SPACE`, `PEOPLE`, `EVENTS`.
- Grid with hover overlay showing Instagram likes/comments icon.
- Clicking any photo opens a high-resolution lightbox modal.
- Footer social hook: `@NOIRANDBEAN — Tag us in your slow moments`.

### 5. Location & Contact Hub (`app/contact/page.tsx`)
- Address:
  ```text
  NOIR & BEAN
  Jl. Galuh Mas Raya, Telukjambe Timur,
  Karawang, Jawa Barat 41361, Indonesia
  ```
- Hours: Mon – Sun: 08:00 — 22:00.
- Interactive CTAs:
  - `GET DIRECTIONS` (Opens Google Maps link).
  - `CALL FRONT DESK`.
  - `ORDER VIA WHATSAPP` / `CHAT WITH US`.

---

## 8. STEP 2 ACCEPTANCE CRITERIA

- [ ] Cart drawer slides smoothly, displays line items with custom options, and recalculates totals correctly.
- [ ] Cart state persists in browser storage when navigating between pages.
- [ ] Checkout flow guides users through Dine In, Pickup, and Delivery options with table/time inputs.
- [ ] Payment demo step renders simulated QRIS and Virtual Account options without throwing errors.
- [ ] Order confirmation renders Order `#NB-2048` and clears the cart state.
- [ ] Reservation form correctly disables unavailable time slots and produces Confirmation `#RS-4821`.
- [ ] Experience, About, Events, Promotions, and Contact pages render complete editorial content (zero Lorem Ipsum).
- [ ] Gallery supports category filtering and displays photos in an interactive lightbox.
- [ ] WhatsApp CTAs work throughout the site with configured direct links.

# STEP 1: FOUNDATION, DESIGN SYSTEM, STOREFRONT & DIGITAL MENU

> **Brand**: NOIR & BEAN  
> **Tagline**: *Coffee. Food. Slow Moments.*  
> **Location**: Karawang, West Java, Indonesia  
> **Focus**: Brand Identity, Design Tokens, Core Shell, Homepage, Digital Menu Engine & Product Customizer.

---

## 1. OBJECTIVES & SCOPE

Step 1 establishes the rock-solid visual foundation, layout shell, global state primitives, and the customer-facing discovery experience. By the end of this step, the application will have:
1. Complete Next.js / TypeScript project setup with styling tokens and typography.
2. Centralized Mock Data and TypeScript schemas for products, categories, and tags.
3. Persistent global Cart / UI state management.
4. Main navigation, sticky header, mobile bottom navigation, and announcement bar.
5. High-converting, editorial Homepage with Hero, Signature Products, and Value Proposition.
6. Full Digital Menu (`/menu`) with instant category filtering, live search, dietary tags, availability status, and Quick Add.
7. Interactive Product Detail Modal (`/menu/[id]`) with size, milk, sugar, and ice customization.

---

## 2. TECH STACK & ARCHITECTURE

- **Framework**: Next.js 14+ (App Router) or modern React with TypeScript.
- **Styling**: Tailwind CSS configured with custom design tokens, complemented by Vanilla CSS custom properties.
- **Icons**: Lucide React (`lucide-react`).
- **Typography**:
  - *Display / Headings*: Cormorant Garamond or Playfair Display (Serif, editorial feel).
  - *Body / UI*: Inter or Plus Jakarta Sans / Manrope (Clean, legible, modern sans-serif).
- **State Management**: React Context or lightweight Zustand for cart, active filters, and modal controls (persisted via `localStorage`).

### Project Directory Structure to Establish:
```text
src/ (or root/)
├── app/
│   ├── layout.tsx             # Root layout with fonts, metadata, navbar, footer, cart drawer
│   ├── page.tsx               # Homepage
│   ├── menu/
│   │   ├── page.tsx           # Digital Menu page
│   │   └── [id]/page.tsx      # Direct product detail route
│   └── globals.css            # Design tokens & typography rules
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Responsive header with branding & cart trigger
│   │   ├── Footer.tsx         # Editorial hospitality footer
│   │   ├── MobileBottomNav.tsx # 5-tab mobile navigation bar
│   │   └── StickyOrderBar.tsx # Floating mobile cart notification
│   ├── home/
│   │   ├── Hero.tsx           # Atmospheric hero section with primary CTAs
│   │   ├── Signatures.tsx     # Curated 6 signature items
│   │   └── ConceptHighlight.tsx # "Slow Moments" brand introduction
│   ├── menu/
│   │   ├── MenuFilter.tsx     # Category chips & dietary toggles
│   │   ├── SearchBar.tsx      # Real-time search input
│   │   ├── ProductCard.tsx    # Card with badge, price, quick-add
│   │   └── ProductModal.tsx   # Customization drawer / modal
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── Skeleton.tsx
├── context/
│   └── CartContext.tsx        # Cart & order store with localStorage persistence
├── data/
│   └── products.ts            # Realistic product catalog & mock data
└── types/
    └── product.ts             # TypeScript definitions
```

---

## 3. COLOR SYSTEM & DESIGN TOKENS

Implement these CSS variables in `globals.css` and map them into `tailwind.config.ts`:

```css
:root {
  /* Brand Core Palette */
  --color-espresso: #1A1412;        /* Primary deep dark espresso */
  --color-espresso-soft: #28211E;   /* Secondary dark charcoal brown */
  --color-cream: #F9F6F0;           /* Warm cream background */
  --color-cream-soft: #F2EDE4;      /* Slightly darker cream for cards */
  --color-sand: #E5DDD0;            /* Subtle borders & divider lines */
  --color-caramel: #C48B56;         /* Refined caramel / bronze accent */
  --color-caramel-hover: #AF7744;   /* Darker accent hover */
  --color-muted: #7A726D;           /* Muted editorial secondary text */
  --color-charcoal: #2B2826;        /* Body text */
  
  /* Semantic Tokens */
  --bg-primary: var(--color-cream);
  --bg-card: #FFFFFF;
  --text-primary: var(--color-espresso);
  --text-muted: var(--color-muted);
  --border-subtle: var(--color-sand);
  --accent: var(--color-caramel);
  --success: #3E6B48;
  --destructive: #A33B32;
}
```

**Design Rules**:
- Strictly avoid overly colorful generic buttons (no bright blues/purples).
- Maintain generous whitespace and subtle hairline borders (`1px solid var(--border-subtle)`).
- Card elevations must be soft (`box-shadow: 0 4px 20px -2px rgba(26, 20, 18, 0.05)`).

---

## 4. DATA MODELS & MOCK CATALOG

### TypeScript Schema (`types/product.ts`):
```typescript
export type ProductCategory = 'ALL' | 'COFFEE' | 'NON-COFFEE' | 'FOOD' | 'DESSERT' | 'SIGNATURE';

export type DietaryTag = 'VEGETARIAN' | 'DAIRY FREE' | 'LOW SUGAR' | 'GLUTEN FREE' | 'CHEF PICK';

export interface ProductCustomizationOptions {
  milk?: ('Full Cream' | 'Oat Milk (+Rp 8.000)' | 'Almond Milk (+Rp 8.000)')[];
  sugar?: ('Normal Sugar' | 'Less Sugar' | 'No Sugar')[];
  ice?: ('Normal Ice' | 'Less Ice' | 'No Ice' | 'Hot')[];
  size?: ('Regular' | 'Large (+Rp 6.000)')[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in IDR (Rp)
  image: string;
  tags: DietaryTag[];
  available: boolean;
  bestseller: boolean;
  calories?: number;
  preparationTime?: string;
  customization?: ProductCustomizationOptions;
}
```

### Initial Realistic Catalog (`data/products.ts`):
Populate at least 12 realistic premium items:
1. **Noir Latte** (Signature) - *Double ristretto, house brown sugar syrup, creamy steamed oat milk* (Rp 38.000, Bestseller).
2. **Dirty Cream Coffee** (Signature) - *Chilled condensed milk blend topped with hot concentrated espresso and vanilla whip* (Rp 42.000, Bestseller).
3. **Burnt Cheesecake** (Dessert) - *Basque style cheesecake with molten center and caramelized crust* (Rp 45.000, Bestseller, Vegetarian).
4. **Truffle Mushroom Croissant** (Food) - *Flaky French butter croissant loaded with sautéed portobello and white truffle oil* (Rp 48.000, Vegetarian).
5. **Matcha Cloud** (Non-Coffee) - *Ceremonial Uji matcha over chilled fresh milk crowned with sweet cold foam* (Rp 40.000).
6. **Smoked Beef Brisket Sandwich** (Food) - *12-hour smoked beef, melted Emmental, caramelized onion on artisanal sourdough* (Rp 62.000).
7. **Single Origin Pour Over** (Coffee) - *Rotating Ethiopian Yirgacheffe or Aceh Gayo with jasmine and bergamot notes* (Rp 36.000).
8. **Spanish Cinnamon Latte** (Coffee) - *Rich espresso, sweetened condensed milk, dusted with Ceylon cinnamon* (Rp 39.000).
9. **Yuzu Sparkling Cold Brew** (Coffee) - *18-hour cold brew infused with Japanese yuzu puree and tonic* (Rp 42.000).
10. **Earl Grey Berry Tart** (Dessert) - *Crisp butter sablé shell with bergamot curd and fresh raspberries* (Rp 38.000).
11. **Avocado Sourdough Toast** (Food) - *Hass avocado mash, heirloom cherry tomatoes, dukkah, poached cage-free egg* (Rp 52.000).
12. **Valrhona Chocolate Ganache Drink** (Non-Coffee) - *70% French dark chocolate melted with whole milk and sea salt flake* (Rp 44.000).

---

## 5. HOMEPAGE IMPLEMENTATION (`app/page.tsx`)

### 1. Editorial Hero Section
- **Headline**: *YOUR DAILY RITUAL, REIMAGINED.*
- **Sub-headline**: *Specialty coffee, thoughtful food, and a space designed for slow moments.*
- **Brand Info Tag**:
  ```text
  OPEN TODAY · 08:00 — 22:00
  Karawang, West Java, Indonesia
  ```
- **CTAs**:
  - Primary: `ORDER NOW` (Links directly to `/menu` or opens instant ordering).
  - Secondary: `VIEW MENU` (Links to `/menu`).
  - Tertiary / Ambient: `RESERVE A TABLE` (Links to `/reservation`).
- **Imagery**: Large high-resolution photography featuring warm architectural concrete, brass accents, espresso machine steam, and natural daylight.

### 2. Signatures Showcase
- Header: **SIGNATURES** — *"The things our regulars come back for."*
- Grid of 4 to 6 featured signature cards with:
  - Product photo with subtle hover zoom effect (`scale-105` transition).
  - `BEST SELLER` micro-badge.
  - Price formatted in Indonesian Rupiah (e.g. `Rp 38.000`).
  - `+ QUICK ADD` button that instantly adds standard item to cart with toast feedback.
  - Clicking the card opens the full customization modal.

### 3. Atmosphere & Value Proposition Block
- Short editorial prose introducing the three pillars:
  1. *Curated Sourcing* (direct trade beans from Indonesian and African micro-lots).
  2. *Artisanal Kitchen* (pastries baked twice daily at 07:30 and 13:00).
  3. *A Sanctuary for Focus* (dedicated acoustic corners, high-speed fiber internet, and ergonomic seating).

---

## 6. DIGITAL MENU ENGINE (`app/menu/page.tsx`)

### Interactive Features:
1. **Category Tabs**:
   - `ALL`, `SIGNATURE`, `COFFEE`, `NON-COFFEE`, `FOOD`, `DESSERT`.
   - Smooth horizontal scrolling on mobile with active underline / indicator.
2. **Search & Filter Bar**:
   - Instant search input with clear button.
   - Dietary filter toggles (`Vegetarian`, `Dairy Free`, `Low Sugar`).
3. **Card States**:
   - In-stock items with active hover and `+ Quick Add`.
   - Out-of-stock items displayed with grayscale treatment and `CURRENTLY UNAVAILABLE` badge.
4. **Product Customization Modal**:
   - Large photo preview.
   - Customizer options:
     - Milk choice: Full Cream (default), Oat Milk (+Rp 8.000), Almond Milk (+Rp 8.000).
     - Sugar level: Normal, Less, No Sugar.
     - Ice level: Normal, Less, No Ice, Hot.
     - Quantity counter: `[-] 1 [+]`.
     - Dynamic total price recalculation.
     - Button: `ADD TO ORDER · Rp XX.XXX`.

---

## 7. GLOBAL NAVIGATION & MOBILE OPTIMIZATION

1. **Desktop Navbar**:
   - Logo: **NOIR & BEAN** in elegant serif.
   - Links: `Menu`, `Order Online`, `Reservation`, `Experience`, `About`, `Admin`.
   - Action: Cart icon with active badge pill showing item count (e.g. `2`).
2. **Mobile Bottom Navigation**:
   - 5 fixed touch targets: `Home`, `Menu`, `Order`, `Reserve`, `Bag`.
3. **Sticky Mobile Order Bar**:
   - Shows at the bottom whenever cart has >0 items:
     ```text
     [ 2 ITEMS · Rp 80.000 ]  ────────  [ VIEW CART → ]
     ```

---

## 8. STEP 1 ACCEPTANCE CRITERIA

- [ ] Project builds cleanly without TypeScript or CSS compilation errors.
- [ ] Typography correctly renders serif headings and clean sans-serif UI text.
- [ ] Color tokens match deep espresso, warm cream, and caramel palette.
- [ ] Homepage hero, badges, metadata, and signatures display seamlessly.
- [ ] Menu page supports instant category filtering and real-time text search.
- [ ] Product customization modal allows selecting milk, sugar, ice, and quantity.
- [ ] Adding an item updates global cart count and activates the sticky mobile order bar.
- [ ] Fully responsive on mobile viewport (375px - 430px) without horizontal overflow.

export interface AdminKpi {
  title: string;
  value: string;
  subtext: string;
  change: string;
  isPositive: boolean;
}

export interface RevenueDataPoint {
  day: string;
  date: string;
  revenue: number; // in IDR
  orders: number;
}

export interface HourlyOrderDistribution {
  timeSlot: string;
  volume: number;
}

export interface PopularProduct {
  rank: number;
  name: string;
  category: string;
  soldCount: number;
  revenue: number;
}

export interface AdminRecentOrder {
  id: string;
  customerName: string;
  orderType: string;
  fulfillmentDetail: string;
  amount: number;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  time: string;
}

export interface AdminReservationRecord {
  id: string;
  customerName: string;
  whatsapp: string;
  date: string;
  time: string;
  guests: number;
  area: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export interface PromoCampaignMetric {
  id: string;
  title: string;
  discount: string;
  status: 'ACTIVE' | 'PAUSED';
  views: number;
  claims: number;
  redemptions: number;
  validPeriod: string;
}

export const ADMIN_KPIS: AdminKpi[] = [
  {
    title: "TODAY'S REVENUE",
    value: 'Rp 4.850.000',
    subtext: 'vs yesterday Rp 4.240.000',
    change: '+14.2%',
    isPositive: true
  },
  {
    title: 'ORDERS PROCESSED',
    value: '127',
    subtext: 'avg. basket Rp 38.180',
    change: '+8.5%',
    isPositive: true
  },
  {
    title: 'TABLE RESERVATIONS',
    value: '32',
    subtext: '4 pending front-desk review',
    change: '88% Capacity',
    isPositive: true
  },
  {
    title: 'NEW CUSTOMERS',
    value: '18',
    subtext: 'via digital menu & QRIS',
    change: '+22.4%',
    isPositive: true
  }
];

export const REVENUE_WEEK_DATA: RevenueDataPoint[] = [
  { day: 'Mon', date: '22 Sep', revenue: 3820000, orders: 98 },
  { day: 'Tue', date: '23 Sep', revenue: 4150000, orders: 104 },
  { day: 'Wed', date: '24 Sep', revenue: 3950000, orders: 101 },
  { day: 'Thu', date: '25 Sep', revenue: 4400000, orders: 112 },
  { day: 'Fri', date: '26 Sep', revenue: 5200000, orders: 138 },
  { day: 'Sat', date: '27 Sep', revenue: 5850000, orders: 154 },
  { day: 'Sun', date: '28 Sep', revenue: 4850000, orders: 127 }
];

export const HOURLY_DISTRIBUTION: HourlyOrderDistribution[] = [
  { timeSlot: '08:00', volume: 14 },
  { timeSlot: '10:00', volume: 22 },
  { timeSlot: '12:00', volume: 28 },
  { timeSlot: '14:00', volume: 36 },
  { timeSlot: '16:00', volume: 42 },
  { timeSlot: '18:00', volume: 38 },
  { timeSlot: '20:00', volume: 26 }
];

export const POPULAR_PRODUCTS: PopularProduct[] = [
  { rank: 1, name: 'Noir Latte', category: 'SIGNATURE', soldCount: 42, revenue: 1596000 },
  { rank: 2, name: 'Burnt Cheesecake', category: 'DESSERT', soldCount: 28, revenue: 1260000 },
  { rank: 3, name: 'Dirty Cream Coffee', category: 'SIGNATURE', soldCount: 24, revenue: 1008000 },
  { rank: 4, name: 'Truffle Croissant', category: 'FOOD', soldCount: 19, revenue: 912000 },
  { rank: 5, name: 'Ceremonial Matcha Cloud', category: 'NON-COFFEE', soldCount: 16, revenue: 640000 }
];

export const RECENT_ORDERS_SEED: AdminRecentOrder[] = [
  {
    id: '#NB-2048',
    customerName: 'Leo Syafiq',
    orderType: 'Dine In',
    fulfillmentDetail: 'Table 07 (Courtyard)',
    amount: 86000,
    status: 'PREPARING',
    time: '2 mins ago'
  },
  {
    id: '#NB-2047',
    customerName: 'Maya Indah',
    orderType: 'Pickup',
    fulfillmentDetail: 'Ready window 19:45',
    amount: 124000,
    status: 'READY',
    time: '12 mins ago'
  },
  {
    id: '#NB-2046',
    customerName: 'Dimas Anggoro',
    orderType: 'Delivery',
    fulfillmentDetail: 'Ruko Taruma A-12',
    amount: 45000,
    status: 'COMPLETED',
    time: '28 mins ago'
  },
  {
    id: '#NB-2045',
    customerName: 'Sarah Jenkins',
    orderType: 'Dine In',
    fulfillmentDetail: 'Table 03 (Lounge)',
    amount: 168000,
    status: 'COMPLETED',
    time: '45 mins ago'
  },
  {
    id: '#NB-2044',
    customerName: 'Budi Santoso',
    orderType: 'Pickup',
    fulfillmentDetail: 'Barista Counter',
    amount: 38000,
    status: 'COMPLETED',
    time: '1 hour ago'
  }
];

export const RESERVATIONS_SEED: AdminReservationRecord[] = [
  {
    id: '#RS-4821',
    customerName: 'Sarah Jenkins',
    whatsapp: '+62 813-9876-5432',
    date: 'Today, 28 Sep',
    time: '19:00',
    guests: 4,
    area: 'Glasshouse Courtyard',
    status: 'CONFIRMED'
  },
  {
    id: '#RS-4820',
    customerName: 'Leo Syafiq',
    whatsapp: '+62 812-3456-7890',
    date: 'Today, 28 Sep',
    time: '18:00',
    guests: 2,
    area: 'Main Dining Room',
    status: 'CONFIRMED'
  },
  {
    id: '#RS-4819',
    customerName: 'Daniel Tan',
    whatsapp: '+62 819-2233-4455',
    date: 'Today, 28 Sep',
    time: '20:30',
    guests: 6,
    area: 'Mezzanine Lounge',
    status: 'PENDING'
  },
  {
    id: '#RS-4818',
    customerName: 'Amanda Putri',
    whatsapp: '+62 811-5566-7788',
    date: 'Tomorrow, 29 Sep',
    time: '11:30',
    guests: 3,
    area: 'Glasshouse Courtyard',
    status: 'CONFIRMED'
  },
  {
    id: '#RS-4817',
    customerName: 'Kevin Wijaya',
    whatsapp: '+62 878-1122-3344',
    date: 'Tomorrow, 29 Sep',
    time: '13:00',
    guests: 5,
    area: 'Main Dining Room',
    status: 'PENDING'
  }
];

export const PROMOTIONS_ADMIN_SEED: PromoCampaignMetric[] = [
  {
    id: 'camp-1',
    title: 'Afternoon Coffee Ritual (50% Off Pastry)',
    discount: '50% Pastry',
    status: 'ACTIVE',
    views: 1284,
    claims: 213,
    redemptions: 87,
    validPeriod: '14:00 — 17:00 Daily'
  },
  {
    id: 'camp-2',
    title: 'Weekend Sourdough Brunch Duo',
    discount: 'Rp 150K Bundle',
    status: 'ACTIVE',
    views: 850,
    claims: 94,
    redemptions: 42,
    validPeriod: 'Sat & Sun Mornings'
  },
  {
    id: 'camp-3',
    title: 'Early Bird Morning Focus 2X Points',
    discount: '2X Rewards',
    status: 'PAUSED',
    views: 610,
    claims: 112,
    redemptions: 54,
    validPeriod: 'Weekdays before 10:00'
  }
];

export const CONVERSION_FUNNEL_STATS = {
  totalVisitors: 10842,
  menuViews: 6421,
  orderAttempts: 1104,
  completedOrders: 842,
  overallConversion: '7.8%',
  deviceDistribution: {
    mobile: '72%',
    desktop: '24%',
    tablet: '4%'
  }
};

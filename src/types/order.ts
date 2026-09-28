import { CartItem } from './product';

export type OrderType = 'DINE_IN' | 'PICKUP' | 'DELIVERY';

export type PaymentMethod = 'QRIS' | 'VIRTUAL_ACCOUNT' | 'CASH' | 'E_WALLET';

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface CustomerDetails {
  name: string;
  whatsapp: string;
  notes?: string;
  // Fulfillment specific fields:
  tableNumber?: string;
  pickupTime?: string;
  deliveryAddress?: string;
}

export interface PlacedOrder {
  id: string; // e.g. #NB-2048
  items: CartItem[];
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  orderType: OrderType;
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  estimatedPreparationTime: string;
}

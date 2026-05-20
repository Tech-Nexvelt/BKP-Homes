export type OrderStatus =
  | 'CONFIRMED' | 'DESIGN_DISCUSSION' | 'MATERIAL_SELECTION'
  | 'MANUFACTURING_STARTED' | 'IN_PRODUCTION' | 'QUALITY_CHECK'
  | 'FINAL_MODIFICATIONS' | 'PACKAGING' | 'READY_FOR_DISPATCH'
  | 'OUT_FOR_DELIVERY' | 'INSTALLATION_SCHEDULED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  qty: number;
  price: number;
  name: string;
  image?: string;
}

export interface OrderTracking {
  id: string;
  orderId: string;
  stage: OrderStatus;
  note?: string;
  updatedBy?: string;
  timestamp: string;
}

export interface Address {
  id: string;
  userId: string;
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  trackingId: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  discount: number;
  tax: number;
  addressId: string;
  address?: Address;
  tracking?: OrderTracking[];
  paymentId?: string;
  paymentMethod?: string;
  notes?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  items: { productId: string; variantId?: string; qty: number }[];
  addressId: string;
  paymentMethod: string;
  notes?: string;
}

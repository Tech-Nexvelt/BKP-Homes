export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type SortOrder = 'asc' | 'desc';

export interface QueryFilters {
  page?: string;
  limit?: string;
  sort?: string;
  order?: SortOrder;
  search?: string;
}

export type AppRole = 'CUSTOMER' | 'ADMIN' | 'EMPLOYEE';

export type OrderStatusType =
  | 'CONFIRMED'
  | 'DESIGN_DISCUSSION'
  | 'MATERIAL_SELECTION'
  | 'MANUFACTURING_STARTED'
  | 'IN_PRODUCTION'
  | 'QUALITY_CHECK'
  | 'FINAL_MODIFICATIONS'
  | 'PACKAGING'
  | 'READY_FOR_DISPATCH'
  | 'OUT_FOR_DELIVERY'
  | 'INSTALLATION_SCHEDULED'
  | 'DELIVERED'
  | 'CANCELLED';

export const ORDER_STAGES: Array<{
  status: OrderStatusType;
  label: string;
  description: string;
}> = [
  { status: 'CONFIRMED', label: 'Order Confirmed', description: 'Your order has been received and confirmed.' },
  { status: 'DESIGN_DISCUSSION', label: 'Design Discussion', description: 'Our designer will contact you within 24 hours.' },
  { status: 'MATERIAL_SELECTION', label: 'Material Selection', description: 'Premium materials being selected for your piece.' },
  { status: 'MANUFACTURING_STARTED', label: 'Manufacturing Started', description: 'Your furniture is now in production.' },
  { status: 'IN_PRODUCTION', label: 'In Production', description: 'Crafting in progress at our Hyderabad workshop.' },
  { status: 'QUALITY_CHECK', label: 'Quality Check', description: 'Rigorous quality inspection underway.' },
  { status: 'FINAL_MODIFICATIONS', label: 'Final Modifications', description: 'Last finishing touches being applied.' },
  { status: 'PACKAGING', label: 'Packaging', description: 'Carefully packed for safe transit.' },
  { status: 'READY_FOR_DISPATCH', label: 'Ready for Dispatch', description: 'Awaiting pickup from our warehouse.' },
  { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', description: 'Your furniture is on its way.' },
  { status: 'INSTALLATION_SCHEDULED', label: 'Installation Scheduled', description: 'Installation team confirmed for your address.' },
  { status: 'DELIVERED', label: 'Delivered Successfully', description: 'Enjoy your new Luxora furniture.' },
];

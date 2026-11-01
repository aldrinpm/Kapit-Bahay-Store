export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
}

export interface SimulatedOrder {
  orderId: string;
  customer: CustomerDetails;
  items: any[];
  total: number;
  paymentMethod: 'Cash on Delivery (Simulated)';
  status: 'Simulated Success';
  date: string;
}

export const createSimulatedOrder = (customer: CustomerDetails, items: any[], total: number): SimulatedOrder => {
  return {
    orderId: `SIM-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    customer,
    items,
    total,
    paymentMethod: 'Cash on Delivery (Simulated)',
    status: 'Simulated Success',
    date: new Date().toISOString(),
  };
};
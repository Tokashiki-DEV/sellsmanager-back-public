import { Timestamp } from 'typeorm';

export interface IUser {
  id: number;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'employe';
}

export interface ICustomers {
  id: number;
  created_at: Timestamp;
  name: string;
  email: string;
  phone: string;
  last_purchase: Timestamp | null;
  total_spent: number;
  total_orders: number;
}
export interface ICustomersOrders {
  id: number;
  created_at: any;
  employe_id: number;
  customer_id: number;
  total_service_price: number;
  total_product_price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer' | 'Manager';
  status: 'Active' | 'Inactive' | 'Pending';
  joinedAt: string;
  avatar: string;
  location: string;
  orders: number;
  spent: number;
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  date: string;
  items: number;
  paymentMethod: string;
}

export interface SummaryCard {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  color: string;
  bgColor: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  image: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  createdAt: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  trend: 'up' | 'down';
}
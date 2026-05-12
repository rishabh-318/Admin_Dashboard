import { User, Order, Product } from '@/types';

export const DUMMY_USERS: User[] = [
  { id: 'USR-001', name: 'Arjun Mehta',    email: 'arjun.mehta@gmail.com',     role: 'Admin',   status: 'Active',   joinedAt: '2024-01-12', avatar: 'AM', location: 'Mumbai, IN',      orders: 24, spent: 4820 },
  { id: 'USR-002', name: 'Sofia Reyes',    email: 'sofia.reyes@outlook.com',   role: 'Manager', status: 'Active',   joinedAt: '2024-02-05', avatar: 'SR', location: 'Madrid, ES',      orders: 18, spent: 3150 },
  { id: 'USR-003', name: 'Chen Wei',       email: 'chen.wei@company.cn',       role: 'Editor',  status: 'Inactive', joinedAt: '2024-03-20', avatar: 'CW', location: 'Beijing, CN',     orders:  7, spent:  980 },
  { id: 'USR-004', name: 'Priya Sharma',   email: 'priya.sharma@tech.io',      role: 'Viewer',  status: 'Pending',  joinedAt: '2024-04-08', avatar: 'PS', location: 'Delhi, IN',       orders:  0, spent:    0 },
  { id: 'USR-005', name: 'Marcus Johnson', email: 'm.johnson@corp.us',         role: 'Manager', status: 'Active',   joinedAt: '2024-01-30', avatar: 'MJ', location: 'New York, US',    orders: 31, spent: 6200 },
  { id: 'USR-006', name: 'Yuki Tanaka',    email: 'yuki.tanaka@jp.co',         role: 'Editor',  status: 'Active',   joinedAt: '2024-05-14', avatar: 'YT', location: 'Tokyo, JP',       orders: 12, spent: 2100 },
  { id: 'USR-007', name: 'Layla Hassan',   email: 'layla.hassan@domain.ae',    role: 'Viewer',  status: 'Active',   joinedAt: '2024-02-18', avatar: 'LH', location: 'Dubai, AE',       orders:  5, spent:  750 },
  { id: 'USR-008', name: 'Tom Erikson',    email: 'tom.erikson@nordic.se',     role: 'Admin',   status: 'Active',   joinedAt: '2023-12-01', avatar: 'TE', location: 'Stockholm, SE',   orders: 42, spent: 8900 },
  { id: 'USR-009', name: 'Amira Osei',     email: 'amira.osei@mail.gh',        role: 'Editor',  status: 'Pending',  joinedAt: '2024-06-02', avatar: 'AO', location: 'Accra, GH',       orders:  0, spent:    0 },
  { id: 'USR-010', name: 'Rafael Costa',   email: 'rafael.costa@br.net',       role: 'Viewer',  status: 'Inactive', joinedAt: '2024-03-11', avatar: 'RC', location: 'São Paulo, BR',   orders:  3, spent:  420 },
  { id: 'USR-011', name: 'Nina Petrova',   email: 'nina.petrova@ru.com',       role: 'Manager', status: 'Active',   joinedAt: '2024-01-22', avatar: 'NP', location: 'Moscow, RU',      orders: 19, spent: 3400 },
  { id: 'USR-012', name: 'James Okafor',   email: 'james.okafor@ng.org',       role: 'Editor',  status: 'Active',   joinedAt: '2024-04-29', avatar: 'JO', location: 'Lagos, NG',       orders:  8, spent: 1200 },
];

export const DUMMY_ORDERS: Order[] = [
  { id: 'ORD-4821', customer: 'Arjun Mehta',    product: 'Pro Plan Subscription', amount:  299, status: 'Completed',  date: '2024-06-15', items: 1, paymentMethod: 'Visa •••• 4242'        },
  { id: 'ORD-4820', customer: 'Marcus Johnson', product: 'Enterprise Bundle',      amount: 1499, status: 'Processing', date: '2024-06-14', items: 3, paymentMethod: 'Mastercard •••• 8731'  },
  { id: 'ORD-4819', customer: 'Sofia Reyes',    product: 'Team Seats (5x)',        amount:  750, status: 'Pending',    date: '2024-06-14', items: 5, paymentMethod: 'PayPal'                },
  { id: 'ORD-4818', customer: 'Yuki Tanaka',    product: 'Analytics Add-on',       amount:  149, status: 'Completed',  date: '2024-06-13', items: 1, paymentMethod: 'Visa •••• 1923'        },
  { id: 'ORD-4817', customer: 'Tom Erikson',    product: 'API Access + Storage',   amount:  599, status: 'Completed',  date: '2024-06-12', items: 2, paymentMethod: 'Amex •••• 3018'        },
  { id: 'ORD-4816', customer: 'Nina Petrova',   product: 'Starter Plan',           amount:   99, status: 'Cancelled',  date: '2024-06-11', items: 1, paymentMethod: 'Visa •••• 5500'        },
  { id: 'ORD-4815', customer: 'Layla Hassan',   product: 'Designer Tools',         amount:  249, status: 'Completed',  date: '2024-06-10', items: 2, paymentMethod: 'Stripe'                },
  { id: 'ORD-4814', customer: 'James Okafor',   product: 'Data Export Pack',       amount:   79, status: 'Processing', date: '2024-06-09', items: 1, paymentMethod: 'Mastercard •••• 2209'  },
  { id: 'ORD-4813', customer: 'Rafael Costa',   product: 'Freelancer Plan',        amount:  199, status: 'Pending',    date: '2024-06-08', items: 1, paymentMethod: 'PayPal'                },
  { id: 'ORD-4812', customer: 'Arjun Mehta',    product: 'Custom Domain',          amount:   39, status: 'Completed',  date: '2024-06-07', items: 1, paymentMethod: 'Visa •••• 4242'        },
];

export const DUMMY_PRODUCTS: Product[] = [
  { id: 'PRD-001', name: 'Aether Wireless Headphones', sku: 'AWH-BLK-1', category: 'Electronics',   brand: 'Aether',  image: '🎧', price: 149, stock:  84, sales:  312, rating: 4.7, createdAt: '2026-01-12', status: 'In Stock',     trend: 'up'   },
  { id: 'PRD-002', name: 'Lumio Desk Lamp Pro',         sku: 'LDP-WHT-2', category: 'Home & Office', brand: 'Lumio',   image: '💡', price:  79, stock:  12, sales:  198, rating: 4.5, createdAt: '2026-02-03', status: 'Low Stock',    trend: 'up'   },
  { id: 'PRD-003', name: 'Kinetic Running Shoes',       sku: 'KRS-GRY-9', category: 'Footwear',      brand: 'Kinetic', image: '👟', price: 119, stock:   0, sales:  540, rating: 4.3, createdAt: '2026-01-28', status: 'Out of Stock', trend: 'down' },
  { id: 'PRD-004', name: 'Zenith Smart Watch',          sku: 'ZSW-BLK-S', category: 'Electronics',   brand: 'Zenith',  image: '⌚', price: 299, stock:  47, sales:   87, rating: 4.8, createdAt: '2026-03-11', status: 'In Stock',     trend: 'up'   },
  { id: 'PRD-005', name: 'Cedar Notebook Set',          sku: 'CNS-BRN-3', category: 'Stationery',    brand: 'Cedar',   image: '📓', price:  24, stock: 230, sales: 1024, rating: 4.6, createdAt: '2026-01-05', status: 'In Stock',     trend: 'up'   },
  { id: 'PRD-006', name: 'Mist Diffuser Ultra',         sku: 'MDU-WHT-1', category: 'Home & Office', brand: 'Mist',    image: '🌫️', price:  59, stock:   5, sales:  276, rating: 4.2, createdAt: '2026-02-19', status: 'Low Stock',    trend: 'down' },
  { id: 'PRD-007', name: 'Apex Gaming Mouse',           sku: 'AGM-BLK-X', category: 'Electronics',   brand: 'Apex',    image: '🖱️', price:  89, stock:  61, sales:  445, rating: 4.9, createdAt: '2026-03-02', status: 'In Stock',     trend: 'up'   },
  { id: 'PRD-008', name: 'Canvas Tote Bag',             sku: 'CTB-TAN-L', category: 'Accessories',   brand: 'Canvas',  image: '👜', price:  34, stock: 180, sales:  832, rating: 4.4, createdAt: '2026-01-22', status: 'In Stock',     trend: 'up'   },
];

export const SUMMARY_DATA = {
  totalUsers:    { value: '12,847',   change: '+8.2%',   positive: true  },
  totalOrders:   { value: '4,821',    change: '+12.5%',  positive: true  },
  totalRevenue:  { value: '$248,920', change: '+5.1%',   positive: true  },
  pendingTasks:  { value: '38',       change: '-3 today',positive: false },
};
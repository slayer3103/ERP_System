export interface DashboardStats {
  totalRevenue: number
  totalInvoices: number
  totalCustomers: number
  totalProducts: number
  pendingAmount: number
  paidAmount: number
  overdueAmount: number
}

export interface RevenueOverTime {
  _id: {
    year: number
    month: number
  }
  total: number
  count: number
}

export interface CategoryDistribution {
  _id: string
  total: number
  count: number
}

export interface TopCustomer {
  _id: string
  name: string
  email: string
  totalSpent: number
  invoiceCount: number
}

export interface RecentInvoice {
  _id: string
  invoiceNumber: string
  customer: {
    name: string
  }
  grandTotal: number
  status: string
  createdAt: string
}

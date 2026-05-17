import { api } from "./client"
import type {
  DashboardStats,
  RevenueOverTime,
  CategoryDistribution,
  TopCustomer,
  RecentInvoice,
} from "@/types/analytics"

export const analyticsApi = {
  getDashboardStats: () => api.get<DashboardStats>("/analytics/dashboard-stats"),

  getRevenueOverTime: (months = 12) =>
    api.get<RevenueOverTime[]>(`/analytics/revenue-over-time?months=${months}`),

  getCategoryDistribution: () =>
    api.get<CategoryDistribution[]>("/analytics/category-distribution"),

  getTopCustomers: (limit = 5) =>
    api.get<TopCustomer[]>(`/analytics/top-customers?limit=${limit}`),

  getRecentInvoices: (limit = 10) =>
    api.get<RecentInvoice[]>(`/analytics/recent-invoices?limit=${limit}`),
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { analyticsApi } from "@/lib/api/analytics"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentInvoices } from "@/components/dashboard/recent-invoices"
import { TopCustomers } from "@/components/dashboard/top-customers"

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: analyticsApi.getDashboardStats,
  })

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["revenue-over-time"],
    queryFn: () => analyticsApi.getRevenueOverTime(12),
  })

  const { data: topCustomers, isLoading: customersLoading } = useQuery({
    queryKey: ["top-customers"],
    queryFn: () => analyticsApi.getTopCustomers(5),
  })

  const { data: recentInvoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["recent-invoices"],
    queryFn: () => analyticsApi.getRecentInvoices(5),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your business performance
        </p>
      </div>

      <StatsCards stats={stats} isLoading={statsLoading} />

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart data={revenueData} isLoading={revenueLoading} />
        </div>
        <div className="lg:col-span-3">
          <TopCustomers data={topCustomers} isLoading={customersLoading} />
        </div>
      </div>

      <RecentInvoices data={recentInvoices} isLoading={invoicesLoading} />
    </div>
  )
}

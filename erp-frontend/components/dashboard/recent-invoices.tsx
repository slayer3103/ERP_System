"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import type { RecentInvoice } from "@/types/analytics"

interface RecentInvoicesProps {
  data?: RecentInvoice[]
  isLoading: boolean
}

const statusStyles: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"; label: string }> = {
  paid: { variant: "success", label: "Paid" },
  pending: { variant: "warning", label: "Pending" },
  overdue: { variant: "destructive", label: "Overdue" },
  draft: { variant: "secondary", label: "Draft" },
  sent: { variant: "outline", label: "Sent" },
  cancelled: { variant: "secondary", label: "Cancelled" },
}

export function RecentInvoices({ data, isLoading }: RecentInvoicesProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-1 h-4 w-56" />
          </div>
          <Skeleton className="h-9 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Latest invoices from your business</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/invoices">
            View all
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((invoice) => {
            const status = statusStyles[invoice.status] || statusStyles.pending
            return (
              <div
                key={invoice._id}
                className="flex items-center justify-between"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/invoices/${invoice._id}`}
                    className="font-medium hover:underline"
                  >
                    {invoice.invoiceNumber}
                  </Link>
                  <p className="truncate text-sm text-muted-foreground">
                    {invoice.customer.name}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={status.variant}>{status.label}</Badge>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(invoice.grandTotal)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(invoice.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          {(!data || data.length === 0) && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No recent invoices
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

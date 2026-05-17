"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/utils"
import type { TopCustomer } from "@/types/analytics"

interface TopCustomersProps {
  data?: TopCustomer[]
  isLoading: boolean
}

export function TopCustomers({ data, isLoading }: TopCustomersProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>Customers with highest lifetime value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((customer, index) => {
            const initials = customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)

            return (
              <div key={customer._id} className="flex items-center gap-4">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback
                      className={
                        index === 0
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : index === 1
                          ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          : index === 2
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-background text-xs font-bold shadow-sm ring-1 ring-border">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{customer.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {customer.invoiceCount} invoices
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {formatCurrency(customer.totalSpent)}
                  </p>
                </div>
              </div>
            )
          })}
          {(!data || data.length === 0) && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No customer data available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

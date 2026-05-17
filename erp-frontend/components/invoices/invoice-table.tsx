"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Download,
  RefreshCw,
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { invoicesApi } from "@/lib/api/invoices"
import type { Invoice, InvoiceStatus } from "@/types/invoice"

interface InvoiceTableProps {
  invoices: Invoice[]
  isLoading: boolean
  onDelete: (invoice: Invoice) => void
  onStatusChange: (invoice: Invoice, status: InvoiceStatus) => void
}

const statusStyles: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"; label: string }> = {
  paid: { variant: "success", label: "Paid" },
  pending: { variant: "warning", label: "Pending" },
  overdue: { variant: "destructive", label: "Overdue" },
  draft: { variant: "secondary", label: "Draft" },
  sent: { variant: "outline", label: "Sent" },
  cancelled: { variant: "secondary", label: "Cancelled" },
}

const statusOptions: InvoiceStatus[] = ["draft", "sent", "pending", "paid", "overdue", "cancelled"]

export function InvoiceTable({
  invoices,
  isLoading,
  onDelete,
  onStatusChange,
}: InvoiceTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell><Skeleton className="size-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <p className="text-muted-foreground">No invoices found</p>
          <p className="text-sm text-muted-foreground">
            Create your first invoice to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const status = statusStyles[invoice.status] || statusStyles.pending
            return (
              <TableRow key={invoice._id}>
                <TableCell>
                  <Link
                    href={`/invoices/${invoice._id}`}
                    className="font-medium hover:underline"
                  >
                    {invoice.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell>{invoice.customer.name}</TableCell>
                <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(invoice.grandTotal)}
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/invoices/${invoice._id}`}>
                          <Eye className="mr-2 size-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/invoices/${invoice._id}/edit`}>
                          <Pencil className="mr-2 size-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={invoicesApi.getPdf(invoice._id)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 size-4" />
                          Download PDF
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <RefreshCw className="mr-2 size-4" />
                          Change Status
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          {statusOptions.map((statusOption) => (
                            <DropdownMenuItem
                              key={statusOption}
                              onClick={() => onStatusChange(invoice, statusOption)}
                              disabled={invoice.status === statusOption}
                            >
                              <Badge
                                variant={statusStyles[statusOption].variant}
                                className="mr-2"
                              >
                                {statusStyles[statusOption].label}
                              </Badge>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(invoice)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

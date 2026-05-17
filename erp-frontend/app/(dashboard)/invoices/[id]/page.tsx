"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { invoicesApi } from "@/lib/api/invoices"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, Download, Pencil, Printer } from "lucide-react"

const statusStyles: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"; label: string }> = {
  paid: { variant: "success", label: "Paid" },
  pending: { variant: "warning", label: "Pending" },
  overdue: { variant: "destructive", label: "Overdue" },
  draft: { variant: "secondary", label: "Draft" },
  sent: { variant: "outline", label: "Sent" },
  cancelled: { variant: "secondary", label: "Cancelled" },
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const invoiceId = params.id as string

  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => invoicesApi.getById(invoiceId),
    enabled: !!invoiceId,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Invoice not found</p>
          <Button variant="link" onClick={() => router.back()}>
            Go back
          </Button>
        </div>
      </div>
    )
  }

  const status = statusStyles[invoice.status] || statusStyles.pending

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/invoices">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <p className="text-muted-foreground">
              Created on {formatDate(invoice.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/invoices/${invoice._id}/edit`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 size-4" />
            Print
          </Button>
          <Button size="sm" asChild>
            <a
              href={invoicesApi.getPdf(invoice._id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 size-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Bill To
                </h4>
                <div className="mt-1">
                  <p className="font-medium">{invoice.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customer.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.customer.address}
                  </p>
                  {invoice.customer.gstNumber && (
                    <p className="text-sm text-muted-foreground">
                      GST: {invoice.customer.gstNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:text-right">
                <div className="space-y-1">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Invoice Date:{" "}
                    </span>
                    <span className="font-medium">
                      {formatDate(invoice.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Due Date:{" "}
                    </span>
                    <span className="font-medium">
                      {formatDate(invoice.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">GST</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.rate)}
                      </TableCell>
                      <TableCell className="text-right">{item.gst}%</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Subtotal</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(invoice.subtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>Total GST</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(invoice.totalGst)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell colSpan={4}>Grand Total</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(invoice.grandTotal)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {(invoice.notes || invoice.terms) && (
              <>
                <Separator />
                <div className="grid gap-4 sm:grid-cols-2">
                  {invoice.notes && (
                    <div>
                      <h4 className="text-sm font-medium">Notes</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {invoice.notes}
                      </p>
                    </div>
                  )}
                  {invoice.terms && (
                    <div>
                      <h4 className="text-sm font-medium">Terms & Conditions</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {invoice.terms}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST</span>
              <span>{formatCurrency(invoice.totalGst)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(invoice.grandTotal)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

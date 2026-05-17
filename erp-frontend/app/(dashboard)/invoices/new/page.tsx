"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, useFieldArray } from "react-hook-form"
import { customersApi } from "@/lib/api/customers"
import { invoicesApi } from "@/lib/api/invoices"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface InvoiceFormData {
  customer: string
  dueDate: string
  notes: string
  terms: string
  items: {
    product: string
    productName: string
    quantity: number
    rate: number
    gst: number
  }[]
}

export default function NewInvoicePage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: customersApi.getAll,
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    defaultValues: {
      customer: "",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      notes: "",
      terms: "Payment due within 30 days",
      items: [{ product: "", productName: "", quantity: 1, rate: 0, gst: 18 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const watchItems = watch("items")

  const calculateTotals = () => {
    let subtotal = 0
    let totalGst = 0

    watchItems.forEach((item) => {
      const amount = item.quantity * item.rate
      const gstAmount = (amount * item.gst) / 100
      subtotal += amount
      totalGst += gstAmount
    })

    return {
      subtotal,
      totalGst,
      grandTotal: subtotal + totalGst,
    }
  }

  const totals = calculateTotals()

  const createMutation = useMutation({
    mutationFn: invoicesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
      toast.success("Invoice created successfully")
      router.push("/invoices")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create invoice")
    },
  })

  const onSubmit = handleSubmit((data) => {
    if (!data.customer) {
      toast.error("Please select a customer")
      return
    }

    if (data.items.length === 0 || data.items.every((item) => !item.productName)) {
      toast.error("Please add at least one item")
      return
    }

    createMutation.mutate({
      customer: data.customer,
      dueDate: data.dueDate,
      notes: data.notes,
      terms: data.terms,
      items: data.items.map((item) => ({
        product: item.product || item.productName,
        quantity: item.quantity,
        rate: item.rate,
        gst: item.gst,
      })),
    })
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/invoices">
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create Invoice</h1>
          <p className="text-muted-foreground">
            Fill in the details to create a new invoice
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer *</Label>
                    <Select
                      value={watch("customer")}
                      onValueChange={(value) => setValue("customer", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers?.map((customer) => (
                          <SelectItem key={customer._id} value={customer._id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.customer && (
                      <p className="text-xs text-destructive">
                        {errors.customer.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      {...register("dueDate", { required: "Due date is required" })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Invoice Items</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({ product: "", productName: "", quantity: 1, rate: 0, gst: 18 })
                  }
                >
                  <Plus className="mr-2 size-4" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field, index) => {
                    const item = watchItems[index]
                    const amount = item ? item.quantity * item.rate : 0
                    const gstAmount = item ? (amount * item.gst) / 100 : 0
                    const total = amount + gstAmount

                    return (
                      <div
                        key={field.id}
                        className="grid gap-4 rounded-lg border p-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Item Name *</Label>
                            <Input
                              {...register(`items.${index}.productName`, {
                                required: "Item name is required",
                              })}
                              placeholder="Enter item name"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-2">
                              <Label>Qty</Label>
                              <Input
                                type="number"
                                min="1"
                                {...register(`items.${index}.quantity`, {
                                  valueAsNumber: true,
                                  min: 1,
                                })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rate</Label>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...register(`items.${index}.rate`, {
                                  valueAsNumber: true,
                                  min: 0,
                                })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>GST %</Label>
                              <Select
                                value={String(watchItems[index]?.gst || 18)}
                                onValueChange={(value) =>
                                  setValue(`items.${index}.gst`, Number(value))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">0%</SelectItem>
                                  <SelectItem value="5">5%</SelectItem>
                                  <SelectItem value="12">12%</SelectItem>
                                  <SelectItem value="18">18%</SelectItem>
                                  <SelectItem value="28">28%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Amount: {formatCurrency(amount)} + GST:{" "}
                            {formatCurrency(gstAmount)} ={" "}
                            <span className="font-medium text-foreground">
                              {formatCurrency(total)}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            <Trash2 className="size-4 text-destructive" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    {...register("notes")}
                    placeholder="Additional notes for the customer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Input
                    id="terms"
                    {...register("terms")}
                    placeholder="Payment terms"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST</span>
                  <span>{formatCurrency(totals.totalGst)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(totals.grandTotal)}</span>
                </div>
                <Separator />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Create Invoice
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

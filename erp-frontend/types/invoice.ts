export interface InvoiceItem {
  product: string
  productName: string
  quantity: number
  rate: number
  amount: number
  gst: number
  gstAmount: number
  total: number
}

export interface Invoice {
  _id: string
  invoiceNumber: string
  customer: {
    _id: string
    name: string
    email: string
    phone: string
    address: string
    gstNumber?: string
  }
  items: InvoiceItem[]
  subtotal: number
  totalGst: number
  grandTotal: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  dueDate: string
  notes?: string
  terms?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceFormData {
  customer: string
  items: {
    product: string
    quantity: number
    rate: number
    gst: number
  }[]
  dueDate: string
  notes?: string
  terms?: string
}

export type InvoiceStatus = Invoice["status"]

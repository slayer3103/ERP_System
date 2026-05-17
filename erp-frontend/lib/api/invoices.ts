import { api } from "./client"
import type { Invoice, InvoiceFormData } from "@/types/invoice"

export const invoicesApi = {
  getAll: (params?: { status?: string; startDate?: string; endDate?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append("status", params.status)
    if (params?.startDate) searchParams.append("startDate", params.startDate)
    if (params?.endDate) searchParams.append("endDate", params.endDate)
    const query = searchParams.toString()
    return api.get<Invoice[]>(`/invoice${query ? `?${query}` : ""}`)
  },

  getById: (id: string) => api.get<Invoice>(`/invoice/${id}`),

  create: (data: InvoiceFormData) => api.post<Invoice>("/invoice", data),

  update: (id: string, data: Partial<InvoiceFormData>) =>
    api.put<Invoice>(`/invoice/${id}`, data),

  delete: (id: string) => api.delete(`/invoice/${id}`),

  updateStatus: (id: string, status: string) =>
    api.put<Invoice>(`/invoice/${id}/status`, { status }),

  getPdf: (id: string) => `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/invoice/${id}/pdf`,
}

import { api } from "./client"
import type { Customer, CustomerFormData } from "@/types/customer"

export const customersApi = {
  getAll: () => api.get<Customer[]>("/customer"),

  getById: (id: string) => api.get<Customer>(`/customer/${id}`),

  create: (data: CustomerFormData) => api.post<Customer>("/customer", data),

  update: (id: string, data: Partial<CustomerFormData>) =>
    api.put<Customer>(`/customer/${id}`, data),

  delete: (id: string) => api.delete(`/customer/${id}`),

  search: (query: string) => api.get<Customer[]>(`/customer/search?q=${query}`),
}

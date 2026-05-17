import { api } from "./client"
import type { LoginCredentials, LoginResponse } from "@/types/auth"

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>("/auth/login", credentials, { skipAuth: true }),

  logout: () => api.post("/auth/logout"),

  getCurrentUser: () => api.get("/auth/me"),
}

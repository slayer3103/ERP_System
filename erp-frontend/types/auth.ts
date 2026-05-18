export interface User {
  id: number
  username: string
  role: "admin" | "superadmin"
  status: "Active" | "Inactive"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  username: string
  password: string
  role?: string
}

export interface LoginResponse {
  message: string
  user: User
}

export interface ApiError {
  message: string
  status?: number
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
  businessName?: string
  businessAddress?: string
  businessLogo?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  status?: number
}

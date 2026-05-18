import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { User, AuthState } from "@/types/auth"

interface AuthStore extends AuthState {
  setAuth: (user: User) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      _hasHydrated: false,

      setAuth: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setHasHydrated: (state) =>
        set({
          _hasHydrated: state,
          isLoading: false,
        }),
    }),
    {
      name: "erp-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

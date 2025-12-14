import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  first_name?: string
  last_name?: string
  email?: string
  id?: string | number
  [key: string]: unknown
}

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage', // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)









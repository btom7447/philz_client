import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  syncFromSession: (user: Pick<User, "id" | "role"> | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      // Full overwrite (used on login)
      setUser: (user) => set({ user }),

      // Clear everything
      logout: () => set({ user: null }),

      // Merge session data safely (id + role only)
      syncFromSession: (sessionUser) =>
        set((state) => {
          if (!sessionUser) return { user: null };

          // If no existing user, create minimal one
          if (!state.user) {
            return {
              user: {
                id: sessionUser.id,
                role: sessionUser.role,
                name: "",
                email: "",
                avatarUrl: "",
              },
            };
          }

          // Preserve everything except id & role
          return {
            user: {
              ...state.user,
              id: sessionUser.id,
              role: sessionUser.role,
            },
          };
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
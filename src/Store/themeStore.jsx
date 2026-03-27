import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,

      // Action to toggle theme
      toggleTheme: () => {
        const nextMode = !get().darkMode;
        set({ darkMode: nextMode });

        // Sync the DOM class immediately
        if (nextMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "theme-storage", // Unique key for theme only
      // Ensures the 'dark' class is applied as soon as the store rehydrates
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add("dark");
        }
      },
    },
  ),
);

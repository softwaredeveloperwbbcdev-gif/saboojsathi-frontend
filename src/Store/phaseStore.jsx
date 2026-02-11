import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePhaseStore = create(
  persist(
    (set) => ({
      phaseId: null,
      setPhaseId: (id) => set({ phaseId: id }),
    }),
    {
      name: "phase-storage", // localStorage key
    },
  ),
);

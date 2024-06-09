import { create } from "zustand";

interface ErrorStore {
  error: string;
  setError: (error: string) => void;
  removeError: () => void;
}

export const errorStore = create<ErrorStore>()((set) => ({
  error: "",
  setError: (error) => set({ error }),
  removeError: () => set({ error: "" }),
}));

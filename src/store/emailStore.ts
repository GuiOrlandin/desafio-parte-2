import { create } from "zustand";

interface EmailStore {
  email: string;
  setEmail: (email: string) => void;
  removeEmail: () => void;
}

export const emailStore = create<EmailStore>()((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  removeEmail: () => set({ email: "" }),
}));

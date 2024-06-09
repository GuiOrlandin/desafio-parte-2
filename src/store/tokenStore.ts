import { create } from "zustand";

interface TokenStore {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const tokenStore = create<TokenStore>()((set) => ({
  token: "",
  setToken: (token) => set({ token }),
  removeToken: () => set({ token: "" }),
}));

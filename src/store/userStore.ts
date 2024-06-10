import { ProductResponse } from "@/app/page";
import { create } from "zustand";

export interface User {
  _id: string;
  name: string;
  email: string;
  products: ProductResponse[];
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const userStore = create<UserStore>()((set) => ({
  user: {
    _id: "",
    email: "",
    name: "",
    products: [],
  },
  setUser: (user) => set({ user }),
  removeUser: () =>
    set({
      user: {
        _id: "",
        email: "",
        name: "",
        products: [],
      },
    }),
}));

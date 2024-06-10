import { create } from "zustand";

export interface Product {
  _id: string;
  description: string;
  name: string;
  price: number;
  category: string;
  user: string;
  stock: number;
}

export interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
}

export const productStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  addProduct: (product: Product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (productId: string) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    })),
}));

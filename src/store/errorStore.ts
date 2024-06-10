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

// Embora nesse projeto não tenha tanta a utilidade a implementação de um estado global, quando pensa-se no crescimento do projeto e padronizaçao dos erros seria interessante.

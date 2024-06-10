import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "../store/tokenStore";
import { queryClient } from "@/lib/react-query";

export interface ProductRegisterDetails {
  description: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

async function postData(data: ProductRegisterDetails, authToken: string) {
  try {
    if (authToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await axios.post(
        "http://localhost:3333/products",
        data,
        config
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export function useProductRegisterMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);

  if (typeof window !== "undefined") {
    const storageToken = localStorage.getItem("storeToken");
    if (storageToken) {
      setToken(storageToken);
    }
  }

  const mutate = useMutation({
    mutationFn: (data: ProductRegisterDetails) => postData(data, authToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products-info"],
        exact: true,
        refetchType: "active",
      });
    },
  });
  return mutate;
}

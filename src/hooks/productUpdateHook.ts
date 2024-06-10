import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { tokenStore } from "../store/tokenStore";

export interface ProductUpdateDetails {
  _id: string;
  description: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

async function postData(data: ProductUpdateDetails, authToken: string) {
  try {
    if (authToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await axios.put(
        `http://localhost:3333/products/${data._id}`,
        data,
        config
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export function useUpdateProductMutate() {
  const setToken = tokenStore((state) => state.setToken);
  const authToken = tokenStore((state) => state.token);

  if (typeof window !== "undefined") {
    const storageToken = localStorage.getItem("storeToken");
    if (storageToken) {
      setToken(storageToken);
    }
  }

  const mutate = useMutation({
    mutationFn: (data: ProductUpdateDetails) => postData(data, authToken),
  });
  return mutate;
}

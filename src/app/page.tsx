"use client";

import { ProductCard } from "./components/productCard";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TopBar from "./components/topBar";
import { useEffect } from "react";
import { tokenStore } from "@/store/tokenStore";
import { emailStore } from "@/store/emailStore";
import { User, userStore } from "@/store/userStore";
import { productStore } from "@/store/allProductsStore";
import { Spinner } from "@radix-ui/themes";

export interface ProductResponse {
  _id: string;
  description: string;
  name: string;
  price: number;
  category: string;
  user: string;
  stock: number;
}

export default function Home() {
  const setEmail = emailStore((state) => state.setEmail);
  const email = emailStore((state) => state.email);
  const setToken = tokenStore((state) => state.setToken);
  const token = tokenStore((state) => state.token);
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  const setProducts = productStore((state) => state.setProducts);
  const products = productStore((state) => state.products);

  const {
    data: productsData,
    refetch: refetchProduct,
    isSuccess,
    isLoading,
  } = useQuery<ProductResponse[]>({
    queryKey: ["products-info"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/products`)
        .then((response) => response.data);
    },
  });

  const { data, refetch } = useQuery<User>({
    queryKey: ["user-info"],

    queryFn: async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios
        .get(`http://localhost:3333/users/${email}`, config)
        .then((response) => response.data);
    },
  });

  useEffect(() => {
    refetchProduct();
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (isSuccess) {
      setProducts(productsData);
    }

    if (typeof window !== "undefined") {
      const storageToken = localStorage.getItem("storeToken");
      const storageEmail = localStorage.getItem("storeEmail");

      if (storageToken && storageEmail && !token && !email) {
        setEmail(storageEmail);
        setToken(storageToken);
      } else if (email && token) {
        refetch();
      }
    }
  }, [email, token, data, isSuccess]);

  return (
    <div className="bg-[#160548] min-h-screen md:flex-col">
      <TopBar page="home" />
      <div className="flex flex-wrap gap-5 p-7 max-sm:flex-col items-center justify-center">
        {!isLoading ? (
          <>
            {products.length > 0 ? (
              <>
                {products?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    userId={user!._id}
                  />
                ))}
              </>
            ) : (
              <h1 className="text-3xl mt-[10rem] text-slate-400">
                Não contem itens listados!
              </h1>
            )}
          </>
        ) : (
          <div className="text-3xl text-white font-semibold">Carregando...</div>
        )}
      </div>
    </div>
  );
}

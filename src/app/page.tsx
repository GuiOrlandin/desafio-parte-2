"use client";

import { ProductCard } from "./components/productCard";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TopBar from "./components/topBar";

export interface ProductResponse {
  _id: string;
  description: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export default function Home() {
  const { data: products, refetch } = useQuery<ProductResponse[]>({
    queryKey: ["products-info"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/products`)
        .then((response) => response.data);
    },
  });

  return (
    <div className="bg-[#160548] h-screen">
      <TopBar page="home" />
      <div className="flex gap-5  p-7">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

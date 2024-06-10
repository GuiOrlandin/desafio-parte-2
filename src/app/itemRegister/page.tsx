"use client";

import { ChangeEvent, useEffect, useState } from "react";

import {
  ProductRegisterDetails,
  useProductRegisterMutate,
} from "@/hooks/productRegisterHook";
import { useRouter } from "next/navigation";
import TopBar from "../components/topBar";

export default function ItemRegister() {
  const router = useRouter();

  const [productDetails, SetProductDetails] =
    useState<ProductRegisterDetails>();
  const { mutate, isSuccess } = useProductRegisterMutate();

  function handleSetProductDetails(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputTitle: string
  ) {
    const { value, type } = event.target;
    SetProductDetails((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: type === "number" ? parseFloat(value) : value,
    }));
  }

  function handleProductRegister(productDetails: ProductRegisterDetails) {
    mutate(productDetails);
  }

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <div className="bg-[#160548] h-screen flex flex-col justify-center items-center">
      <div className="fixed top-0 right-0">
        <TopBar page="itemRegister" />
      </div>

      <div className="bg-[#F5F5F5] w-[350px] h-auto p-4 rounded-md flex flex-col justify-around space-y-4">
        <div className="flex flex-col">
          <span>Nome</span>
          <input
            type="text"
            className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
            placeholder="Nome"
            onChange={(value) => handleSetProductDetails(value, "name")}
          />
        </div>
        <div className="flex flex-col">
          <span>Descrição</span>
          <textarea
            className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
            placeholder="Descrição"
            onChange={(value) => handleSetProductDetails(value, "description")}
          />
        </div>
        <div className="flex flex-col">
          <span>Categoria</span>
          <input
            className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
            placeholder="Categoria"
            onChange={(value) => handleSetProductDetails(value, "category")}
          />
        </div>
        <div className="flex flex-col">
          <span>Preço</span>
          <input
            type="number"
            className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
            placeholder="Preço"
            min="0"
            onChange={(value) => handleSetProductDetails(value, "price")}
          />
        </div>
        <div className="flex flex-col">
          <span>Em estoque</span>
          <input
            type="number"
            className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
            placeholder="Em estoque"
            min="0"
            onChange={(value) => handleSetProductDetails(value, "stock")}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handleProductRegister(productDetails!)}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}

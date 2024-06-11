"use client";

import TopBar from "@/app/components/topBar";
import {
  ProductUpdateDetails,
  useUpdateProductMutate,
} from "@/hooks/productUpdateHook";
import { Product } from "@/store/allProductsStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ItemUpdate({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [detailsForProductToUpdate, setDetailsForProductToUpdate] =
    useState<ProductUpdateDetails>({
      _id: "",
      category: "",
      description: "",
      name: "",
      price: 0,
      stock: 0,
    });

  const { mutate, isSuccess: productUpdated } = useUpdateProductMutate();

  const {
    data: productData,
    isSuccess,
    isLoading,
  } = useQuery<Product>({
    queryKey: ["product-info", params.id],

    queryFn: async () => {
      return axios
        .get(`http://localhost:3333/products/${params.id}`)
        .then((response) => response.data);
    },
  });

  function handleSetDetailsForProductToUpdate(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputTitle: string
  ) {
    const { value, type } = event.target;
    setDetailsForProductToUpdate((prevDetails) => ({
      ...prevDetails!,
      [inputTitle]: type === "number" ? parseFloat(value) : value,
    }));
  }

  useEffect(() => {
    if (productData) {
      setDetailsForProductToUpdate({
        _id: productData._id,
        category: productData.category,
        description: productData.description,
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
      });
    }
  }, [isSuccess, productData]);

  function handleProductUpdate(
    detailsForProductToUpdate: ProductUpdateDetails
  ) {
    mutate(detailsForProductToUpdate);
  }

  useEffect(() => {
    if (productUpdated) {
      router.push("/");
    }
  }, [productUpdated, productData]);

  return (
    <div className="bg-[#160548] h-screen flex flex-col justify-center items-center">
      {isLoading ? (
        <>
          <div className="text-3xl text-white font-semibold">Carregando...</div>
        </>
      ) : (
        <>
          <div className="fixed top-0 right-0">
            <TopBar page="itemRegister" />
          </div>

          <div className="bg-[#F5F5F5] w-[350px] h-auto p-4 rounded-md flex flex-col justify-around space-y-4">
            <div className="flex flex-col">
              <span className="font-semibold mb-3">
                Edite os campos que desejar atualizar!
              </span>
              <span>Nome</span>
              <input
                type="text"
                className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
                placeholder="Nome"
                value={detailsForProductToUpdate?.name}
                onChange={(value) =>
                  handleSetDetailsForProductToUpdate(value, "name")
                }
              />
            </div>
            <div className="flex flex-col">
              <span>Descrição</span>
              <textarea
                className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md resize-none"
                placeholder="Descrição"
                value={detailsForProductToUpdate.description}
                onChange={(value) =>
                  handleSetDetailsForProductToUpdate(value, "description")
                }
                style={{ minHeight: "100px", maxHeight: "400px" }}
              />
            </div>
            <div className="flex flex-col">
              <span>Categoria</span>
              <input
                className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
                placeholder="Categoria"
                value={detailsForProductToUpdate?.category}
                onChange={(event) =>
                  handleSetDetailsForProductToUpdate(event, "category")
                }
              />
            </div>
            <div className="flex flex-col">
              <span>Preço</span>
              <input
                type="number"
                className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
                placeholder="Preço"
                value={detailsForProductToUpdate?.price}
                min="0"
                onChange={(value) =>
                  handleSetDetailsForProductToUpdate(value, "price")
                }
              />
            </div>
            <div className="flex flex-col">
              <span>Em estoque</span>
              <input
                type="number"
                className="text-lg cursor-pointer border border-[#160548] mt-2 p-2 rounded-md"
                placeholder="Em estoque"
                value={detailsForProductToUpdate?.stock}
                min="0"
                onChange={(value) =>
                  handleSetDetailsForProductToUpdate(value, "stock")
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleProductUpdate(detailsForProductToUpdate!)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:bg-red-700"
              >
                Atualizar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

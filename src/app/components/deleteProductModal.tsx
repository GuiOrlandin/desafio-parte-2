"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { MdClose } from "react-icons/md";
import { ProductResponse } from "../page";
import { useQuery } from "@tanstack/react-query";
import { tokenStore } from "@/store/tokenStore";
import axios from "axios";
import { productStore } from "@/store/allProductsStore";

interface DeleteProductModalProps {
  product: ProductResponse;
}

export default function DeleteProductModal({
  product,
}: DeleteProductModalProps) {
  const [open, setOpen] = useState(false);
  const token = tokenStore((state) => state.token);
  const [productId, setProductId] = useState("");
  const removeProduct = productStore((state) => state.removeProduct);

  const { refetch, status } = useQuery({
    queryKey: ["delete-Product"],
    enabled: false,

    queryFn: async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios
        .delete(`http://localhost:3333/products/${product._id}`, config)
        .then((response) => response.data);
    },
  });

  function handleDeleteProduct() {
    setProductId(product._id);
    refetch();
  }

  useEffect(() => {
    if (status === "success" && productId) {
      removeProduct(productId);
      setOpen(false);
      setProductId("");
    }
  }, [status, productId]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center  px-3 py-2 bg-[#160548] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:bg-[#5e5185]">
          <MdClose size={20} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=`${open}`]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className=" data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[200px] w-[320px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title>Deletar o Produto</Dialog.Title>
          <Dialog.Description className="mt-[2rem]">
            Você tem certeza que deseja deletar o produto?
          </Dialog.Description>
          <div className="flex justify-between max-w-[270px] mt-2">
            <button
              onClick={() => handleDeleteProduct()}
              className="flex items-center  px-3 py-2 bg-[#160548] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:bg-[#5e5185]"
            >
              Sim
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center  px-3 py-2 bg-[#160548] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:bg-[#5e5185]"
            >
              Não
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="text-violet11 pt-[25px] hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none pb-5"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

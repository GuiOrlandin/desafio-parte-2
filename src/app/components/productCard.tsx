"use client";

import { ProductResponse } from "../page";

import { CiEdit } from "react-icons/ci";
import DeleteProductModal from "./deleteProductModal";

interface ProductCardProps {
  product: ProductResponse;
  userId: string;
}

export function ProductCard({ product, userId }: ProductCardProps) {
  function handleEditClick() {
    window.location.href = `/itemUpdate/${product._id}`;
  }
  return (
    <div className="w-[306px] p-6 bg-[#F5F5F5] rounded-[20px] flex items-center pt-3 flex-col">
      {product ? (
        <>
          {userId === product.user && (
            <div className="flex gap-[12rem] pb-5">
              <button
                onClick={() => handleEditClick()}
                className="flex items-center  px-3 py-2 bg-[#160548] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:bg-[#5e5185]"
              >
                <CiEdit size={20} />
              </button>
              <div className="flex-grow">
                <DeleteProductModal product={product} />
              </div>
            </div>
          )}
          <div key={product._id}>
            <div className="flex text-black gap-1">
              <span className="text-black font-bold flex gap-1">Produto:</span>
              {product.name}
            </div>
            <div className="text-black mt-2">
              <span className="text-black font-bold flex gap-1">
                Descrição do produto:
              </span>

              {product.description}
            </div>
            <div className="flex text-black gap-1 mt-2">
              <span className="text-black font-bold flex gap-1">
                Categoria:
              </span>

              {product.category}
            </div>
            <div className="text-black flex flex-col gap-2 mt-2">
              <div className="flex gap-1 items-center">
                <span className="text-black font-bold flex gap-1">valor:</span>
                <span>R${product.price}</span>
              </div>
              <div className="flex gap-0.5">
                <p className="text-black font-semibold"> Produtos em stoque:</p>
                <span>{product.stock}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-black font-semibold">Geladeira</div>
          <div className="text-black ">Uma descrição sobre geladeira </div>
          <div className="text-black flex flex-col gap-2 ">
            <div className="flex gap-1 items-center">
              <span className="text-black font-bold flex gap-1">valor:</span>
              <span>R$20,10</span>
            </div>
            <div className="flex gap-0.5">
              <p className="text-black font-semibold"> Produtos em stoque:</p>
              <span>3</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { ProductResponse } from "../page";

interface ProductCardProps {
  product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
  console.log(product);

  return (
    <div className="w-[306px] h-[250px] bg-[#F5F5F5] rounded-[20px] flex items-center pt-8 flex-col">
      {product ? (
        <>
          <div key={product._id}>
            <div className="text-black font-semibold">{product.name}</div>
            <div className="text-black ">{product.description} </div>
            <div className="text-black flex flex-col gap-2 mt-4">
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
          <div className="text-black flex flex-col gap-2 mt-4">
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

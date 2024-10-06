"use client"

import { brandLogos } from "@/constants";
import Image from "next/image";

interface CarBrandProps {
  brandName: string;
}

export default function CarBrand({ brandName }: CarBrandProps) {
  const logoSrc = brandLogos.get(brandName.toLowerCase());

  return (
    <button 
      type="button"
      className="dark:bg-gray-700 dark:border-black pl-1 dark:text-white py-2 border-2 border-gray-800 text-black rounded-xl flex items-center justify-center w-48 h-16 gap-3">
      {logoSrc ? (
        <Image
          className="object-contain h-[30px] w-auto"
          src={logoSrc}
          alt="Brand Logo"
          width={80}
          height={30}
        />
      ) : (
        <div className="h-[50px] w-[50px] bg-gray-200 flex items-center justify-center">
          {/* Placeholder */}
          <span>No Logo</span>
        </div>
      )}
      <div className="font-bold">
        {brandName.toUpperCase()}
      </div>
    </button>
  );
}

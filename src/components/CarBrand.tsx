"use client"

import { brandLogos } from "@/constants";
import { getURL } from "@/utils/GeneralServices";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarBrandProps {
  brandName: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentBrand: string | undefined
}

export default function CarBrand({ brandName, currentBrand, handleClick }: CarBrandProps) {

  const [localCurrentBrand, setCurrentBrand] = useState("");

  const logoSrc = brandLogos.get(brandName.toLowerCase());

  useEffect(() => {
    const urlParams = getURL().searchParams;
    setCurrentBrand(urlParams.get("brand") || "");
  }, [])

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={`dark:bg-gray-700 ${localCurrentBrand == brandName.toUpperCase() || currentBrand == brandName.toUpperCase() ? "ring-2" : ""} hover:ring-2 dark:border-black pl-1 dark:text-white py-2 border-2 border-gray-800 text-black rounded-xl flex items-center justify-center w-48 h-16 gap-3`}>
      {logoSrc ? (
        <Image
          className="object-contain h-auto w-auto"
          src={logoSrc}
          alt="Brand Logo"
          width={45}
          height={40}
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

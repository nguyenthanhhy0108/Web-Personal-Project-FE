"use client"

import { getURL } from "@/utils/GeneralServices";
import { useEffect, useState } from "react";
import SearchingArea from "./SearchingArea";
import SearchProducts from "./SearchProducts";

export default function SearchCar() {

  const [carName, setCarName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [isClickFind, setIsClickFind] = useState<boolean>(false);

  useEffect(() => {
    const urlParam = getURL().searchParams;
    setCarName(urlParam.get("search") || "");
    setBrandName(urlParam.get("brand") || "")
  }, [])

  return (
    <div>
      <SearchingArea
        setBrandName={setBrandName}
        setCarName={setCarName}
        setIsClickFind={setIsClickFind}
      />
      <SearchProducts
        brandName={brandName}
        carName={carName}
        isClickFind={isClickFind}
        setIsClickFind={setIsClickFind}
      />
    </div>
  )
}

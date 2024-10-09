"use client"

import { useEffect, useState } from "react";
import SearchingArea from "./SearchingArea";
import SearchProducts from "./SearchProducts";

export default function SearchCar() {

  const [carName, setCarName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [isClickFind, setIsClickFind] = useState<boolean>(false);

  useEffect(() => {
    const searchState = localStorage.getItem('searchState');
    if (searchState) {
      console.log();
      setCarName(JSON.parse(searchState).carName);
      setBrandName(JSON.parse(searchState).brandName)
    }
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

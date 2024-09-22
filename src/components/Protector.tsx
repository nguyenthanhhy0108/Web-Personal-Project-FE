"use client"

import { getCookie } from '@/utils/Cookie';
import parseToken from '@/utils/JwtParser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const legalAPI = [
  "/welcome",
  "/home",
]

export const getAPI = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
};

export default function Protector() {

  const router = useRouter();

  useEffect(() => {
    const token = getCookie("access-token");
    console.log(token);
    let parsedToken = null;
    if (token)
      parsedToken = parseToken(token);

    let expirationDate = null
    if(parsedToken )
      expirationDate = parsedToken?.exp ? new Date(parsedToken.exp * 1000) : null;
    
    const currentTime = Date.now();

    let checkExpiryTime = true;
    if(expirationDate)
      checkExpiryTime = currentTime > expirationDate.getTime();

    console.log(checkExpiryTime)

    if (token == null || checkExpiryTime) {
      router.push('/welcome');
    }
    
    const api = getAPI(window.location.toString());

    if (!legalAPI.includes(api)) {
      router.push('/home')
    }
  }, [router]);

  return (
    <div> </div>
  );
}

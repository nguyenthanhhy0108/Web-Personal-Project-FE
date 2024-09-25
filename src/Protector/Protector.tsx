"use client"

import { legalAPI } from '@/constants';
import { getCookie, setCookie } from '@/utils/Cookie';
import parseToken from '@/utils/JwtParser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const getAPI = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
};

export default function Protector() {

  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URL(url);

    const googleToken = urlParams.searchParams.get('code');

    let token = undefined;

    if(googleToken) {

      console.log(googleToken)
      
      const requestBody = {
        "code": googleToken,
        "redirectUri":process.env.NEXT_PUBLIC_REDIRECT_URI
      }

      const fetchTokens = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/app/get-tokens-by-google-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        const data = await response.json();
        console.log(data)

        // alert(data.data)
        setCookie<string>({
          name: "access-token",
          value: data.data,
          time: 1});
      }
      fetchTokens();
    }

    token = getCookie("access-token");
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

    const urlString = window.location.toString()
    const api = getAPI(urlString);

    if (!legalAPI.includes(api)) {
      window.location.href = "/auth";
    }

    if (urlString.includes("code")) {
      window.location.href = "/home";
    }

    if (token == null || checkExpiryTime) {
      router.push('/auth');
    }

  }, [router]);

  return (
    <div> </div>
  );
}

"use client"

import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { getCookie } from '@/utils/Cookie';
import { formatDateToString } from '@/utils/DateProcessing';
import parseToken from '@/utils/JwtParser';
import { hashStringShort } from '@/utils/PasswordHashing';
import { createUserAndFetchToken } from '@/utils/UserService';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export const getAPI = (url: string) => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
};

export default function Protector() {

  const router = useRouter();
  const authenticationValues = useContext(AuthenticationContext);

  useEffect(() => {
    const urlString = window.location.toString()

    const url = new URL(urlString);

    if (url.pathname =='/home') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));

      if (params.get('error')){
        authenticationValues?.setIsLogin('access-denied');
        
        router.push('/auth')
      }else {
        
        const accessToken = params.get('access_token');
        if (accessToken) {
          fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,genders,phoneNumbers,addresses,photos', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.json())
            .then(async (data) => {
              console.log('User Info:', data);

              let password = data.resourceName
              password = password.toString().split('/')[1]
              password = (await hashStringShort(password)).toString();

              const requestBody = {
                "password": password.toString(),
                "email": data.emailAddresses[0].value.toString(),
                "username": data.emailAddresses[0].value.toString(),
                "firstName": data.names[0].givenName.toString(),
                "lastName": data.names[0].familyName.toString(),
                "dateOfBirth": formatDateToString(data.birthdays[0].date).toString()
              }

              console.log(requestBody)

              const userCredentials = {
                "username": requestBody.username,
                "password": requestBody.password
              }

              console.log(userCredentials)

              await createUserAndFetchToken(requestBody, userCredentials);
              
            })
            .catch((error) => {
              console.error('Error fetching user info:', error);
            });
        }
      }
    }
    let token = undefined;

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
    
    // if (!legalAPI.includes(api)) {
    //   router.push('/auth');
    // }

    // if (token == null || checkExpiryTime) {
    //   router.push('/auth');
    // }
  }, [router]);

  return (
    <div> </div>
  );
}

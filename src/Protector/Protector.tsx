'use client';

import { legalAPI } from '@/constants';
import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { getCookie } from '@/utils/Cookie';
import { formatDateToString } from '@/utils/DateProcessing';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/LocalStorageServices';
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
    const urlString = window.location.toString();

    const url = new URL(urlString);

    if (urlString.includes('email-existed')) {
      authenticationValues?.setIsLogin('email-existed');
      router.push('/auth');
    }

    if (url.pathname == '/home') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));

      if (params.get('error')) {
        authenticationValues?.setIsLogin('access-denied');

        router.push('/auth');
      } else {
        const accessToken = params.get('access_token');
        if (accessToken) {
          fetch(
            'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays,genders,phoneNumbers,addresses,photos',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
            .then((response) => response.json())
            .then(async (data) => {
              console.log('User Info:', data);

              let password = data.resourceName;
              password = password.toString().split('/')[1];
              password = (await hashStringShort(password)).toString();

              let dateOfBirth = '1111-11-11';

              if (data.birthdays) {
                dateOfBirth = formatDateToString(
                  data.birthdays[0].date,
                ).toString();
              }

              const requestBody = {
                password: password.toString(),
                email: data.emailAddresses[0].value.toString(),
                username: data.emailAddresses[0].value.toString(),
                firstName: data.names[0].givenName.toString(),
                lastName: data.names[0].familyName.toString(),
                dateOfBirth: dateOfBirth,
              };

              console.log(requestBody);

              const userCredentials = {
                username: requestBody.username,
                password: requestBody.password,
              };

              console.log(userCredentials);

              await createUserAndFetchToken(requestBody, userCredentials);
            })
            .catch((error) => {
              console.error('Error fetching user info:', error);
            });
        } else {
          if (getFromLocalStorage('old-url')) {
            const oldUrl = getFromLocalStorage('old-url');
            if (oldUrl != null && oldUrl != '') {
              window.location.href = oldUrl;
              removeFromLocalStorage('old-url');
            }
          }
        }
      }
    }
    let token = undefined;

    token = getCookie('access-token');

    if (legalAPI.includes(url.pathname)) {
    }

    if (legalAPI.includes(url.pathname)) {
      // if (token == null) {
      //   // pass
      // } else {
      //   router.push('/home');
      // }
    } else {
      if (token === null) {
        saveToLocalStorage('old-url', window.location.href);
        router.push('/auth');
      }
    }

    if (token != null) {
      if (url.pathname == '/auth') {
        router.refresh();
        router.push('/home');
      }
    }
  }, [router]);

  return <div> </div>;
}

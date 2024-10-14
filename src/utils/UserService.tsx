import { setCookie } from './Cookie';

interface UserCreationParam {
  password: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface UserCredentials {
  password: string;
  username: string;
}

export async function createUser(userCreationParam: UserCreationParam) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/user/profiles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCreationParam),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('Error');
  }
}

export async function getAccessToken(userCredential: UserCredentials) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/app/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredential),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('Error');
    return { error: true };
  }
}

export const createUserAndFetchToken = async (
  userCreationParam: UserCreationParam,
  userCredentials: UserCredentials,
) => {
  try {
    let createData = null;
    try {
      createData = await createUser(userCreationParam);
      if (createData.code == '9003') {
        console.log('Ignoring');
      }
      // if (createData.code == '1000') {
      //   sendNotificationMail(userCreationParam.email, userCredentials);
      // }
      if (createData.code == '9004') {
        window.location.href = '/auth?error=email-existed';
      }
    } catch (error) {
      console.log(error);
    }

    const tokenData = await getAccessToken(userCredentials);
    console.log(tokenData);
    if (tokenData.data) {
      await setCookie<string>({
        name: 'access-token',
        value: tokenData.data,
        time: 1,
      });
    }
    window.location.href = '/home';
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};

export const sendNotificationMail = (
  destination: string,
  userCredential: UserCredentials,
) => {
  const url =
    process.env.NEXT_PUBLIC_DOMAIN + '/notification/email/' + destination;
  try {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredential),
    });
  } catch (error) {
    console.log('Error');
    return { error: true };
  }
};


export const getVerificationCode = async(
  username: string | null,
  email: string | null
) => {

  const requestBody = {
    "email" : email,
    "username": username
  }

  const url = process.env.NEXT_PUBLIC_DOMAIN + '/user/reset-password/verify';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (data.code) {
      return data;
    }
    
  } catch (error) {
    console.log('Error');
  }
};

export const confirmChangPassword = async(
  code: string | null,
  newPassword: string | null,
  username: string | null,
  email: string | null
) => {

  const requestBody = {
    "email" : email,
    "username": username,
    "code": code,
    "newPassword": newPassword
  }

  const url = process.env.NEXT_PUBLIC_DOMAIN + '/user/reset-password/confirm';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (data.code) {
      return data;
    }
    
  } catch (error) {
    console.log('Error');
  }
};

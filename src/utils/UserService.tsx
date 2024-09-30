import { setCookie } from "./Cookie";

interface UserCreationParam {
  "password": string,
  "email": string,
  "username": string,
  "firstName": string,
  "lastName": string,
  "dateOfBirth": string;
}

interface UserCredentials {
  "password": string,
  "username": string,
}

export async function createUser(userCreationParam :UserCreationParam) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/user/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCreationParam),
    });

    const data = await response.json();

    return data;
  } catch(error) {
    console.log("Error")
  }
}

export async function getAccessToken(userCredential: UserCredentials) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/app/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredential),
    });

    const data = await response.json();

    return data;
  } catch(error) {
    console.log("Error")
    return {error : true};
  }
}

export const createUserAndFetchToken = async (userCreationParam: UserCreationParam, userCredentials: UserCredentials) => {
  try {
    let createData = null;
    try {
      createData = await createUser(userCreationParam);
      if (createData.code == '9003' || createData.code == '9004'){
        console.log('Ignoring');
      }
    } catch (error) {
      console.log(error);
    }

    const tokenData = await getAccessToken(userCredentials);
    console.log(tokenData);
    if (tokenData.data) {
      await setCookie<string>({
        name: "access-token",
        value: tokenData.data,
        time: 1});
    }
    window.location.href = '/home'; 
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

"use client"

import { Alert, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import AlertDialog from "./AlertDialog";

interface RegisterProps {
  desire: string;
  setDesire: React.Dispatch<React.SetStateAction<string>>,
  setIsRegisterSuccessfull: React.Dispatch<React.SetStateAction<boolean>>
}

const InitialMap = () => {
  const initialMap = new Map<number, string>();
  initialMap.set(9001, 'Username is missing');
  initialMap.set(9002, 'Password is missing');
  initialMap.set(9003, 'Username existed, please choose another one');
  initialMap.set(9004, 'Email existed, please choose another one');
  initialMap.set(9005, 'Your age must be at least 2');
  initialMap.set(9006, 'Your username must be between 8 and 16 characters');
  initialMap.set(9007, 'Your password must be between 8 and 32 characters');
  initialMap.set(9999, 'Uncategorized error');
  return initialMap;
}

const errorMap = InitialMap();

export default function RegisterForm({desire, setDesire, setIsRegisterSuccessfull}:RegisterProps) {

  // console.log(desire)

  const router = useRouter();

  const [clickTermAndCondition, setClickTermAndCondition] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isError, setIsError] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const changeUsername = (event:ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const changePassword = (event:ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const changeEmail = (event:ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const changeDateOfBirth = (event:ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  }

  const nameParser = (name: string) => {
    const fullName = name;
    setFirstname(fullName.split(" ")[0]);
    setLastname(fullName.split(" ").slice(1, fullName.split(" ").length).join(" "));
  }

  const changeName = (event:ChangeEvent<HTMLInputElement>) => {
    nameParser(event.target.value);
  }  

  const handleClickTermAndCondition = () => {
    setClickTermAndCondition(!clickTermAndCondition)
  }

  const handleBackToSignIn = () => {
    setSignIn(true);
    setDesire("login");
  }

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody = {
      "username" : username,
      "password" : password,
      "email" : email,
      "firstName" : firstname,
      "lastName" : lastname,
      "dateOfBirth" : dateOfBirth,
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/user/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (data.code === 1000) {
        router.push('/welcome');
        setDesire("login");
        setIsRegisterSuccessfull(true);
      } else {
        setIsError(true);
        setMessage(errorMap?.get(data.code));
      }

      if (data.code === 9005) {
        setIsError(true);
        setMessage(data.message)
      }

      if (data.code === 9004) {
        setIsError(true);
        setMessage(data.message)
      }

      if (data.code === 9005) {
        setIsError(true);
        setMessage(data.message)
      }
    } catch(error) {
      setIsError(true);
      setMessage('An unexpected error occurred! Please waiting a little bit');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${!signIn || desire === "login" ? "hidden" : ""} bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black`}>
      {clickTermAndCondition && 
      <AlertDialog 
        setIsAgree={setIsAgree}
        title="Our policy"
        content={`If you click "Agree" that mean you confirm to provide your provided informations.`}  
      />}
      <h1 className="text-5xl font-semibold">Hello friend</h1>
      <p className="font-medium text-lg text-gray-600 pt-3 italic">Welcome! Enter your details to create your account.</p>
      <div className="mt-9">
        {isError && 
          (<Alert severity="error">{message}</Alert>)
        }
        <div className='mt-6'>
          <label className="text-lg font-medium">Username</label>
          <input 
            onChange={changeUsername}
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mt-6">
          <label className="text-lg font-medium">Password</label>
          <input 
            onChange={changePassword}
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>
        <div className='mt-6'>
          <label className="text-lg font-medium">Email</label>
          <input 
            onChange={changeEmail}
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your email"
            type="email"
            required
          />
        </div>
        <div className='mt-6'>
          <label className="text-lg font-medium">What should we call you?</label>
          <input 
            onChange={changeName}
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className='mt-6'>
          <label className="text-lg font-medium">Date of Birth</label>
          <input 
            onChange={changeDateOfBirth}
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your date of birth"
            type="date"
            required
          />
        </div>
        <div className="flex items-center mt-3">
          <Checkbox 
            className="dark:text-white"
            required
            id="agreement"
            checked = {isAgree}
            onChange={() => {}}
          />
          <label htmlFor="agreement">Agree with our <button onClick={handleClickTermAndCondition} className="items-center text-blue-900 hover:underline hover:text-blue-950 dark:text-blue-400 dark:hover:text-blue-500">terms and conditions</button></label>
        </div>
        <div className="mt-6 flex flex-col gap-y-6">
          <button 
            type='submit'
            className={`active:scale-95 active:duration-75 transition-all bg-green-600 py-3 text-white font-bold text-2xl rounded-xl hover:bg-green-800 hover:scale-[1.01] ease-in-out`}>Create</button>
        </div>
        <div className="mt-6 flex justify-center text-blue-900 text-sm hover:underline hover:text-blue-950 dark:text-blue-400 dark:hover:text-blue-500">
          <button onClick={handleBackToSignIn}>← Back to Sign In</button>
        </div>
      </div>
    </form>
  )
}

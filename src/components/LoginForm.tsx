"use client"

import { setCookie } from '@/utils/Cookie';
import { Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from "react";
import Loading from './Loading';

interface LoginFormProps {
  desire: string;
  setDesire: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginForm({ desire, setDesire } : LoginFormProps) {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [signUp, setSignUp] = useState(true);

  

  const changeUsername = (event:ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const changePassword = (event:ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const changeRemember = () => {
    setRemember(!remember);
  }

  const handleSignUp = () => {
    setSignUp(true);
    setDesire("register");
  }

  const submitLoginForm = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("waiting");
    setSubmit(true);
    const requestBody = {
      "username" : username,
      "password" : password
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/app/get-tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (data.code === 1000) {
        if(remember == true) {
          setCookie<string>({
            name: "access-token",
            value: data.data,
            time: 1});
        }
        router.push('/home');
      }
  
      if (data.code === 9000) {
        setIsError(true);
        setMessage(data.message)
      }
    } catch(error) {
      setIsError(true);
      setMessage('An unexpected error occurred! Please waiting a little bit');
    }

    setUsername('');
    setPassword('');
    setSubmitStatus("");
  };

  if (submitStatus === 'waiting') {
    return <Loading />;
  }

  return (
    <form 
      onSubmit={submitLoginForm}
      className={`${!signUp || desire==="register" ? "hidden" : ""} bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black`}>
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-600 pt-3 italic">Welcome back! Please enter your details to sign in.</p>
      <div className="mt-9">
        {isError && 
          (<Alert severity="error">{message}</Alert>)
        }
        <div className='mt-6'>
          <label className="text-lg font-medium">Username</label>
          <input 
            className={`w-full border-2 ${isError && "border-red-500 dark:border-red-500"} border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your username"
            required
            value={username}
            onChange={changeUsername}
          />
        </div>
        <div className="mt-6">
          <label className="text-lg font-medium">Password</label>
          <input 
            className={`w-full border-2 ${isError && "border-red-500 dark:border-red-500"} border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your password"
            type="password"
            required
            value={password}
            onChange={changePassword}
          />
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <Checkbox
              className='items-center dark:text-white'
              id="remember"
              checked={remember}
              onChange={changeRemember}
            />
            <label htmlFor="remember" className="font-medium text-base items-center hover:text-gray-700">
              Remember me
            </label>
          </div>
          <button className="font-medium text-base text-violet-600 hover:text-violet-800">Forgot Password</button>
        </div>
        <div className="mt-6 flex flex-col gap-y-6">
          <button 
            type='submit'
            className={`active:scale-95 active:duration-75 transition-all bg-violet-600 py-3 text-white font-bold text-2xl rounded-xl hover:bg-violet-800 hover:scale-[1.01] ${submit && "bg-violet-800 scale-[1.01]"} ease-in-out`}>Sign in</button>
          <hr className="w-full border-gray-300"></hr>
          <button className="flex justify-center items-center py-3 border-gray-300 dark:border-white dark:text-black dark:bg-white border-2 active:scale-95 active:duration-75 transition-all rounded-xl hover:scale-[1.01] ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.22 0 5.62 1.1 7.32 2.02l5.36-5.35C33.37 3.7 29.18 2 24 2 14.73 2 7.21 7.66 4.08 15.24l6.9 5.36C13.11 14.03 18.09 9.5 24 9.5z"></path>
              <path fill="#34A853" d="M46.5 24.5c0-1.6-.14-3.1-.4-4.5H24v9h12.7c-.56 2.87-2.18 5.3-4.58 6.94l7.12 5.53c4.17-3.86 6.56-9.55 6.56-16.03z"></path>
              <path fill="#FBBC05" d="M10.98 28.86C10.23 26.99 9.83 24.85 9.83 22.5c0-2.35.4-4.49 1.15-6.36l-6.9-5.36C1.4 14.03 0 18.1 0 22.5s1.4 8.47 3.98 11.72l6.9-5.36z"></path>
              <path fill="#EA4335" d="M24 47c5.18 0 9.51-1.7 12.68-4.64l-7.12-5.53c-2.01 1.36-4.57 2.17-7.33 2.17-5.91 0-10.89-4.53-11.97-10.5l-6.9 5.36C7.21 40.34 14.73 46 24 46z"></path>
            </svg>
            <span className="ml-3 font-medium text-lg ">Sign in with Google</span>
          </button>
          {/* <button className="flex justify-center items-center dark:border-white bg-neutral-900 text-white py-3 border-neutral-900 border-2 active:scale-95 active:duration-75 transition-all rounded-xl hover:scale-[1.01] ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.798 8.205 11.387.6.113.82-.263.82-.583 0-.288-.012-1.243-.017-2.252-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.805 1.304 3.49.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.335-5.466-5.933 0-1.31.467-2.38 1.235-3.22-.123-.304-.535-1.523.117-3.176 0 0 1.007-.323 3.3 1.23a11.5 11.5 0 0 1 3.003-.404 11.5 11.5 0 0 1 3.003.404c2.292-1.553 3.297-1.23 3.297-1.23.654 1.653.242 2.872.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.37.814 1.102.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .324.218.7.824.58C20.565 21.795 24 17.297 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
            <span className="ml-3 font-medium text-lg">Sign in with GitHub</span>
          </button> */}
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>
          <button 
            onClick={handleSignUp}
            type="button"
            className="active:scale-95 active:duration-75 transition-all bg-green-600 py-3 text-white font-bold text-2xl rounded-xl hover:bg-green-800 hover:scale-[1.01] ease-in-out">Sign up</button>
        </div>
      </div>
    </form>
  )
}

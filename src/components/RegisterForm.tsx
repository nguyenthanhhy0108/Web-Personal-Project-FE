"use client"

import { useState } from "react";
import AlertDialog from "./AlertDialog";

interface RegisterProps {
  desire: string;
  setDesire: React.Dispatch<React.SetStateAction<string>>;
}

export default function RegisterForm({desire, setDesire}:RegisterProps) {

  console.log(desire)

  const [clickTermAndCondition, setClickTermAndCondition] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const handleClickTermAndCondition = () => {
    setClickTermAndCondition(!clickTermAndCondition)
  }

  const handleBackToSignIn = () => {
    setSignIn(true);
    setDesire("login");
  }

  return (
    <div
      className={`${!signIn || desire === "login" ? "hidden" : ""} bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black`}>
      {clickTermAndCondition && <AlertDialog/>}
      <h1 className="text-5xl font-semibold">Hello friend</h1>
      <p className="font-medium text-lg text-gray-600 pt-3 italic">Welcome! Enter your details to create your account.</p>
      <div className="mt-9">
        <div className='mt-6'>
          <label className="text-lg font-medium">Username</label>
          <input 
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mt-6">
          <label className="text-lg font-medium">Password</label>
          <input 
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>
        <div className='mt-6'>
          <label className="text-lg font-medium">Email</label>
          <input 
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your email"
            type="email"
            required
          />
        </div>
        <div className='mt-6'>
          <label className="text-lg font-medium">What should we call you?</label>
          <input 
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className='mt-6'>
          <label className="text-lg font-medium">Date of Birth</label>
          <input 
            className={`w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder="Enter your date of birth"
            type="date"
            required
          />
        </div>
        <div className="mt-6 flex gap-2">
          <input 
            id="agreement"
            type="checkbox"/>
          <label htmlFor="agreement">Agree with our <button onClick={handleClickTermAndCondition} className="text-blue-900 hover:underline hover:text-blue-950 dark:text-blue-400 dark:hover:text-blue-500">terms and conditions</button></label>
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
    </div>
  )
}

'use client';

import { getVerificationCode } from '@/utils/UserService';
import { Alert } from '@mui/material';
import { useState } from 'react';

interface VerifyFormProps {
  username: string | null;
  email: string | null;
  isSentVerificationCode: boolean;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setIsSentVerificationCode: (status: boolean) => void;
}

export default function VerifyForm({
  username,
  email,
  setUsername,
  setEmail,
  setIsSentVerificationCode,
}: VerifyFormProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isNotMatch, setIsNotMatch] = useState<boolean>(false);
  const [isUsernameError, setIsUsernameError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const status = await getVerificationCode(username, email);
    if (status) {
      setIsError(true);
      setErrorMessage(status.message.toString());
      if (status.code == 9041) {
        setIsUsernameError(true);
      }
      if (status.code == 9037) {
        setIsNotMatch(true);
      }
    } else {
      setIsSentVerificationCode(true);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black`}
    >
      <h1 className='text-5xl font-semibold'>Forgot Password</h1>
      <p className='font-medium text-lg text-gray-600 pt-3 italic'>
        Please enter your details to reset your password through email.
      </p>
      <div className='mt-9'>
        {isError && <Alert severity='error'>{errorMessage}</Alert>}
        <div className='mt-6'>
          <label className='text-lg font-medium'>Username</label>
          <input
            onChange={handleChangeUsername}
            className={`${isUsernameError ? 'border-red-600 dark:border-red-600' : ''} ${isNotMatch ? 'border-red-600 dark:border-red-600' : ''} w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder='Enter your username'
            required
          />
        </div>
        <div className='mt-6'>
          <label className='text-lg font-medium'>Email</label>
          <input
            onChange={handleChangeEmail}
            className={`${isNotMatch ? 'border-red-600 dark:border-red-600' : ''} w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder='Enter your email'
            type='email'
            required
          />
        </div>
      </div>
      <button
        type='submit'
        className='p-6 text-xl rounded-3xl flex justify-center mx-auto bg-green-600 mt-12 hover:scale-[1.05] transition-all duration-75 hover:bg-green-700'
      >
        Get verification code
      </button>
    </form>
  );
}

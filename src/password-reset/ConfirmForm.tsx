'use client';

import { confirmChangPassword } from '@/utils/UserService';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ConfirmFormProps {
  username: string | null;
  email: string | null;
}

export default function ConfirmForm({ username, email }: ConfirmFormProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isCodeError, setIsCodeError] = useState<boolean>(false);
  const [notMatch, setNotMatch] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');

  const router = useRouter();

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (retypePassword != event.target.value) {
      setNotMatch(true);
    } else {
      setNotMatch(false);
    }
    setPassword(event.target.value);
  };

  const handleChangeRetypePassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(password);
    console.log('value', event.target.value);
    if (password != event.target.value) {
      setNotMatch(true);
    } else {
      setNotMatch(false);
    }
    setRetypePassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (notMatch) {
      setIsError(true);
      setErrorMessage('Passwords are not match');
    } else {
      setIsError(false);
      const status = await confirmChangPassword(
        code,
        password,
        username,
        email,
      );
      if (status) {
        setIsError(true);
        setErrorMessage(status.message);
        if (status.code == 9039 || status.code == 9040) {
          setIsCodeError(true);
        }
      } else {
        router.push('/auth?reset-password=true');
      }
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
          <label className='text-lg font-medium'>Verification Code</label>
          <input
            onChange={handleChangeCode}
            className={`${isCodeError ? 'border-red-600 dark:border-red-600' : ''} w-full border-2 font-bold text-2xl text-blue-700 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white`}
            placeholder='Enter your verification code'
            type='text'
            maxLength={6}
            required
          />
        </div>
        <div className='mt-6'>
          <label className='text-lg font-medium'>New Password</label>
          <input
            onChange={handleChangePassword}
            className={`${notMatch ? 'border-red-600 dark:border-red-600' : ''} w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder='Enter your new password'
            minLength={8}
            maxLength={32}
            required
          />
        </div>
      </div>
      <div className='mt-6'>
        <label className='text-lg font-medium'>Retype New Password</label>
        <input
          onChange={handleChangeRetypePassword}
          className={`${notMatch ? 'border-red-600 dark:border-red-600' : ''} w-full border-2 border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
          placeholder='Enter your new password again'
          minLength={8}
          maxLength={32}
          required
        />
      </div>
      <button
        type='submit'
        className='p-6 text-xl rounded-3xl flex justify-center mx-auto bg-green-600 mt-12 hover:scale-[1.05] transition-all duration-75 hover:bg-green-700'
      >
        Reset Password
      </button>
    </form>
  );
}

'use client';

import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { setCookie } from '@/utils/Cookie';
import { getAccessToken } from '@/utils/UserService';
import { Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useContext, useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import Loading from './Loading';

interface LoginFormProps {
  desire: string;
  setDesire: React.Dispatch<React.SetStateAction<string>>;
  isRegisterSuccessfull: boolean;
}

export default function LoginForm({
  desire,
  setDesire,
  isRegisterSuccessfull,
}: LoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [signUp, setSignUp] = useState(true);

  const authenticationValues = useContext(AuthenticationContext);

  const changeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const changeRemember = () => {
    setRemember(!remember);
  };

  const handleSignUp = () => {
    setSignUp(true);
    setDesire('register');
  };

  const submitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('waiting');
    setSubmit(true);
    const requestBody = {
      username: username,
      password: password,
    };

    const data = await getAccessToken(requestBody);
    if (data.code === 1000) {
      if (remember == true) {
        setCookie<string>({
          name: 'access-token',
          value: data.data,
          time: 1,
        });
      }
      authenticationValues?.setIsLogin('logged-in');
      router.push('/home');
    }

    if (data.code === 9008) {
      setIsError(true);
      setMessage(data.message);
    }

    if (data.error) {
      setIsError(true);
      setMessage('An unexpected error occurred! Please waiting a little bit');
    }
    setUsername('');
    setPassword('');
    setSubmitStatus('');
  };

  if (submitStatus === 'waiting') {
    return <Loading />;
  }

  return (
    <form
      onSubmit={submitLoginForm}
      className={`${!signUp || desire === 'register' ? 'hidden' : ''} bg-gray-100 dark:bg-gray-950 px-11 py-11 rounded-3xl border-2 border-gray-200 dark:border-black`}
    >
      <h1 className='text-5xl font-semibold'>Welcome Back</h1>
      <p className='font-medium text-lg text-gray-600 pt-3 italic'>
        Welcome back! Please enter your details to sign in.
      </p>
      <div className='mt-9'>
        {isError && authenticationValues?.isLogin != 'error' && (
          <Alert severity='error'>{message}</Alert>
        )}
        {isRegisterSuccessfull && authenticationValues?.isLogin != 'error' && (
          <Alert severity='success'>Register Successfully!</Alert>
        )}
        {authenticationValues?.isLogin == 'access-denied' && (
          <Alert severity='error'>Attempt To Login Fail!</Alert>
        )}
        <div className='mt-6'>
          <label className='text-lg font-medium'>Username</label>
          <input
            className={`w-full border-2 ${isError && 'border-red-500 dark:border-red-500'} border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder='Enter your username'
            required
            value={username}
            onChange={changeUsername}
          />
        </div>
        <div className='mt-6'>
          <label className='text-lg font-medium'>Password</label>
          <input
            className={`w-full border-2 ${isError && 'border-red-500 dark:border-red-500'} border-gray-500 dark:border-white hover:border-black dark:hover:border-blue-600 rounded-lg p-3 mt-3 bg-transparent dark:bg-white dark:text-black`}
            placeholder='Enter your password'
            type='password'
            required
            value={password}
            onChange={changePassword}
          />
        </div>
        <div className='mt-6 flex justify-between items-center'>
          <div>
            <Checkbox
              className='items-center dark:text-white '
              id='remember'
              checked={remember}
              onChange={changeRemember}
            />
            <label
              htmlFor='remember'
              className='font-medium text-base items-center hover:text-gray-700'
            >
              Remember me
            </label>
          </div>
          <button className='font-medium text-base text-violet-600 hover:text-violet-800'>
            Forgot Password
          </button>
        </div>
        <div className='mt-6 flex flex-col gap-y-6'>
          <button
            type='submit'
            className={`active:scale-95 active:duration-75 transition-all bg-violet-600 py-3 text-white font-bold text-2xl rounded-xl hover:bg-violet-800 hover:scale-[1.01] ${submit && 'bg-violet-800 scale-[1.01]'} ease-in-out`}
          >
            Sign in
          </button>
          <hr className='w-full border-gray-300'></hr>
          <GoogleLoginButton />
          {/* <button className="flex justify-center items-center dark:border-white bg-neutral-900 text-white py-3 border-neutral-900 border-2 active:scale-95 active:duration-75 transition-all rounded-xl hover:scale-[1.01] ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.798 8.205 11.387.6.113.82-.263.82-.583 0-.288-.012-1.243-.017-2.252-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.805 1.304 3.49.997.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.335-5.466-5.933 0-1.31.467-2.38 1.235-3.22-.123-.304-.535-1.523.117-3.176 0 0 1.007-.323 3.3 1.23a11.5 11.5 0 0 1 3.003-.404 11.5 11.5 0 0 1 3.003.404c2.292-1.553 3.297-1.23 3.297-1.23.654 1.653.242 2.872.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.37.814 1.102.814 2.222 0 1.606-.015 2.9-.015 3.293 0 .324.218.7.824.58C20.565 21.795 24 17.297 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
            <span className="ml-3 font-medium text-lg">Sign in with GitHub</span>
          </button> */}
          <div className='flex items-center'>
            <div className='flex-grow border-t border-gray-500'></div>
            <span className='mx-4 text-gray-500'>or</span>
            <div className='flex-grow border-t border-gray-500'></div>
          </div>
          <button
            onClick={handleSignUp}
            type='button'
            className='active:scale-95 active:duration-75 transition-all bg-green-600 py-3 text-white font-bold text-2xl rounded-xl hover:bg-green-800 hover:scale-[1.01] ease-in-out'
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}

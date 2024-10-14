'use client';

import { useState } from 'react';
import ConfirmForm from './ConfirmForm';
import VerifyForm from './VerifyForm';

export default function ResetPasswordForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSentVerificationCode, setIsSentVerificationCode] =
    useState<boolean>(false);

  return (
    <div className='flex w-full h-screen mt-24 mb-24'>
      <div className='w-full flex items-center justify-center lg:w-1/2 bg-white dark:bg-gray-900 text-black dark:text-white'>
        {!isSentVerificationCode && (
          <VerifyForm
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            isSentVerificationCode={isSentVerificationCode}
            setIsSentVerificationCode={setIsSentVerificationCode}
          />
        )}
        {isSentVerificationCode && (
          <ConfirmForm email={email} username={username} />
        )}
      </div>
      <div className='hidden relative lg:flex h-full lg:w-1/2 items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white'>
        <div className='w-60 h-60 bg-gradient-to-tr from-violet-600 to-pink-500 rounded-full animate-bounce transition-all'></div>
        <div className='w-full h-1/2 bottom-0 backdrop-blur-lg bg-transparent absolute'></div>
      </div>
    </div>
  );
}

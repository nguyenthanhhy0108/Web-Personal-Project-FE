'use client';

import { getURL } from '@/utils/GeneralServices';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function LoginOrRegister() {
  const [desire, setDesire] = useState('login');
  const [isRegisterSuccessfull, setIsRegisterSuccessfull] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  // console.log(desire)

  useEffect(() => {
    const urlParams = getURL();
    if (urlParams.searchParams.get("reset-password")) {
      setIsResetPassword(true);
    }
  }, []);

  return (
    <div>
      <LoginForm
        desire={desire}
        setDesire={setDesire}
        isRegisterSuccessfull={isRegisterSuccessfull}
        isResetPassword={isResetPassword}
      />
      <RegisterForm
        desire={desire}
        setDesire={setDesire}
        setIsRegisterSuccessfull={setIsRegisterSuccessfull}
      />
    </div>
  );
}

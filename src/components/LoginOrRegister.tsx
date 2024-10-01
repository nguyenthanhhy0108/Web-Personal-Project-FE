'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function LoginOrRegister() {
  const [desire, setDesire] = useState('login');
  const [isRegisterSuccessfull, setIsRegisterSuccessfull] = useState(false);

  // console.log(desire)

  return (
    <div>
      <LoginForm
        desire={desire}
        setDesire={setDesire}
        isRegisterSuccessfull={isRegisterSuccessfull}
      />
      <RegisterForm
        desire={desire}
        setDesire={setDesire}
        setIsRegisterSuccessfull={setIsRegisterSuccessfull}
      />
    </div>
  );
}

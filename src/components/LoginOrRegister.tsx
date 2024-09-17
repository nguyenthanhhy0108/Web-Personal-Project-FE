"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginOrRegister() {
  const [desire, setDesire] = useState("login");

  console.log(desire)

  return (
    <div>
      <LoginForm
        desire={desire}
        setDesire={setDesire}
      />
      <RegisterForm
        desire={desire}
        setDesire={setDesire}
      />
    </div>
  );
}

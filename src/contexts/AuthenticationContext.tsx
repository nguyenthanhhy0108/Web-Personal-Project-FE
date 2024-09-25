"use client"

import { getCookie } from "@/utils/Cookie";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface AuthenticationValues {
  isLogin: string,
  setIsLogin: Dispatch<SetStateAction<string>>
}

export const AuthenticationContext = createContext<AuthenticationValues | undefined> (undefined);

export default function AuthenticationProvider({children} : {children:React.ReactNode}) {

  const [isLogin, setIsLogin] = useState("not-yet");

  useEffect(() => {
    if(getCookie("access-token")) {
      setIsLogin("logged-in")
    }
  }, [])

  const authenticationValues = {
    isLogin,
    setIsLogin,
  }

  return (
    <AuthenticationContext.Provider value={authenticationValues}>
      {children}
    </AuthenticationContext.Provider>
  );
}

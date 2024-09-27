"use client"

import { getCookie } from "@/utils/Cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
    <GoogleOAuthProvider clientId="1015909475778-q23gahjf0mfg22c9u3b0375bho4lv9in.apps.googleusercontent.com">
      <AuthenticationContext.Provider value={authenticationValues}>
        {children}
      </AuthenticationContext.Provider>
    </GoogleOAuthProvider>
  );
}

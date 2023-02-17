import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';


export const GoogleLoginBtn = () => {
  
  const login = useGoogleLogin({
    scope: process.env.REACT_APP_SCOPES,
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  return (
    <button onClick={() => login()}>
      Sign in with Google 🚀{' '}
    </button>
  )
}



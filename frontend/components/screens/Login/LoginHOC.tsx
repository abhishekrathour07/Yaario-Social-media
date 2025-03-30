import dynamic from 'next/dynamic'
import React from 'react'
 const Login  = dynamic(() => import('@/components/screens/Login/Login'))
const LoginHOC = () => {
  return (
    <Login/>
  )
}

export default LoginHOC

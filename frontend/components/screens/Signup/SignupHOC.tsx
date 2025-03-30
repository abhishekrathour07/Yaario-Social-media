import dynamic from 'next/dynamic'
import React from 'react'
const Signup = dynamic(() => import('./Signup'))
const SignupHOC = () => {
  return (
    <Signup/>
  )
}

export default SignupHOC

'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from 'antd'

export default function Login() {
  const router = useRouter()
  const [loginLoading, setLoginLoading] = useState(false)

  const handleSignIn = () => {
    setLoginLoading(true)
    signIn()
  }

  return (
    <div className='w-full'>
      <p className='my-3 text-xl'>Welcome back!</p>
      <Button
        className='py-1 px-5 bg-black rounded-xl w-full text-md text-white block'
        onClick={handleSignIn}
        loading={loginLoading}
      >
        Sign in
      </Button>
      <h1 className=' text-xl text-center'>or</h1>
      <Button
        className='py-1 px-5 outline outline-1 outline-black rounded-xl w-full text-md block my-3'
        onClick={() => router.push('/user/register')}
      >
        Register for free
      </Button>
    </div>
  )
}

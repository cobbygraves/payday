'use client'
import Profile from './Profile'
import Login from './Login'
import { useSession } from 'next-auth/react'

export default function LoginRegister() {
  const { data: session } = useSession()
  return (
    <div
      className={`${session && session?.user ? 'w-[175px]' : 'w-[250px]'} p-3`}
    >
      {session && session?.user ? <Profile /> : <Login />}
    </div>
  )
}

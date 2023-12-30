'use client'
import React, { createContext, useState } from 'react'
import { SessionProvider } from 'next-auth/react'

export const ProfileContext = createContext({
  editProfile: false,
  editProfileHandler: () => {}
})

export default function Providers({ children }) {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <SessionProvider>
      <ProfileContext.Provider
        value={{ editProfile: isEdit, editProfileHandler: setIsEdit }}
      >
        {children}
      </ProfileContext.Provider>
    </SessionProvider>
  )
}

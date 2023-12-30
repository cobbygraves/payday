import React from 'react'
import Header from '@app/components/Header'

export default function BannerLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

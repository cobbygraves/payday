'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useState, useEffect } from 'react'

const CATEGORIES = [
  { id: 'home', name: 'Home' },
  { id: 'health', name: 'Health' },
  { id: 'education', name: 'Education' },
  { id: 'judiciary', name: 'Judiciary' },
  { id: 'administration', name: 'Administration' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'fashion', name: 'Fashion & Design' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'fabrication', name: 'Fabrication' },
  { id: 'security', name: 'Security' }
]

export default function Navbar() {
  const route = usePathname()
  // const [active, setActive] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Home')

  useEffect(() => {
    switch (route) {
      case '/':
        setActiveMenu('Home')
        return
      case '/health':
        setActiveMenu('Health')
        return
      case '/education':
        setActiveMenu('Education')
        return
      case '/judiciary':
        setActiveMenu('Judiciary')
        return
      case '/administration':
        setActiveMenu('Administration')
        return
      case '/transportation':
        setActiveMenu('Transportation')
        return
      case '/engineering':
        setActiveMenu('Engineering')
        return
      case '/fashion':
        setActiveMenu('Fashion & Design')
        return
      case '/agriculture':
        setActiveMenu('Agriculture')
        return
      case '/fabrication':
        setActiveMenu('Fabrication')
        return
      case '/security':
        setActiveMenu('Security')
        return
      default:
        setActiveMenu('Home')
    }
  }, [route])

  return (
    <div className=' hidden w-full md:h-10 px-[5%] md:flex flex-wrap items-center gap-3 lg:justify-center border-gray-500'>
      {CATEGORIES.map((category) => (
        <Link
          href={`${category.id === 'home' ? '/' : `/${category.id}`}`}
          key={category.id}
        >
          <p
            className={`cursor-pointer text-gray-500 text-sm ${
              category.name === activeMenu &&
              ' text-black font-extrabold border-b-2 border-b-black'
            }`}
          >
            {category.name}
          </p>
        </Link>
      ))}
    </div>
  )
}

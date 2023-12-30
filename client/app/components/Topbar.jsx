'use client'
import Link from 'next/link'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { FaUser } from 'react-icons/fa'
import Humbuger from './Humbuger'
import { useSession } from 'next-auth/react'
import { Popover } from 'antd'
import LoginProfile from './LoginProfile'

export default function TopBar() {
  const { data: session } = useSession()

  return (
    <div className='w-full h-10 px-[5%] flex justify-between items-center border-b border-gray-200 bg-black text-white'>
      <div className='hidden md:block'>
        <Link href='/contact-us'>
          <p className='cursor-pointer hover:text-blue-300'>Help & Contact</p>
        </Link>
      </div>

      <Humbuger />
      <div className='hidden md:flex items-center'>
        <div className='flex items-center'>
          <Popover content={<LoginProfile />}>
            <div className='flex items-center cursor-pointer hover:text-blue-300'>
              {session && session?.user ? (
                <p>{session.user.name?.split(' ')[0]}</p>
              ) : (
                <FaUser size={20} />
              )}
              <RiArrowDropDownLine size={25} />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  )
}

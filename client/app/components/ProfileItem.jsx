import Link from 'next/link'
import React from 'react'

export default function ProfileItem({ name, icon, url }) {
  return (
    <div className='mb-3'>
      <Link href={url}>
        <div className='flex gap-5 items-center'>
          {icon}
          <h1 className='text-lg font-extralight'>{name}</h1>
        </div>
      </Link>
      <hr className='h-3 w-full' />
    </div>
  )
}

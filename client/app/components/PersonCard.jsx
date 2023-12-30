import Link from 'next/link'
import React from 'react'
import { BsPersonCheck } from 'react-icons/bs'

export default function PersonCard({
  varified,
  dp,
  name,
  jobDescription,
  location,
  id,
  shadow
}) {
  return (
    <div
      className={`grid grid-cols-2 bg-white ${
        shadow && 'shadow'
      } rounded-lg p-3 gap-x-3 w-full`}
    >
      <div>
        <img
          className='rounded-lg w-full h-[170px] object-cover pr-1'
          src={dp}
          alt='userDP'
        />
        <div className='flex mt-3 justify-center items-center'>
          <Link
            href={`/user/profile/${id}`}
            className='py-1 px-[10px] rounded bg-black text-white'
          >
            View Profile
          </Link>
        </div>
      </div>
      <div className='mt-2'>
        <div>
          <h1 className='font-bold'>Name</h1>
          <p className='text-sm text-gray-500'>{name}</p>
        </div>
        <div className='my-3'>
          <h1 className='font-bold'>Job Description</h1>
          <p className='text-sm text-gray-500'>{jobDescription}</p>
        </div>
        <div className='my-3'>
          <h1 className='font-bold'>Location</h1>
          <p className='text-sm text-gray-500'>{location}</p>
        </div>
        {varified && (
          <div className='flex gap-2 justify-center items-center mt-4 bg-green-400 py-1 px-2 rounded text-white'>
            <p>Varified</p>
            <BsPersonCheck width={150} />
          </div>
        )}
      </div>
    </div>
  )
}

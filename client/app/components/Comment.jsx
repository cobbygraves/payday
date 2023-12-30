import React from 'react'
import { hostAPI } from '@app/utils/configure'

export default function Comment({ reviewers }) {
  return (
    <div className='rounded-lg shadow p-3 min-h-[150px]'>
      <h1 className=' font-bold text-xl mb-3'>Reviews</h1>
      {reviewers?.length === 0 ? (
        <p>No review has been recieved on the services of this personnel</p>
      ) : (
        reviewers?.map((reviewer, index) => (
          <div className='flex items-center gap-2 mb-4' key={index}>
            <img
              src={`${hostAPI}/images/${reviewer?.image}`}
              className='w-[30px] h-[30px] rounded-[50%]'
            />
            <p className='text-sm text-gray-500'>{reviewer?.comment}</p>
          </div>
        ))
      )}
      {reviewers.length > 3 && (
        <button className='py-1 px-2  mb-3 text-blue-500'>read more...</button>
      )}
    </div>
  )
}

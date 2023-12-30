import React from 'react'
import { Rate } from 'antd'

export default function Rating({ rate }) {
  return (
    <div className='rounded-lg shadow p-3 mb-5 '>
      <h1 className=' font-bold text-xl'>Rating</h1>
      <Rate
        allowHalf
        defaultValue={2.5}
        style={{ color: 'black' }}
        value={rate}
        disabled
      />
    </div>
  )
}

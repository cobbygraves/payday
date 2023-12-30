'use client'
import { useContext, useState } from 'react'
import { ProfileContext } from './Providers'
import { FloatButton } from 'antd'
import { FaRegEdit } from 'react-icons/fa'
import StatusUpdate from './StatusUpdate'

export default function StatusSection({ profileID, session, status }) {
  const context = useContext(ProfileContext)
  const [updateStatus, setUpdateStatus] = useState(false)

  return (
    <>
      <StatusUpdate
        isModalOpen={updateStatus}
        id={profileID}
        toggleModal={(hideShow) => setUpdateStatus(hideShow)}
      />
      <div className='rounded-lg shadow p-3 min-h-[150px] my-10 md:pl-10 md:pr-6 '>
        <div className='flex justify-between items-center relative mb-7'>
          <h1 className=' font-light text-2xl'>Status</h1>
          {session && profileID === session.user._id && context.editProfile && (
            <FloatButton
              onClick={() => setUpdateStatus(true)}
              style={{ position: 'absolute', top: 0, right: 0 }}
              icon={<FaRegEdit />}
            />
          )}
        </div>

        <div className=' flex gap-2 items-center mb-5'>
          <img
            src='/profilePic.jpg'
            alt='sectionImage'
            className=' h-24 w-24'
          />
          <p className='text-gray-500 text-lg'>{status}</p>
        </div>
      </div>
    </>
  )
}

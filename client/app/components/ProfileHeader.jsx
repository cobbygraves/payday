'use client'
import { useContext, useState } from 'react'
import { hostAPI } from '@app/utils/configure'
import { FloatButton } from 'antd'
import { FaCamera, FaRegEdit } from 'react-icons/fa'
import { ProfileContext } from './Providers'
import HeaderUpdate from '@app/components/HeaderUpdate'
import DpUpdate from '@app/components/DpUpdate'
import InfoUpdate from './InfoUpdate'

export default function ProfileHeader({
  dp,
  bg,
  profileID,
  session,
  user,
  id
}) {
  const context = useContext(ProfileContext)
  const [openHeaderUpdate, setOpenHeaderUpdate] = useState(false)
  const [openDpUpdate, setOpenDpUpdate] = useState(false)
  const [openInfoUpdate, setOpenInfoUpdate] = useState(false)

  const toggleHeaderUpdate = (show) => {
    setOpenHeaderUpdate(show)
  }

  const toggleDpUpdate = (show) => {
    setOpenDpUpdate(show)
  }

  const toggleInfoUpdate = (show) => {
    setOpenInfoUpdate(show)
  }

  return (
    <>
      <HeaderUpdate
        isModalOpen={openHeaderUpdate}
        toggleModal={toggleHeaderUpdate}
        id={id}
      />
      <DpUpdate
        isModalOpen={openDpUpdate}
        toggleModal={toggleDpUpdate}
        id={id}
      />

      <InfoUpdate
        isModalOpen={openInfoUpdate}
        toggleModal={toggleInfoUpdate}
        id={id}
      />

      <div className=' rounded-lg shadow pb-5'>
        <div className='relative mb-[70px]'>
          {session &&
            profileID === session?.user._id &&
            context.editProfile && (
              <FloatButton
                onClick={toggleHeaderUpdate}
                style={{ position: 'absolute', top: 20, right: 25 }}
                icon={<FaCamera />}
              />
            )}
          {session &&
            profileID === session?.user._id &&
            context.editProfile && (
              <FloatButton
                onClick={toggleDpUpdate}
                style={{ position: 'absolute', bottom: 20, left: 75 }}
                icon={<FaCamera />}
              />
            )}

          <img
            src={bg === '' ? '/bg.jpg' : `${hostAPI}/images/${bg}`}
            alt='background'
            className='w-full h-[250px] rounded-t-lg object-cover object-top'
          />
          <img
            src={dp === '' ? '/emptyDP.png' : `${hostAPI}/images/${dp}`}
            alt='display puic'
            className='w-[150px] h-[150px] rounded-[50%] absolute left-[3%] -bottom-10 object-cover'
          />
        </div>
        <div className='md:px-10 relative'>
          {session &&
            profileID === session?.user._id &&
            context.editProfile && (
              <FloatButton
                onClick={toggleInfoUpdate}
                style={{ position: 'absolute', top: 20, right: 25 }}
                icon={<FaRegEdit />}
              />
            )}

          <h1 className=' font-bold text-3xl'>{user?.name}</h1>
          <h1 className='text-gray-500 my-1'>
            <span className='font-bold mr-3 text-black'>Job Title: </span>
            {user?.jobTitle}
          </h1>
          <p className='text-gray-500 my-1'>
            <span className='font-bold mr-3 text-black'>Town: </span>
            {user?.town}
          </p>
          <p className='text-gray-500 my-1'>
            <span className='font-bold mr-3 text-black'>Tel: </span>{' '}
            {user?.contact}
          </p>
        </div>
      </div>
    </>
  )
}

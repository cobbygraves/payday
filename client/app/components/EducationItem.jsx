'use client'
import { useContext, useState } from 'react'
import { ProfileContext } from './Providers'
import { FloatButton } from 'antd'
import { FaRegEdit } from 'react-icons/fa'
import EducationEdit from './EducationEdit'

export default function EducationItem({
  qualification,
  institution,
  duration,
  session,
  profileID,
  educationId
}) {
  const context = useContext(ProfileContext)
  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(true)
  }
  return (
    <>
      {edit && (
        <EducationEdit
          isModalOpen={edit}
          id={profileID}
          toggleModal={(isEdit) => setEdit(isEdit)}
          educationID={educationId}
        />
      )}
      <div className='flex items-center justify-between relative'>
        <div className=' flex gap-2 items-center mb-5'>
          <img
            src='/accademics.jpg'
            alt='sectionImage'
            className=' h-24 w-24'
          />
          <div>
            <p className='font-bold text-xl text-gray-500'>{qualification}</p>
            <p className='text-gray-500'>{institution}</p>
            <p className='text-gray-500'>
              {' '}
              {duration.em} {duration.ey}
            </p>
          </div>
        </div>
        {session && profileID === session.user._id && context.editProfile && (
          <FloatButton
            className='relative top-3 right-0 cursor-pointer text-gray-400 hover:text-black'
            size={25}
            icon={<FaRegEdit />}
            onClick={handleEdit}
          />
        )}
      </div>
    </>
  )
}

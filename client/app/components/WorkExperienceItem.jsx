'use client'
import { useContext, useState } from 'react'
import { ProfileContext } from './Providers'
import { FloatButton } from 'antd'
import { FaRegEdit } from 'react-icons/fa'
import WorkExperienceEdit from './WorkExperienceEdit'

export default function WorkExperienceItem({
  title,
  company,
  duration,
  description,
  session,
  profileID,
  workId
}) {
  const context = useContext(ProfileContext)
  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(true)
  }

  return (
    <>
      {edit && (
        <WorkExperienceEdit
          isModalOpen={edit}
          id={profileID}
          toggleModal={(isEdit) => setEdit(isEdit)}
          workID={workId}
        />
      )}

      <div className='flex items-center justify-between relative'>
        <div className=' flex gap-2 items-center mb-5'>
          <img src='/company.jpg' alt='sectionImage' className=' h-24 w-24' />
          <div>
            <p className='font-bold text-xl text-gray-500'>{title}</p>
            <p className='text-gray-500'>{company}</p>
            <p className='text-gray-500'>{description}</p>
            <p className='text-gray-500'>
              {duration.sm} {duration.sy} - {duration.em} {duration.ey}
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

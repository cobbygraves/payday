'use client'
import { useState, useContext } from 'react'
import { FloatButton } from 'antd'
import { ProfileContext } from './Providers'
import { MdAdd } from 'react-icons/md'
import EducationItem from './EducationItem'
import useSWR from 'swr'
import fetcher from '@app/utils/fetchData'
import Loading from '@app/components/Loading'
import { hostAPI } from '@app/utils/configure'
import EducationUpdate from './EducationUpdate'

export default function EducationSection({ profileID, session }) {
  const [updateEduc, setUpdateEduc] = useState(false)
  const [edit, setEdit] = useState(false)
  const context = useContext(ProfileContext)
  const { data, error } = useSWR(`${hostAPI}/user/${profileID}`, fetcher)
  if (error) return <div>failed to load user info</div>
  if (!data)
    return (
      <div className='flex justify-center my-10'>
        <Loading />
      </div>
    )

  const EducationalBackground = data.educationInfo
  return (
    <>
      {updateEduc && (
        <EducationUpdate
          isModalOpen={updateEduc}
          toggleModal={(showModal) => setUpdateEduc(showModal)}
          id={profileID}
        />
      )}
      <div className='rounded-lg shadow p-3 min-h-[150px] my-10 md:pl-10 md:pr-6 '>
        <div className='flex justify-between items-center relative mb-7'>
          <h1 className=' font-light text-2xl'>Education</h1>
          {session && profileID === session.user._id && context.editProfile && (
            <FloatButton
              onClick={() => setUpdateEduc(true)}
              style={{ position: 'absolute', top: 0, right: 0 }}
              icon={<MdAdd />}
            />
          )}
        </div>
        {EducationalBackground.map((education, index) => (
          <div key={education.id}>
            <EducationItem
              qualification={education.course}
              institution={education.school}
              duration={education.date}
              session={session}
              profileID={profileID}
              educationId={education.id}
            />
            <hr
              className={`border border-gray-400 mb-5 ${
                index === EducationalBackground.length - 1 && 'hidden'
              }`}
            />
          </div>
        ))}
      </div>
    </>
  )
}

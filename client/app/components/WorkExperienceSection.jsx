'use client'
import { useState, useContext } from 'react'
import { FloatButton } from 'antd'
import { ProfileContext } from './Providers'
import { MdAdd } from 'react-icons/md'
import WorkExperienceItem from './WorkExperienceItem'
import WorkExperienceUpdate from './WorkExperienceUpdate'
import useSWR from 'swr'
import fetcher from '@app/utils/fetchData'
import Loading from '@app/components/Loading'
import { hostAPI } from '@app/utils/configure'

export default function ProfileSection({ profileID, session }) {
  const [updateExp, setUpdateExp] = useState(false)
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

  const WorkExperiences = data.jobExperienceInfo

  return (
    <>
      {updateExp && (
        <WorkExperienceUpdate
          isModalOpen={updateExp}
          toggleModal={(showModal) => setUpdateExp(showModal)}
          id={profileID}
        />
      )}

      <div className='rounded-lg shadow p-3 min-h-[150px] my-10 md:pl-10 md:pr-6 '>
        <div className='flex justify-between items-center relative mb-7'>
          <h1 className=' font-light text-2xl'>Work Experience</h1>
          {session && profileID === session.user._id && context.editProfile && (
            <FloatButton
              onClick={() => setUpdateExp(true)}
              style={{ position: 'absolute', top: 0, right: 0 }}
              icon={<MdAdd />}
            />
          )}
        </div>
        {WorkExperiences.map((work, index) => (
          <div key={work.id}>
            <WorkExperienceItem
              title={work.jobTitle}
              company={work.company}
              description={work.jobDescription}
              duration={work.date}
              session={session}
              profileID={profileID}
              workId={work.id}
            />
            <hr
              className={`border border-gray-400 mb-5 ${
                index === WorkExperiences.length - 1 && 'hidden'
              }`}
            />
          </div>
        ))}
      </div>
    </>
  )
}

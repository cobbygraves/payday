'use client'
import ProfileDetails from '@app/components/ProfileDetails'
import fetcher from '@app/utils/fetchData'
import useSWR from 'swr'
import { hostAPI } from '@app/utils/configure'
import ProfileHeader from '@app/components/ProfileHeader'
import Comment from '@app/components/Comment'
import Rating from '@app/components/Rating'
import ProfilePersons from '@app/components/ProfilePersons'
import Loading from '@app/components/Loading'
import WorkExperienceSection from '@app/components/WorkExperienceSection'
import { useSession } from 'next-auth/react'
import EducationSection from '@app/components/EducationSection'
import StatusSection from '@app/components/StatusSection'

export default function page({ params }) {
  const { data, error } = useSWR(`${hostAPI}/user/${params.id}`, fetcher)
  const { data: session } = useSession()

  if (error) return <div>failed to load user info</div>
  if (!data)
    return (
      <div className='flex justify-center my-10'>
        <Loading />
      </div>
    )

  return (
    <div className='px-[3%] md:px-[5%] md:flex gap-5 md:mb-5 md:min-[375px]'>
      <div className='w-full md:w-[65%] my-5 md:mt-5'>
        <ProfileHeader
          bg={data.bg}
          dp={data.dp}
          profileID={params.id}
          session={session}
          user={data}
          id={params.id}
        />
        <StatusSection
          profileID={params.id}
          session={session}
          status={data.profileDesc}
        />
        <WorkExperienceSection profileID={params.id} session={session} />
        <EducationSection profileID={params.id} session={session} />
      </div>
      <div className='w-full md:w-[35%] my-5 md:mt-5'>
        <Rating rate={data?.rating} />
        <Comment reviewers={data?.reviews} />
        <ProfilePersons userCat={data?.sector} userID={params.id} />
      </div>
      <ProfileDetails id={params.id} open={data.completed} />
    </div>
  )
}

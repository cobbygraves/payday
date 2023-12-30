'use client'
import { useContext } from 'react'
import { ProfileContext } from './Providers'
import { usePathname } from 'next/navigation'
import { useParams } from 'next/navigation'
import { BiSolidUserDetail } from 'react-icons/bi'
import { TbNotification } from 'react-icons/tb'
import { PiSignOutBold } from 'react-icons/pi'
import ProfileItem from './ProfileItem'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()
  const path = usePathname()
  const context = useContext(ProfileContext)
  const params = useParams()

  const handleEdit = () => {
    context.editProfileHandler(true)
  }

  return (
    <div className='w-full'>
      <ProfileItem
        icon={<BiSolidUserDetail size={32} />}
        name='Profile'
        url={`/user/profile/${session.user._id}`}
      />
      <ProfileItem
        icon={<TbNotification size={32} />}
        name='Notification'
        url='#'
      />
      <ProfileItem
        icon={<PiSignOutBold size={32} />}
        name='Sign Out'
        url='/api/auth/signout'
      />
      {path === `/user/profile/${session?.user._id}` &&
        session?.user._id === params.id && (
          <button
            className='px-2 py-1 rounded w-full bg-black text-white'
            onClick={handleEdit}
          >
            Update Profile
          </button>
        )}
    </div>
  )
}

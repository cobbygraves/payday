import React, { useEffect, useReducer } from 'react'
import PersonCard from './PersonCard'
// import Link from 'next/link'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'

const ACTIONTYPES = {
  process: 'PROCESS',
  success: 'SUCCESS',
  error: 'ERROR'
}

const INITIALSTATE = {
  loading: false,
  users: [],
  error: false
}

const categoryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONTYPES.process:
      return {
        ...state,
        loading: true
      }
    case ACTIONTYPES.success:
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case ACTIONTYPES.error:
      return {
        ...state,
        loading: false,
        users: []
      }
    default:
      return state
  }
}

export default function ProfilePersons({ userCat, userID }) {
  const [state, dispatch] = useReducer(categoryReducer, INITIALSTATE)

  useEffect(() => {
    dispatch({ type: ACTIONTYPES.process })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        // console.log(position.coords)
        try {
          const resp = await axios.post(`${hostAPI}/user`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          const sectorUsers = resp.data.filter(
            (user) => user.sector === userCat && user._id !== userID
          )
          // setUsers(sectorUsers)
          dispatch({ type: ACTIONTYPES.success, payload: sectorUsers })
        } catch (error) {
          dispatch({ type: ACTIONTYPES.error })
        }
      })
    }
  }, [])

  return (
    <div className='w-full shadow px-[5%] py-3 min-h-[375px] rounded-lg my-5'>
      <h1 className='font-bold text-xl'>People with similar profession</h1>
      {!state.error && (
        <div className='flex flex-col items-center gap-2'>
          {state.users?.slice(0, 3).map((user) => (
            <PersonCard
              key={user?._id}
              varified={user?.varified}
              dp={`${hostAPI}/images/${
                user?.dp !== '' ? user?.dp : 'emptyDP.png'
              }`}
              name={user?.name}
              jobDescription={user?.jobTitle}
              location={user?.town}
              contact={user?.contact}
              id={user?._id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

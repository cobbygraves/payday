'use client'
import React, { useEffect, useReducer } from 'react'
import PersonCard from './PersonCard'
import Link from 'next/link'
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

export default async function CategorySection({ heading, sector }) {
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
          const sectorUsers = resp.data.filter((user) => user.sector === sector)
          // setUsers(sectorUsers)
          dispatch({ type: ACTIONTYPES.success, payload: sectorUsers })
        } catch (error) {
          dispatch({ type: ACTIONTYPES.error })
        }
      })
    }
  }, [])

  return (
    <div className={`px-[5%] my-5 ${state.users.length === 0 && 'hidden'}`}>
      <Link href={`/${sector}`}>
        <div className='flex  gap-3 items-center my-5'>
          <h1 className='text-3xl font-bold my-5 hover:text-gray-400'>
            {heading}
          </h1>
          <hr className='w-full border-4 border-gray-300 rounded-xl' />
        </div>
      </Link>
      {!state.error && (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {state.users?.slice(0, 3).map((user) => (
            <PersonCard
              shadow
              key={user?._id}
              varified={user?.varified}
              dp={`${hostAPI}/images/${
                user?.dp !== '' ? user?.dp : 'emptyDP.jpg'
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

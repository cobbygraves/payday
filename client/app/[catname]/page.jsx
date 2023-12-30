'use client'

import React, { useEffect, useReducer } from 'react'
import Navbar from '@app/components/Navbar'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import PersonCard from '@app/components/PersonCard'
import Loading from '@app/components/Loading'

const ACTIONTYPES = {
  process: 'PROCESS',
  success: 'SUCCESS',
  error: 'ERROR'
}

const INITIALSTATE = {
  loading: true,
  users: null,
  error: false
}

const usersReducer = (state, action) => {
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

export default function page({ params }) {
  const { catname } = params
  const [state, dispatch] = useReducer(usersReducer, INITIALSTATE)

  useEffect(() => {
    dispatch({ type: ACTIONTYPES.process })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        try {
          const resp = await axios.post(`${hostAPI}/user`, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          const searchedUsers = resp.data.filter(
            (user) => user.sector === catname
          )
          dispatch({ type: ACTIONTYPES.success, payload: searchedUsers })
        } catch (error) {
          dispatch({ type: ACTIONTYPES.error })
        }
      })
    }
  }, [catname])

  return (
    <div className='text-center text-xl my-3 min-h-screen'>
      <h1 className='mb-3 mt-[85px] md:mt-5 font-bold text-2xl'>
        {catname.toUpperCase()}
      </h1>
      <hr className='border border-gray-400' />
      {state.loadig ? (
        <div className='flex justify-center items-center'>
          <Loading />
        </div>
      ) : (
        <div className='my-5'>
          {state.users && state.users?.length === 0 ? (
            <h1>can't find {catname} personnels at your location</h1>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {state.users?.map((user) => (
                <PersonCard
                  key={user?._id}
                  varified={user?.varified}
                  dp={`${hostAPI}/images/${user?.dp}`}
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
      )}
    </div>
  )
}

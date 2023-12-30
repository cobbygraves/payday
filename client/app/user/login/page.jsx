'use client'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { Button, notification } from 'antd'
import { useRouter } from 'next/navigation'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export default function page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disableBtn, setDisableBtn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const router = useRouter()

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'LOGIN FAILED',
      description: 'Wrong Username or Password'
    })
  }

  const loginHandler = async () => {
    setLoading(true)
    try {
      const response = await signIn('credentials', {
        username,
        password,
        redirect: false
      })
      console.log(response)
      if (response.status !== 200) {
        openNotificationWithIcon('error')
        //show an alert with a success message - green
      } else {
        router.replace('/')
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    if (
      username.trim() === '' ||
      password.trim() === '' ||
      !validateEmail(username)
    ) {
      setDisableBtn(true)
    } else {
      setDisableBtn(false)
    }
  }, [username, password])

  return (
    <>
      {contextHolder}
      <div className='flex flex-col justify-center items-center my-14'>
        <div className=' w-4/5 flex flex-col items-center md:w-[35%] lg:w-[27%] h-[345px] shadow-xl rounded-xl p-5 bg-black'>
          <h1 className='text-3xl text-center mb-5 text-white font-bold tracking-widest'>
            LOGIN
          </h1>
          <div className='mb-5'>
            <label className='text-xl text-white'>Username</label>
            <input
              className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2'
              type='email'
              placeholder='example@gmail.com'
              value={username}
              onChange={usernameHandler}
            />
          </div>
          <div>
            <label className='text-xl text-white'>Password</label>
            <input
              className='w-full h-9 py-1 px-3 outline outline-1 rounded-2xl my-2'
              type='password'
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <Button
            type='primary'
            className='h-[35px] w-[100px] rounded-2xl bg-blue-500 mt-5 text-white font-extralight disabled:bg-gray-200'
            disabled={disableBtn}
            onClick={loginHandler}
            loading={loading}
          >
            Submit
          </Button>
        </div>
        <Link href='/'>
          <h1 className='mt-5 font-extralight text-xl underline flex items-center cursor-pointer hover:text-gray-400'>
            {<FaArrowLeft className='mr-2' />}
            <span>back to home</span>
          </h1>
        </Link>
      </div>
    </>
  )
}

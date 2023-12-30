'use client'
import { useState, useEffect } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FaRegUserCircle } from 'react-icons/fa'
import { Input, Button } from 'antd'
import { CgAsterisk } from 'react-icons/cg'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { hostAPI } from '@app/utils/configure'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export default function page() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [disableBtn, setDisableBtn] = useState(true)

  const registerHandler = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${hostAPI}/user/register`, {
        name,
        username,
        password
      })
      console.log(response)
      if (response.status === 200) {
        await signIn('credentials', {
          username,
          password,
          callbackUrl: `/user/profile/${response.data._id}`,
          redirect: true
        })
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      username.trim() === '' ||
      password.trim() === '' ||
      !validateEmail(username) ||
      name.trim() === '' ||
      password !== confirmPassword
    ) {
      setDisableBtn(true)
    } else {
      setDisableBtn(false)
    }
  }, [username, password, confirmPassword])

  return (
    <div className='flex flex-col justify-center items-center my-14'>
      <h1 className='text-3xl text-center mb-5 font-bold tracking-widest'>
        REGISTER
      </h1>
      <div className='w-[90%] md:w-[45%] lg:w-[30%]'>
        <div className='flex gap-3 items-center justify-center mb-5 w-full'>
          <CgAsterisk size={15} color='red' />
          <Input
            size='large'
            placeholder='enter full name'
            prefix={<FaRegUserCircle size={27} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex gap-3 items-center justify-center w-full'>
          <CgAsterisk size={15} color='red' />
          <Input
            size='large'
            placeholder='enter email address'
            prefix={<AiOutlineMail size={27} />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex gap-3 items-center justify-center w-full'>
          <CgAsterisk size={15} color='red' />
          <Input
            size='large'
            placeholder='enter password'
            prefix={<RiLockPasswordLine size={27} />}
            type='password'
            className=' mt-5 mb-5'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex gap-3 items-center justify-center w-full'>
          <CgAsterisk size={15} color='red' />
          <Input
            size='large'
            placeholder='repeat password'
            prefix={<RiLockPasswordLine size={27} />}
            type='password'
            className='mb-3'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center mt-5'>
          <Link href='/'>
            <h1 className=' font-extralight text-xl underline flex items-center cursor-pointer hover:text-gray-400 ml-7'>
              {<FaArrowLeft className='mr-2' />}
              <span>back to home</span>
            </h1>
          </Link>
          <Button
            type='primary'
            loading={loading}
            onClick={registerHandler}
            className='bg-black px-3'
            disabled={disableBtn}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  )
}

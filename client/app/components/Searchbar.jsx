'use client'
import React, { useState } from 'react'
import { Input } from 'antd'
const { Search } = Input
import { BsSearch } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SearchButton = () => {
  return (
    <div className='flex gap-2 items-center'>
      <BsSearch />
      <p>Search</p>
    </div>
  )
}

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const searchHandler = () => {
    if (searchValue.trim() !== '') {
      router.push(`/user/search/${searchValue}`)
    }
  }

  return (
    <div className='px-[5%] flex gap-3 w-full py-5 items-center border-b border-gray-200'>
      <Link href='/' className=' hidden md:block'>
        <h1 className='text-3xl font-extrabold underline cursor-pointer'>
          PayDay
        </h1>
      </Link>

      <Search
        placeholder='search for a personnel'
        allowClear
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterButton={<SearchButton />}
        size='large'
        onSearch={searchHandler}
      />
    </div>
  )
}

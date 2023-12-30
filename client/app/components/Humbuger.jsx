import React from 'react'

export default function Humbuger({ active }) {
  return (
    <div
      className='w-6 flex flex-col h-7 justify-evenly items-end cursor-pointer md:hidden'
      //   onClick={() => setActive(!active)}
    >
      <span
        className={`h-1 bg-white ${
          active
            ? 'rotate-45 origin-left transition-all ease-in duration-300'
            : 'bg-white transition-all ease-in duration-300'
        } w-full`}
      ></span>
      <span
        className={`h-1 ${active ? 'opacity-0' : 'bg-white'} w-full`}
      ></span>
      <span
        className={`h-1 bg-white ${
          active
            ? '-rotate-45 origin-left transition-all ease-in duration-300'
            : 'bg-white transition-all ease-in duration-300'
        } w-full`}
      ></span>
      {/* <MobileMenu show={active} menuClick={() => setActive(false)} /> */}
    </div>
  )
}

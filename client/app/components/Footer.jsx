import Link from 'next/link'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer font-nunito w-full bg-black text-[14px] text-white py-5 md:text-[16px] flex justify-center'>
      <div className='w-[90%] justify-end flex flex-col items-center 2xl:max-w-7xl'>
        <div className='footer-top w-full flex flex-col md:flex-row md:justify-between 2xl:w-[90%]'>
          <div className='top-left'>
            <div className='flex items-center'>
              <Link href='/'>
                <p className='font-extrabold text-2xl underline'>PayDay</p>
              </Link>
            </div>
            <p className='w-[284px] mt-5 leading-[24px]'>
              Work comfortably on PayDay - Get your customers online, plan your
              work schedules and live a happy working life.
            </p>
          </div>
          <div className='top-right mt-5 md:flex md:flex-col md:gap-y-5 lg:flex-row lg:gap-x-10 md:mt-3'>
            <div className='flex justify-between md:gap-10 md:flex-1'>
              <div className='w-[184px] md:w-full md:flex-1 leading-7'>
                <h1 className='text-[#98A2B3] font-semibold mb-1 md:mb-4'>
                  Services
                </h1>
                <p>Recruitment</p>
                <p>IT Training</p>
                <p>Advertisement</p>
              </div>
              <div className='w-full md:flex-1 leading-7'>
                <h1 className='text-[#98A2B3] font-semibold mb-1 md:mb-4'>
                  Company
                </h1>
                <p>About Us</p>
                <p>Contact Us</p>
              </div>
            </div>
            <div className='flex md:justify-between md:gap-10 mt-7 md:mt-0 md:flex-1'>
              <div className='w-[184px] leading-7 md:flex-1'>
                <h1 className='text-[#98A2B3] font-semibold md:mb-4'>Social</h1>
                <p>Twitter</p>
                <p>LinkedIn</p>
                <p>Facebook</p>
              </div>
              <div className='w-full leading-7 md:flex-1'>
                <h1 className='text-[#98A2B3] font-semibold md:mb-4'>Legal</h1>
                <p>Terms</p>
                <p>Privacy</p>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-bottom w-full mt-[50px]  md:flex flex-row-reverse justify-between items-center 2xl:w-[90%]'>
          <div className='flex gap-3 mb-5 md:mb-0'>
            <BsTwitter className='text-3xl' />
            <FaLinkedinIn className='text-3xl' />
            <FaFacebookF className='text-3xl' />
          </div>
          <p>
            &copy;{new Date().getFullYear()} Codescript Consult. All right
            reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

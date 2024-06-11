import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { AiFillInstagram, AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { RiLinkedinFill } from 'react-icons/ri'

const socialLinks = [
  {
    path: 'http://localhost:8080',
    icon: <AiFillInstagram className='group-hover:text-white w-4 h-5'/>,
    title: "Instagram"
  },
  {
    path: 'http://localhost:8080',
    icon: <AiFillFacebook className='group-hover:text-white w-4 h-5'/>,
    title: "Facebook"
  },
  {
    path: 'http://localhost:8080',
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5'/>,
    title: "GitHub"
  },
  {
    path: 'http://localhost:8080',
    icon: <RiLinkedinFill className='group-hover:text-black w-4 h-5'/>,
    title: "LinkedIn"
  },
]

function Footer() {
  return (
    <footer className='pb-16 pt-10'>
      <div className='container'>
        <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'>
          <div>
            <img src={logo} alt='logo' className='' />
            <p className='text-[16px] leading-7 font-[400] text-primaryFont mt-4'>
              Copyright {(new Date()).getFullYear()} developed by <b>---</b> all rights reserved
            </p>
            <div className='flex items-center gap-3 mt-4'>
              {
                socialLinks.map((item, index) => 
                  <Link to={item.path} key={index} className='w-9 h-9 border border-solid border-color-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primary hover:border-none'>
                    {item.icon}</Link>
                )
              }
            </div>
          </div>
          <div className=''>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-primary'>
              Quick Links
            </h2>
            <ul>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
            </ul>
          </div>
          <div className=''>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-primary'>
              Support Us
            </h2>
            <ul>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
            </ul>
          </div>
          <div className=''>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-primary'>
              Other Links
            </h2>
            <ul>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
              <li className='mb-4'>
                <Link to='/' className='text-[16px] leading-7 font-[400] text-primary' >Link 001</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
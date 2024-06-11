import React from 'react'
import ServiceCard from '../components/cards/ServiceCard'
import { AiOutlineRight } from 'react-icons/ai'
import iconImg from '../assets/images/icon01.png'
import iconImg2 from '../assets/images/icon03.png'
import { Link } from 'react-router-dom'

const services = [
  {
    name: "Paients History Management",
    icon: "",
    link: "/", 
    info: "Some Information"
  },
  {
    name: "Doctors Management",
    icon: "",
    link: "/", 
    info: "Some Information"
  },
  {
    name: "Colloborative Platform",
    icon: "",
    link: "/", 
    info: "Some Information"
  }
]

function Services() {
  return (
    <setion>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            Our Services
          </h2>
          <p className='text__para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg::mt-[55px]'>
          <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
              <img src={iconImg} alt='icon'/>
            </div>
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-primaryFont font-[700] text-center'>Find a Doctor</h2>
              <p className='text-[16px] leading-7 text-primaryFont font-[400] mt-4 text-center'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
              </p>
              <Link to={'/doctors'} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none'>
                <AiOutlineRight className='group-hover:white w-6 h-5' />
              </Link>
            </div>
          </div>
          <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
              <img src={iconImg2} alt='icon'/>
            </div>
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-primaryFont font-[700] text-center'>Get Appointment</h2>
              <p className='text-[16px] leading-7 text-primaryFont font-[400] mt-4 text-center'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
              </p>
              <Link to={'/doctors'} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none'>
                <AiOutlineRight className='group-hover:white w-6 h-5' />
              </Link>
            </div>
          </div>
          <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
              <img src={iconImg} alt='icon'/>
            </div>
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-primaryFont font-[700] text-center'>Find a Doctor</h2>
              <p className='text-[16px] leading-7 text-primaryFont font-[400] mt-4 text-center'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
              </p>
              <Link to={'/doctors'} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none'>
                <AiOutlineRight className='group-hover:white w-6 h-5' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </setion>
  )
}

export default Services
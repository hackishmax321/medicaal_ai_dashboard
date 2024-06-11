import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import Layout from '../layouts/Layout'
import heroImg from '../assets/images/hero-img01.png'
import heroImg2 from '../assets/images/hero-img02.png'
import heroImg3 from '../assets/images/hero-img03.png'
import iconImg from '../assets/images/icon01.png'
import iconImg2 from '../assets/images/icon03.png'
import { Link } from 'react-router-dom'
import Services from './Services'
import DoctorList from '../components/cards/DoctorsList'
import ServiceCard from '../components/cards/ServiceCard'

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

function Home() {
  return (
    <>
    <section className='hero__section pt-[60px] 2xl:h-[800px]'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-[90px] items-center jutify-between'>

          {/* Hero */}
          <div>
            <div className='lg:w-[570px]'>
              <h1 className='text-[36px] leading-[46px] text-primaryFont font-[800] md:text-[60px] md:leading-[70px]'>
                  MEDICARE PORTAL
              </h1>
              <p className='text__para'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
              <button className='btn'>
                Make an Appointment
              </button>
            </div>

            {/* Statuses */}
            <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-primaryFont'>
                  12+
                </h2>
                <span className='w-[100px] h-2 bg-secondary rounded-full block mt-[-14px]'></span>
                <p className='text_para'>Number of Aavailable Dotors</p>
              </div>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-primaryFont'>
                  12+
                </h2>
                <span className='w-[100px] h-2 bg-secondary rounded-full block mt-[-14px]'></span>
                <p className='text_para'>Number of Aavailable Dotors</p>
              </div>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-primaryFont'>
                  12+
                </h2>
                <span className='w-[100px] h-2 bg-secondary rounded-full block mt-[-14px]'></span>
                <p className='text_para'>Number of Aavailable Dotors</p>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className='flex gap-[30px] justified-end'>
            <div>
              <img className='w-full' src={heroImg} alt='hero-01'/>
            </div>
            <div className='mt-[30px]'>
              <img className='w-full mb-[30px]' src={heroImg2} alt='hero-01'/>
              <img className='w-full' src={heroImg3} alt='hero-01'/>
            </div>

          </div>
        </div>
      </div>

    </section>

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

    {/* Services */}
    <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            We handle following Cases
          </h2>
          <p className='text__para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
          {
            services.map((item, index) => <ServiceCard item={item} index={index}/>)
          }
        </div>
      </div>
    </section>

    {/* Doctors */}
    <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            Top Doctors
          </h2>
          <p className='text__para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <DoctorList />
      </div>
    </section>
    </>
  )
}

export default Home
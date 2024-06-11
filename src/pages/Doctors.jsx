import React from 'react'
import DoctorDetails from './DoctorDetails'
import DoctorList from '../components/cards/DoctorsList'

function Doctors() {
  return (
    <>
    <section>
      <div className='container'>
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            Doctors Section
          </h2>
          <p className='text__para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <DoctorList/>
      </div>
    </section>
    </>
  )
}

export default Doctors
import React, { useEffect, useState } from 'react'
import DoctorsCard from './DoctorsCard'
import doctorsService from '../../services/doctors.service';

// const doctors = [
//   {
//     name: "Dr Priyantha",
//     rating: 3,
//     specialization: "ERD",
//     qualifications: [],
//     avatar: "doctor-img02.png",
//     link: "/", 
//     info: "Some Information"
//   },
  
// ]

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    
    const loadResources = async () => {
        await doctorsService.getDoctors().then((data) => {
            setDoctors(data);
        })
    }

    useEffect(() => {
        loadResources();
    }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {
        doctors.length>0&&doctors.map((item, index) => <DoctorsCard item={item} index={index}/>)
      }
    </div>
  )
}

export default DoctorList
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import doctorsService from '../services/doctors.service';

const DoctorDetails = () => {
  const { id } = useParams();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        await doctorsService.getDoctor(id).then((data) => {
          console.log(data)
          setDoctorDetails(data);
        })
        
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchData();
  }, [id]);

  const imageExists = (imagePath) => {
    try {
      if(imagePath&&imagePath!=='')
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <section className='hero__section pt-[60px] 2xl:h-[800px]'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className=''>
            {doctorDetails && (
              <img
                src={
                  imageExists(doctorDetails.avatar)
                    ? doctorDetails.avatar
                    : require('../assets/images/feature-img.png')
                }
                alt='Doctor Avatar'
                className='rounded-lg'
              />
            )}
          </div>
          <div className=''>
            {doctorDetails && (
              <div>
                <h2 className='text-3xl font-bold mb-4'>{doctorDetails.name}</h2>
                <p className='text-lg mb-4'>{doctorDetails.info}</p>
                <p className='text-base mb-4'>{doctorDetails.specialization}</p>
                <div>
                  {doctorDetails.qualifications &&
                    doctorDetails.qualifications.map((qualification) => (
                      <span
                        key={qualification}
                        className='bg-[#eddd02] mr-2 mt-1 text-secondaryFont py-1 px-2 lg:py-1 lg:px-4 text-sm leading-4 lg:text-base rounded'
                      >
                        {qualification}
                      </span>
                    ))}
                </div>
                <br></br>
                {role&&role==='Patient'&&<Link to={'/doctors/'+id+'/'+doctorDetails.name} className='bg-primary text-white py-2 px-4 mt-4 rounded-[50px]'>
                  Make an Appointment
                </Link>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;

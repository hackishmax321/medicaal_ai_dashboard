import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import avatarPath from '../../assets/images/feature-img.png';

function DoctorsCard({ item, index }) {
  const { name, info, link, avatar, rating, qualifications, specialization, _id } = item;


  return (
    <div className='px-3 lg:px-5'>
      <div>
        {avatar?<img src={avatar} alt='avatar' className='w-full' />:<img src={require(avatarPath)} alt='avatar' className='w-full' />}
      </div>
      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text=primaryFont font-[700] mt-3 lg:mt-5'>
        {name}
      </h2>
      {qualifications &&
      qualifications.length > 0 &&
      qualifications.map((item) => (
        <span
          key={item}
          className='bg-[#eddd02] mr-2 mt-1 text-secondaryFont py-1 px-2 lg:py-1 lg:px-4 text-[10px] leading-4 lg:text-[12px] lg:leading-5 rounded'
        >
          {item}
        </span>
      ))}
      <p className='text-[16px] leading-7 font-[400] text-primaryFont mt-4'>
      is a dedicated and compassionate physician with a wealth of experience in internal medicine. Known for their empathetic approach, Dr. Smith values open communication with patients, taking the time to thoroughly understand their concerns and provide personalized care. 
      </p>
      <div className='mt-2 lg:mt-4 flex items-center justify-between'>
        <span className='bg-[#CCF0F3] text-secondaryFont py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
          {specialization}
        </span>
        <div className='flex justify-center items-center mt-[30px]'>
          <Link
            to={'/doctors/'+_id}
            className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primary hover:border-none'
          >
            <AiOutlineRight className='group-hover:white w-6 h-5' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorsCard;

import React from 'react'
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function ServiceCard({item, index}) {
    const { name, info, link, bgColor, fontColor} = item;
  return (
    <div className='py-[30px] px-3 lg:px-5 border border-solid border-[#181A1E] rounded-[20px] shadow-inner'>
        <h2 className='text-[26px] leading-9 text-primaryFont font-[700]'>
            {name}
        </h2>
        <p className='text-[16px] leading-7 font-[400] text-primaryFont mt-4'>{info}</p>

        <div className='flex justify-center items-center mt-[30px]'>
            <Link to={link} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primary hover:border-none'>
                <AiOutlineRight className='group-hover:white w-6 h-5' />
            </Link>
        </div>
    </div>
  )
}

export default ServiceCard
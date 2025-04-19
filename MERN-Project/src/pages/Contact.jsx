import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>

      <div className=' text-xl pt-10 border-t'>

        <div className='text-center'>
          <Title text1={'CONTACT'} text2={'US'}/>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>

            {/* ------------left image box-------------- */}
          <img 
          className='w-full md:max-w-[480px]'
          src={assets.contact_img} 
          alt="contact-image" />

            {/* ------------right text box--------------  */}
          <div className='flex flex-col justify-center items-start gap-6'>

            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
            <p className='text-gray-500'>Tel: (415) 555-0123       Email: admin@forever.com</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
            <p className='text-gray-500'>Learnmore about our teams and job openings</p>
            <button
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'
            >Explore Jobs</button>

          </div>

        </div>

        <NewsLetterBox />

      </div>
      
    </div>
  )
}

export default Contact
import React from 'react'
import {assets} from '../assets/frontend_assets/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img 
                className='mb-5 w-32'
                src={assets.logo} 
                alt="logo" />

                <p className='w-full md:w-2/3 text-gray-600'>
                Your one-stop destination for quality products at unbeatable prices. Enjoy secure shopping, fast delivery, and excellent customer service—every time you shop with us.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>
                    COMPANY
                </p>

                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 212-121-2121</li>
                    <li>forever.find@gmail.com</li>
                </ul>
            </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>© Copyright 2024@ forever.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer

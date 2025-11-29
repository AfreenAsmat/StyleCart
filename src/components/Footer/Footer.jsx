import React from 'react'
import { Link } from 'react-router-dom'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'

function Footer() {
  return (
   <footer className='bg-white mt-16 border-t'>
    <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 '>
        <div className=''>
            <h2 className='text-2xl font-semibold'>StyleCart</h2>
            <p className='text-gray-600 mt-2 text-sm'>
                Your fashion. Your style. Delivered with care.
            </p>
        </div>

        <div className='md:mx-auto '>
            <h3 className='text-lg font-medium mb-3'>Quick Links</h3>
            <ul className='space-y-2 text-gray-700'>
                <li><Link to='/' className='hover:underline'>Home</Link></li>
                <li><Link to='/products/women/all' className='hover:underline'>Women</Link></li>
                <li><Link to='products/fragrances/all' className='hover:underline'>Fragrances</Link></li>
            </ul>
        </div>

        <div className='md:text-right'>
            <h3 className='text-lg font-medium mb-3'>Contacts</h3>
            <p className='text-gray-700 text-sm'>Email: support@stylecart.com</p>

            <div className='flex md:justify-end gap-4 mt-3'>
                <span className='w-8 h-8'>
                    <img src={facebook} alt="facebook" />
                </span>
                <span className='w-8 h-8'>
                    <img src={instagram} alt="instagram" />
                </span>
                <span className='w-8 h-8'>
                    <img src={twitter} alt="twitter" />
                </span>
            </div>
        </div>
        </div>
        <div className=' border-t border-gray-300 py-4 w-fit mx-auto px-4 '>
            <p className='text-center text-xs text-gray-500'>
                © {new Date().getFullYear()} StyleCart. All rights reserved.
            </p>
        </div>
   
   </footer>
  )
}

export default React.memo(Footer);

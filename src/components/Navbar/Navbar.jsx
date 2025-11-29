import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cart from '../Cart/Cart'
import SearchBar from '../SearchBar/SearchBar'
import Checkbox from '../Checkbox/Checkbox'
import search from '../../assets/search.png'
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';

  const closeMobileMenu = () => {
    setIsClosing(true);

    setTimeout(() => {
    setMenuOpen(false);
    setShowSearchMobile(false);
    }, 200);
  };
    
  return (
    <header className='fixed top-0 left-0 w-full shadow-md z-50 bg-white '>
        <div className='flex justify-between items-center h-16 px-4 lg:px-8  '>
            <Link to="/"
            className='text-2xl font-bold font-[pearl] tracking-wide'>
            StyleCart
            </Link>

            {!isCheckoutPage && (
              <>
            <div className='hidden md:block w-full md:w-80 lg:w-96'>
                <SearchBar />
            </div>    
            
            <div className='hidden md:flex items-center space-x-6 font-medium text-[15px]'>   
                   <Link to='/'>Home</Link>
                   <div className='relative'>
                   <button id="dropdownHoverWomanButton" 
                   data-dropdown-toggle="dropdownHoverWoman" 
                   data-dropdown-trigger="hover" 
                   className=" flex inline-flex items-center font-medium " 
                   type="button">
                    Woman
                    <svg className="w-2.5 h-2.5 ms-2" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>
                    <div id="dropdownHoverWoman" 
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                    <ul className="py-2 text-sm text-gray-700 " 
                    aria-labelledby="dropdownHoverWomanButton">
                    <li>
                      <Link to="/products/women/ready-to-wear" 
                      className="block px-4 py-2 hover:bg-gray-100 ">
                        Ready To wear
                      </Link>
                    </li>
                    <li>
                       <Link to="/products/women/unstitched" 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Unstitched
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/women/accessories" 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Accessories
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/women/all" 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        View All
                      </Link>
                    </li>
                  </ul>
              </div>
              </div>

               <div className='relative'>
                   <button id="dropdownHoverFragranceButton" 
                   data-dropdown-toggle="dropdownHoverFragrance" 
                   data-dropdown-trigger="hover" 
                   className=" flex inline-flex items-center font-medium " 
                   type="button">
                    Fragrances
                    <svg className="w-2.5 h-2.5 ms-2" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>
                    <div id="dropdownHoverFragrance" 
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                    <ul className="py-2 text-sm text-gray-700 " 
                    aria-labelledby="dropdownHoverFragranceButton">
                    <li>
                      <Link to="products/fragrances/womens-fragrances" 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Women's Fragrances
                      </Link>
                    </li>
                    <li>
                       <Link to="products/fragrances/mist" 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Body Mists
                      </Link>
                    </li>
                    <li>
                      <Link to="products/fragrances/all" 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        View All
                      </Link>
                    </li>
                  </ul>
              </div>
              </div>

            <Cart />
            
            </div>

            <div className='md:hidden flex items-center gap-3'>
              <button
                onClick={() => {setShowSearchMobile((s) => !s)
                  if (!showSearchMobile) setMenuOpen(false)
                }}
                aria-label='Search'>
                  <img src={search} alt="Search" className='w-5 h-5 invert' />
                </button>
              <Cart/>
              <Checkbox isOpen={menuOpen} 
              onToggle={() => {
                if (!menuOpen) {
                  setIsClosing(false);
                } 
                setMenuOpen((s) => !s)
                if (!menuOpen) setShowSearchMobile(false)
              }} />
                
            </div>
            </>
            )}
        </div>

        {!isCheckoutPage && showSearchMobile && (
          <div className='md:hidden absolute top-full left-0 w-full bg-white px-8 py-3 shadow-sm z-40 animate-slideDown'>
            <div className='w-full flex justify-center px-4'>
          <div className='w-full max-w-xl'>
            <SearchBar autoFocus/>
          </div>
          </div>
          </div>
        )}
        {!isCheckoutPage && menuOpen && (
          <div 
          className={`
          md:hidden px-6 py-4 space-y-4
          transition-all duration-300
          ${isClosing ? 'animate-slideMenuUp' : 'animate-slideMenuDown'}`}>
            <Link to='/' className='block font-semibold' onClick={closeMobileMenu}>Home</Link>

            <div>
              <p className='font-semibold'>Women</p>
              <div className='flex flex-col ml-4 space-y-2'>
                <Link to="/products/women/ready-to-wear" className='hover:underline' onClick={closeMobileMenu}>Ready To Wear</Link>
                <Link to="/products/women/unstitched" className='hover:underline' onClick={closeMobileMenu}>Unstitched</Link>
                <Link to="/products/women/accessories" className='hover:underline' onClick={closeMobileMenu}>Accessories</Link>
                <Link to="/products/women/all" className='hover:underline' onClick={closeMobileMenu}>View All</Link>
              </div>
            </div>

            <div>
              <p className='font-semibold'>Fragrances</p>
              <div className='flex flex-col ml-4 space-y-2'>
                <Link to="products/fragrances/womens-fragrances" className='hover:underline' onClick={closeMobileMenu}>Women's Fragrances</Link>
                <Link to="products/fragrances/mist" className='hover:underline' onClick={closeMobileMenu}>Body Mist</Link>
                <Link to="products/fragrances/all" className='hover:underline' onClick={closeMobileMenu}>View All</Link>
              </div>
            </div>
          </div>
        )}
    </header>
  )
}

export default React.memo(Navbar);

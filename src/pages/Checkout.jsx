import React, { useState } from 'react'
import citiesData from '../data/citiesData.json';
import { useCart } from '../contexts/CartContext';

function Checkout() {
    const {cartItems} = useCart();
    const [selectedProvince , setSelectedProvince] = useState("");
    const [cities, setCities] = useState([]);
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [errors, setErrors] = useState({});

    const handleProvinceChange = (e) => {
        const province = e.target.value;
        setSelectedProvince(province);
        setCities(citiesData[province] || []);
    };

    const handleBlur = (e) => {
        const {name, value} = e.target;

        setErrors(prev => ({
            ...prev,
            [name]: value.trim() === "" ? "Required" : ""
        }));
    };
  return (
    <div className='pt-24 px-6 flex flex-col md:flex-row lg:gap-8 max-w-6xl mx-auto'>
        <div className='flex-1 p-6 order-1 md:order-2'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-1'>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold'>Order Summary</h2>
        <span className='text-sm md:text-lg font-semibold '>
            ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
        </span>
        </div>

        <div className='md:hidden flex items-center gap-2 ml-auto text-sm md:text-lg'>
            <span className='whitespace-nowrap flex-shrink-0'>
                Rs.{" "}
                {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </span>
        
        <button
        onClick={() => setShowOrderSummary(!showOrderSummary)}
        className={`text-gray-700 text-xl transform transition-transform duration-300 ${
            showOrderSummary ? 'rotate-180' : 'rotate-0'
        }`}>
            ▼
        </button>
        </div>

        </div>

        
        <hr className='mb-4'/>

        {cartItems.length === 0 && (
            <p className='text-gray-500 text-center'>Your cart is empty.</p>
        )  }

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showOrderSummary || window.innerWidth >= 768
            ? 'max-h-[1000px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}>
            <div className='max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
            {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className='flex items-start mb-4 border-b pb-3'>
                    <img 
                    src={`/${Array.isArray(item.images) ? item.images[0] : item.image}`} 
                    alt={item.name}
                    className='w-20 h-20 mr-3' />
                    <div className='flex-1 '>
                        <p className='font-semibold'>{item.name}</p>
                        {item.selectedSize && (
                            <p className='text-sm text-gray-600'>Size: {item.selectedSize}</p>
                        )}
                        <p className='text-sm text-gray-600'>Quantity: {item.quantity}</p>
                    <p className='text-sm text-gray-600'>Rs. {item.price * item.quantity}</p>
                    </div>
                </div>
            ))}
            </div>

            <div className=' flex justify-between font-bold text-lg mt-5'>
                <span>Total</span>
                <span>
                    Rs.{" "} {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0 )}
                </span>
            </div>
            </div>
    </div>


    <form className='flex flex-col gap-4 flex-1 p-6 order-2 md:order-1'>
        <h2 className='text-2xl font-bold mb-2'>Checkout Details</h2>
        <hr className='mb-2'/>

        <div className='relative'>
        <input type="text"
        name='firstName'
        required
        placeholder='First Name'
        onBlur={handleBlur}
        className={`border rounded-lg p-2 w-full outline-none pr-6 placeholder-gray-400
            ${errors.firstName ? "border-red-500" : ""}`}
         />
         {errors.firstName && (
            <span className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500'>*</span>
         )}
         </div>

         <div className='relative'>
        <input type="text"
        name='lastName'
        placeholder='Last Name'
        required
        onBlur={handleBlur}
        className={`border rounded-lg p-2 w-full outline-none pr-6 placeholder-gray-400
            ${errors.lastName ? "border-red-500" : ""}`} 
        />
         {errors.lastName && (
            <span className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500'>*</span>
         )}
        </div>

        <div className='relative'>
        <input type="text"
        name='email'
        placeholder='Email'
        required
        onBlur={handleBlur}
        className={`border rounded-lg p-2 w-full outline-none pr-6 placeholder-gray-400
            ${errors.email ? "border-red-500" : ""}`}
         />
         {errors.lastName && (
            <span className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500'>*</span>
         )}
         </div>

         <div className='relative'>
        <input type="text"
        name='address'
        required
        placeholder='Address'
        onBlur={handleBlur}
         className={`border rounded-lg p-2 w-full outline-none pr-6 placeholder-gray-400
            ${errors.address ? "border-red-500" : ""}`}
         />
         {errors.address && (
            <span className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500'>*</span>
         )}
        </div>
        <select 
        value={selectedProvince}
        onChange={handleProvinceChange}
        className='border rounded-lg p-2 outline-none'>
            <option value="" >Select Province</option>
            {Object.keys(citiesData).map((province) => (
            <option key={province} value={province} >
                {province}
            </option>
            ))}
        </select>
        <select className='border rounded-lg p-2 outline-none  '>
            <option value=""  >Select City</option>
            {cities.map((city) => (
                <option key={city} value={city} >
                    {city}
                </option>
            ))}
        </select>
        
        <div className='relative'>
        <input 
        type="number" 
        name='phone'
        placeholder='Phone Number'
        required
        onBlur={handleBlur}
       className={`border rounded-lg p-2 w-full outline-none pr-6 placeholder-gray-400
            ${errors.phone ? "border-red-500" : ""}`}
         />
         {errors.phone && (
            <span className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500'>*</span>
         )}
        </div>
        <button
        type='submit'
        className='bg-black text-white rounded-lg py-2 hover:bg-gray-900 transition-all mt-4'>
            Place Order
        </button>
    </form>

    

    </div>
  )
}

export default Checkout

import React, { useEffect, useState } from 'react'

const images = [
    "women/dresses/rtw/rtw-1c.webp",
    "women/dresses/unstitched/green.webp",
    "women/Accessories/wa-4.webp",
    "fragrances/perfumes/milano.webp",
    "fragrances/mists/jo-malone.webp",
]

function Hero() {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    },[])
  return (
    <div className=' relative w-full h-[85vh] overflow-hidden'>
        {images.map((img, index) => (
            <img 
            key={index}
            src={img}
            alt="" 
            className={`
                absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-opacity duration-1000 ease-in-out 
                ${index === currentIndex ? "opacity-70" : "opacity-0"} hidden md:block`}
                />
        ))}

        {images.map((img, index) => (
            <div 
            key={index + "-main"}
            className={`
                absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out
                ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            >
            <img 
            src={img} 
            alt=""
            className='w-full md:w-[50%] h-full md:h-[80%] drop-shadow-2xl'
             />
             </div>
        ))}

        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>

        <div className='absolute bottom-10 left-6 md:left-10 text-white'>
            <h1 className='text-4xl md:text-6xl font-bold drop-shadow-md'>Discover Your Style</h1>
            <p className='mt-3 text-lg md:text-xl drop-shadow-md'>
                Luxury • Fashion • Elegance
            </p>
        </div>
    </div>
  )
}

export default Hero

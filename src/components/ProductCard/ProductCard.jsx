import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ProductCard({product, addToCart}) {
  const navigate = useNavigate();

  function handleAddToCart() {
  const isRTW = product.category.toLowerCase().includes("ready-to-wear");

  if (isRTW){
    navigate(`/products/${product.id}`);
  } else {
    addToCart(product);
  }
  }
  return (
    <div className='w-full flex flex-col text-start'>
      <div className='relative overflow-hidden'>
    <Link 
    to={`/products/${product.id}`} 
    className='w-full flex flex-col text-start'>
        <img src={`/${Array.isArray(product.images) ? product.images[0] : product.image}`} 
        alt={product.name} 
        loading='lazy' 
        className='w-full h-60 md:h-72 lg:h-80 transition-transform duration-700 ease-in-out transform hover:scale-105'/>
        <div className='mt-3'>
        <h3 className='text-lg font-semibold'>{product.name}</h3>
        <p className='text-gray-500 text-sm'>{product.category}</p>
        <p className='text-gray-800 font-bold mt-2'>Rs. {product.price}</p>
        </div>
        </Link>

        {product.isNew && (
          <span className='absolute top-3 left-3 bg-gray-100 text-gray-800 rounded font-medium px-2 py-1 inline-block w-fit '>
            NEW
          </span>
        )}
        </div>
        
        <button 
        onClick={handleAddToCart}
        className='mt-3 w-full bg-black text-white py-2 rounded-lg'>
            Add to Cart
        </button>
        
      
      </div>
    
  )
}

export default React.memo(ProductCard);

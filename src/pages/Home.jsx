import React from 'react'
import Hero from '../components/Hero/Hero'
import ProductsList from '../components/ProductsList/ProductsList'
import { products } from '../data/productsData'
import { Link } from 'react-router-dom'

function Home() {
  const categories = [...new Set(products.map(p => p.category))];
  return (
    <div className='pt-16'>
      <Hero />

        <section className='px-6 py-10'>
      <h2 className='font-bold text-4xl mb-6 text-center'>Our Collection</h2>

      <div className='flex overflow-x-auto gap-6 pb-4 scrollbar-hide'>
      {categories.map(category => {
        const categoryProducts = products.filter(p => p.category === category);

        return (
          <div key={category} 
          className='relative min-w-[200px] sm:min-w-[300px] h-64 rounded-2xl overflow-hidden shadow-lg flex-shrink-0'>
 
            <img src={Array.isArray(categoryProducts[0].images)
              ? `/${categoryProducts[0].images[0]}`
              : `/${categoryProducts[0].image}`
            }
            alt={category}
            className='w-60 sm:w-80 h-80' 
            />
          
          <div className='absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white'>
             <h3 className='text-2xl font-semibold mb-4 capitalize'>
              {category.replace(/-/g, ' ')}
            </h3>
          

              <Link
              to = {`/products/${categoryProducts[0].gender}/${category}`}
              className='text-white px-4 py-2 font-semibold'>
              View Collection
              </Link>
            </div>
            </div>
            
        );
      })}
            </div>
      
      </section>

      <section className='px-6 py-10'>
        <h2 className='text-center font-bold text-4xl mb-6'>New Arrivals</h2>

        {(() => {
          const newArrivalProducts = products.filter(p => p.isNew);

           return (
            <>
            {newArrivalProducts.length > 0 ? (
              <ProductsList products={newArrivalProducts} />
            ) : (
              <p className='text-center text-gray-600'>No new products available.</p>
            )}
            </> 
           );
          })()}
      </section>
    </div>
  )
}

export default Home

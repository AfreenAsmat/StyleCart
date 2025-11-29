import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { products } from '../../data/productsData'
import { useCart } from '../../contexts/CartContext'

function ProductsList({products = []}) {
  const {addToCart} = useCart();
  return (
    <section className='px-4 py-10'>
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 '>
        {products.length > 0 ? (
        products.map((product) => (
      <ProductCard key={product.id} product={product} addToCart={addToCart}/>
        ))
        ) : (
            <p>No products to display.</p>
        )}
    </div>

    {products.length > 0 && (
      <p className='text-center text-gray-600 mt-6'>No more products.</p>
    )}
    </section>
  )
}

export default React.memo(ProductsList);

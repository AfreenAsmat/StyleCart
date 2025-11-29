import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/productsData';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard/ProductCard';

function ProductDetails() {
    const {id} = useParams();
    const productId = parseInt(id, 10);
    const product = products.find(p => p.id === productId) || null;

    const [selectedSize, setSelectedSize] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {addToCart} = useCart();
    const [showSizeWarning, setShowSizeWarning] = useState(false);

    const productImages = product ? (product.images || [product.image]) : [];
    const [mainImage, setMainImage] = useState(productImages[0] || '');

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        if (!product) {
            setSelectedSize(null);
            setMainImage('');
            setIsModalOpen(false);
            return;
        }
        setSelectedSize(null);

        const imgs = product.images || [product.image];
        setMainImage(imgs[0] || '');

        setIsModalOpen(false);

        window.scrollTo(0, 0);
    },[productId, product]);

    useEffect(() => {
        if (!product) return;

        const existing = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        
        const filtered = existing.filter(p => p.id !== product.id);

        const updated = [product, ...filtered];

        localStorage.setItem("recentlyViewed", JSON.stringify(updated.slice(0, 6)));
    },[productId]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        setRecentlyViewed(items);
    },[productId]);

    const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

    if (!product){
        return <h2 className='text-center text-red-500 mt-20'>Product not found.</h2>
    }

    const handleImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/placeholder.png';
    };

    const requiresSize = product.sizes && product.sizes.length > 0;

    function handleAddToCartClick() {
        if (requiresSize && !selectedSize ) {
            setShowSizeWarning(true);
           setTimeout(() => setShowSizeWarning(false), 2500);
            return;
        }

        addToCart(product, selectedSize);
    }
  return (
    <div className='pt-24'>
        <div className='max-w-6xl mx-auto p-6 '>

        <div className='flex flex-col items-center md:flex-row md:gap-8'>
            <div className='flex flex-col items-center md:w-1/2'>
                <img src={`/${mainImage}`}
                alt={product.name} 
                loading='lazy'
                className='w-[400px] h-[500px]  rounded-lg mb-4' 
                />

                {productImages.length > 1 && (
                    <div className='flex gap-3 overflow-x-auto scrollbar-hide'>
                        {productImages.map((img, index) => (
                            <img 
                            key={index}
                            src={`/${img}`} 
                            alt={`${product.name}-${index}`}
                            onClick={() => setMainImage(img)}
                            onError={handleImgError}
                            className={`w-20 object-cover rounded-lg cursor-pointer`} />
                        ))}
                    </div>
                )}
            </div>
      
       <div className='md:w-1/2 mt-6 text-left'>
      <h1 className='text-2xl font-bold mt-4 '>{product.name}</h1>
      <p className='text-gray-500 mt-2'>{product.category}</p>
      <p className='text-black font-bold mt-2 text-xl'>Rs. {product.price}</p>
      {product.sizeChart && 
      <div className='mt-4'>
        <div className='flex justify-between items-center mb-2'>
        <h3 className='text-lg font-medium'>Select your size</h3>
         {product.sizeChart && (
            <p
            className='text-gray-700 underline cursor-pointer mt-3 inline-block hover:text-gray-600'
            onClick={() => setIsModalOpen(true)}>
                Size Chart
            </p>
        )}
        </div>
    
        {product.sizes && product.sizes.length > 0 && (
        <div className='flex space-x-3'>
            {product.sizes.map((size, index) => (
                <button 
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border
                ${selectedSize === size
                    ? 'border-gray-700'
                    : 'hover:bg-gray-100'
                }`}>
                    {size}
                </button>
            ))}
        </div>
)}
      
       
        </div>
}
        <div className='mt-6'>
            <h3 className='text-lg font-semibold'>Description</h3>
            <p className='text-gray-700 mt-2 leading-relaxed'>{product.description}</p>
            {product.fabric && 
            <p className='mt-2 text-gray-600'>
                <span className='font-medium'>Fabric:</span> {product.fabric}
            </p>
}                
              {product.material && 
            <p className='mt-2 text-gray-600'>
                <span className='font-medium'>Material:</span> {product.material}
            </p>
}
        </div>

        {showSizeWarning && (
            <p className='mt-3 text-sm text-red-600'>Please select a size before adding to cart.</p>
        )}
      <button 
      onClick={handleAddToCartClick}
      aria-disabled={requiresSize && !selectedSize}
      className={`mt-4 py-2 px-6 rounded-lg transition bg-black text-white
      ${requiresSize && !selectedSize ? 'cursor-not-allowed' : ''}`}>
         Add to Cart
      </button>
      </div>
      </div>

      {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-2xl relative'>
                    <button
                    onClick={() => setIsModalOpen(false)}
                    className='absolute top-2 right-3 text-gray-500 text-2xl font-bold '>
                        &times;
                    </button>
                <h3 className='text-lg font-semibold mb-3'>Size Chart</h3>
                <table className='w-full text-left border-collapse border border-gray-300 text-sm'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='border px-3 py-2'>Size</th>
                            <th className='border px-3 py-2'>Chest (in)</th>
                            <th className='border px-3 py-2'>Waist (in)</th>
                            <th className='border px-3 py-2'>Hip (in)</th>
                            <th className='border px-3 py-2'>Length (in) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(product.sizeChart).map(([size, values]) => (
                            <tr key={size}>
                                <td className='border px-3 py-2 font-medium'>{size}</td>
                                <td className='border px-3 py-2'>{values.chest}</td>
                                <td className='border px-3 py-2' >{values.waist}</td>
                                <td className='border px-3 py-2' >{values.hip}</td>
                                <td className='border px-3 py-2'>{values.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        )}
        {recentlyViewed.length > 1 && (
            <div className=' mt-16 '>
                <h2 className='text-2xl font-bold mb-4'>Recently Viewed</h2>
                <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory'>
                    {recentlyViewed
                    .filter(p => p.id !== product.id)
                    .map((item) => (
                        <div key={item.id} className='w-[200px]  lg:w-[300px] flex-shrink-0 snap-start'>
                            <ProductCard product={item}/>
                        </div>
                    ))}
                
                </div>
            </div>
        )}

        {recentlyViewed.length <= 1 && (
            <div className='mt-16'>
                <h2 className='text-2xl font-bold mb-4'>You May Also Like</h2>
                <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory'>
                    {relatedProducts.map((item) => (
                        <div key={item.id} className='w-[200px] lg:w-[300px] flex-shrink-0 snap-start'>
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
    </div>
  )
}

export default ProductDetails

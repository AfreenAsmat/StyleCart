import React, { useState } from 'react'
import { useCart } from '../../contexts/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Cart() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const {cartItems, addToCart, removeFromCart, removeItemCompletely} = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    const openCart = () => {
      setIsAnimating(true);
      setTimeout(() => setIsCartOpen(true), 10);
    };

    const closeCart = () => {
      setIsCartOpen(false);
      setTimeout(() => setIsAnimating(false), 400);
    };
  return (
    <div className='relative'>
        {!isCartOpen && (
      <button
      onClick={openCart}
      className='relative flex items-center gap-2 px-2 py-2 rounded-lg z-[10000]'>
        <FaShoppingCart />
        <span className='hidden sm:inline'>Cart</span>
        <span className='absolute -top-2 -right-2 text-black text-xs font-bold px-1.5 py-0.5'>
        ({cartItems.reduce((sum, i) => sum + i.quantity,0)})
        </span>
      </button>
        )}

      {isAnimating && (
  <>
    
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={closeCart}
    ></div>

    {/* Cart panel */}
<div
  className={`fixed top-0 right-0 h-screen  w-80  bg-white shadow-2xl rounded-none  p-6 transform transition-all duration-500 ease-in-out z-[9999] flex flex-col ${
    isCartOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
  }`}
>
  <button
    onClick={closeCart}
    className="text-gray-500 text-2xl font-bold absolute top-3 right-4"
  >
    &times;
  </button>

  <h2 className="text-xl font-bold mb-4">Your Cart</h2>
  <hr />

  <div className="flex-1 overflow-y-auto mt-10 mb-24 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    {cartItems.length === 0 ? (
      <p className="mt-4 text-gray-500 text-center">Your cart is empty.</p>
    ) : (
      cartItems.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize}`}
          className="flex items-start gap-3 mt-4 border-b pb-3"
        >
          <img
            src={`/${Array.isArray(item.images) ? item.images[0] : item.image}`}
            alt={item.name}
            className="w-16 h-20  mr-3 rounded flex-shrink-0 "
          />
          <div className='flex flex-col flex-1 overflow-y-auto'>
            <p className="font-medium text-sm">{item.name}</p>
            {item.selectedSize && 
            <p className="text-xs text-gray-800">
              Size: {item.selectedSize}
            </p>
}
            <p className="text-sm text-gray-800">Rs. {item.price}</p>

            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-1.5 py-0.5 text-sm border font-bold rounded hover:bg-gray-100"
                onClick={() => removeFromCart(item.id, item.selectedSize)}
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                className="px-1.5 py-0.5 text-sm border font-bold rounded hover:bg-gray-100"
                onClick={() => addToCart(item, item.selectedSize)}
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                removeItemCompletely(item.id, item.selectedSize)
              }
              className="text-gray-800 text-sm mt-2"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))
    )}
    </div>

    {cartItems.length > 0 && (
      <div className="absolute bottom-0 left-0 w-full bg-white border-t pt-6 py-4 px-4 shadow-inner flex flex-col">
        <p className="text-lg font-semibold text-right mb-2">
          Total: Rs.{' '}
          {cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </p>
        <Link to='/checkout' className='w-full flex justify-center'>
        <button className=' w-60 bg-black py-2 rounded-lg text-white'>
            Checkout
        </button>
        </Link>
      </div>
    )}
  
</div>

  </>
)}

    </div>
 ); 
}

export default Cart

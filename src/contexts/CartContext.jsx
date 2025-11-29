import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(() => {
         const saved = localStorage.getItem("cart");
         return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    },[cartItems]);

    const addToCart = (product, selectedSize) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.selectedSize === selectedSize
            );

            if (existingItemIndex !== -1){
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += 1;
                return updatedItems;
            } else {
                return [...prevItems, {...product, selectedSize, quantity: 1}];
            }
        });
    };

    const removeFromCart = (id, selectedSize) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === id && item.selectedSize === selectedSize
            );

            if (existingItemIndex !== -1){
                const updatedItems = [...prevItems];
                const currentItem = updatedItems[existingItemIndex];

                if (currentItem.quantity > 1) {
                    currentItem.quantity -= 1;
                    return updatedItems;
                } else {
                    return prevItems.filter(
                        (item) => !(item.id === id && item.selectedSize === selectedSize)
                    );
                }
            }
            return prevItems;
        });
    };

    const removeItemCompletely = (id, selectedSize) => {
        setCartItems((prevItems) => 
        prevItems.filter(
            (item) => !(item.id === id && item.selectedSize === selectedSize)
        ));
    };

return (
    <CartContext.Provider
    value={{cartItems, addToCart, removeFromCart, removeItemCompletely}}>
        {children}
    </CartContext.Provider>
)
}

export const useCart = () => useContext(CartContext);
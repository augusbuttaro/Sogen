import { useState, useEffect, createContext } from 'react'

export const CartContext = createContext()

function CartProvider({children}) {
    const [cart, setCart] =useState([])
    const addToCart = (product, id) => {
        const newItem = {...product, amount:1}
        const cartItem = cart.find((item) =>{
            return item.id === id
        });
        if (cartItem){
            const newCart = [...cart].map((item)=>{
                if (item.id === id) {
                    return {...item, amount: cartItem.amount + 1}
                }else{
                    return item
                }
            });
            setCart(newCart)
        }else {
            setCart([...cart, newItem]);
        }
    };
    const removeFromCart = (id) => {
        const cartItem = cart.find((item) => item.id === id);
    
        if (cartItem) {
          if (cartItem.amount > 1) {
            const newCart = cart.map((item) =>
              item.id === id ? { ...item, amount: item.amount - 1 } : item
            );
            setCart(newCart);
          } else {
            const newCart = cart.filter((item) => item.id !== id);
            setCart(newCart);
          }
        }
      };
      const clearCart = () => {
        setCart([]);
    };
    console.log(cart)
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, setCart}}>
            {children}
        </CartContext.Provider>
    )
    }

export default CartProvider

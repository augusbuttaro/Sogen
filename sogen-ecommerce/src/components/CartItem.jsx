import { useCallback, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import clothesIcon from '../assets/clothes-icon.png'
import { CartContext } from '../contexts/CartContext'
import { ProductContext } from '../contexts/ProductContext'

function CartItem({item, key}) {
    const { title, price, amount, images } = item;
    const {cart, addToCart, removeFromCart} = useContext(CartContext)
    const {product} = useContext(ProductContext) 
  return(
    <>
        <div className='px-24 '>
            <div key={key} className='h-32 w-4/5 mx-auto my-4 p-4 flex justify-between align-center bg-light-orange'>
                <div className='flex gap-2 w-1/3'>
                    <h1 className='text-center self-center'>{item.title}</h1>
                    <Link to={`/products/${item.id}`} className='text-sm self-center text-gray'>View</Link>
                </div>
                <div className='self-center flex'>
                    <button className='bg-dark-green w-6 h-6 text-white' onClick={()=>removeFromCart(item.id)}>-</button>
                    <div className='bg-green  w-16'>
                        {cart && cart.length > 0 ? (
                            cart.map((cartItem) => {
                                if (cartItem.id === item.id) {
                                return <p className='text-center' key={item.id}>{item.amount}</p>;
                                }
                                return null;
                            })
                            ) : (
                            <p className='text-center'>0</p>
                        )}
                    </div>
                    <button className='bg-dark-green w-6 h-6 text-white' onClick={()=>addToCart(item, item.id)} >+</button>
                </div>
                <div className='flex justify-center gap-2 w-1/12'>
                    <p className='self-center'>${item.price * item.amount}</p>
                    <p className='self-center text-gray'>(${item.price})</p>
                </div>
                <img className='h-[100%] w-28 self-center' src={item.image} />  

            </div>
        </div>
      
      </>  
  )
  
}

export default CartItem
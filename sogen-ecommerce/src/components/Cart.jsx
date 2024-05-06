import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { CartContext } from '../contexts/CartContext'
import CartItem from '../components/CartItem'

function Cart() {
  const {cart, addToCart, clearCart} = useContext(CartContext)
  
  let totalPrice = 0
  cart.forEach(item => {
    totalPrice += item.price * item.amount
  });
  return (
    <>
      {cart.length > 0 ? (
        <>
        <div className='my-12'>
          <h1 className='text-4xl text-center '>Shopping Cart ({cart.length})</h1>
        </div>
          {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          <p className='text-center text-sm text-gray underline cursor-pointer' onClick={clearCart}>Clear Cart</p>
          <p className='text-xl text-center bg-green mx-auto w-1/12 my-12'>Total:{totalPrice.toFixed(2)}</p>
          <div className='flex gap-4 justify-center my-16'>
            <Link className='bg-dark-green text-light-green w-2/12 text-center py-2' to='/products'>Continue Shopping</Link>
            <Link className='bg-dark-green text-light-green w-2/12 text-center py-2' to='/checkout'>Checkout</Link>
        </div>
        </>
        
      ) : (
        <div className='flex flex-col w-screen h-screen justify-center align-center'>
          <h1 className='text-2xl self-center'>Your cart is empty...</h1>
          <Link className='self-center my-12 py-2 px-16 text-light-green text-xl bg-dark-green' to='/products'>Shop now</Link>
        </div>
      )}
    </>
  )
}

export default Cart

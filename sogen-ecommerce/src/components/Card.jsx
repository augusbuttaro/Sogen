import { useCallback, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import cartIcon from '../assets/cart-icon.png'
import eyeIcon from '../assets/eye-icon.png'
import { CartContext } from '../contexts/CartContext'

function Card({products}) {
  const {addToCart} = useContext(CartContext)
  return(
    <>
      {products.map((product, index) =>{
          return (
            <div key={index} className=''>
              <div className='h-[300px] relative border border-gray mb-4 overflow-hidden group transition'>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className='w-[200px] mx-auto flex justify-center items-center'>
                    <img className='max-h-[160px] group-hover:scale-110 transition duration-300 self-center' src={product.image} />
                  </div>
                  <div className='bg-red-fifty absolute top-6 -right-11 group-hover:right-5 transition-all duration-300 opacity-0 group-hover:opacity-100 flex flex-col p-2 gap-y-2'>
                    <button onClick={()=>addToCart(product, product.id)} className=' bg-black text-light-green text-center h-6 w-6'>
                      <img className='p-1' src={cartIcon} />
                    </button>
                    <Link to={`/products/${product.id}`} className=' bg-black text-center h-6 w-6 text-light-green'>
                      <img src={eyeIcon} className='p-1' />
                    </Link>
                  </div>
                </div>
              </div>
              <Link to={`/products/${product.id}`}>
                <div>
                  <p>{product.category}</p>
                  <h1 className='text-sm font-bold'>{product.title}</h1>
                  <p className=''>${product.price}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </>  
  )
  
}

export default Card

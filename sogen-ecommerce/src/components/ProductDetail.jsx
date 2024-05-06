import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom"
import { ProductContext } from '../contexts/ProductContext'
import { CartContext } from '../contexts/CartContext';
import usePagination from '../hooks/Pagination';
import Card from './Card';

function ProductDetail() {
  
  const { id } = useParams()
  const { products } = useContext(ProductContext)
  const product = products.find((item) =>{
    return item.id === parseInt(id)
  })
  if(!product){
    return(
      <p className=''>Loading...</p>
    )
  }
  const {title, price, description, images } = product
  const similarProducts = products.filter((item) => {
    return(
      item.category === product.category
    )
  })
  const { currentPage, currentData, totalPages, nextPage, prevPage } = usePagination(similarProducts);
  const {cart, addToCart, removeFromCart} =useContext(CartContext)

  return (
    <>
    <div className='flex'>
      <div className='flex flex-col justify-center gap-16 p-16 w-1/2'>
        <div className='flex flex-col gap-4'>
        <h1 className='text-2xl'>{product.title}</h1>
        <h2 className='text-xl text-gray'>$ {product.price}</h2>
        <div className='w-full h-[1px] border-none rounded-lg bg-black mx-auto'></div>
        </div>
        <p className='text-sm'>{product.description}</p>
        <div className='flex flex-col gap-2'>
          <p className='font-bold'>Amount</p>
          <div className='flex justify-start'>
            <button className='bg-dark-green w-6 h-6 text-white' onClick={()=>removeFromCart(product.id)}>-</button>
            <div className='bg-green  w-16'>
            {cart && cart.length > 0 ? (
              cart.map((item) => {
                if (item.id === product.id) {
                  return <p className='text-center' key={item.id}>{item.amount}</p>;
                }
                return null;
              })
            ) : (
              <p className='text-center'>0</p>
            )}
            </div>
            <button className='bg-dark-green w-6 h-6 text-white' onClick={()=>addToCart(product, product.id)} >+</button>
          </div>
        </div>
        
      </div>
      <div className='flex flex-col p-16 justify-center'>
        <img className='w-1/2 self-center mb-8' src={product.image} />
      </div>
    </div>
    <div>
    <h1 className='w-4/5 mx-auto mb-8'>Similar Products:</h1>
      <div className='flex justify-around w-4/5 mx-auto mb-16'>
        <button className='text-4xl' onClick={prevPage} disabled={currentPage === 1}>{'<'}</button>
          <div className='grid grid-cols-five gap-8 px-16 w-[100%]'>
            <Card products={currentData} />
          </div>
        <button className='text-4xl' onClick={nextPage} disabled={currentPage === totalPages}>{'>'}</button>
      </div>
    </div>
    
    </>
  )
}

export default ProductDetail
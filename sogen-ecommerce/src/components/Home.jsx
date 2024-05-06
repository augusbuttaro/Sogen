import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ProductContext } from '../contexts/ProductContext'
import usePagination from '../hooks/Pagination';
import Card from './Card'
import mensIcon from '../assets/mens-icon.png'
import womensIcon from '../assets/womens-icon.png'
import jewelryIcon from '../assets/jewelry-icon.png'
import electronicsIcon from '../assets/electronics-icon.png'


function Home() {

  const categoriesArr = [
    { name: "men's clothing", img: mensIcon, category: "men's clothing"},
    { name: "women's clothing",img: womensIcon, category: "women's clothing"},
    { name: 'jewelery', img: jewelryIcon, category: "jewelery"},
    { name: 'electronics', img: electronicsIcon, category: "electronics" },
  ]
  const { products } = useContext(ProductContext)
  const underThirtyProducts = products.filter((item) => {
    return(
      item.price < 30
    )
  })
  const trendingProducts = products.filter((item) => {
    return(
      item.id < 80
    )
  })
  
  const { currentPage: underThirtyCurrentPage, currentData: underThirtyCurrentData, totalPages: underThirtyTotalPages, nextPage: underThirtyNextPage, prevPage: underThirtyPrevPage } = usePagination(underThirtyProducts);
  
  const { currentPage: trendingCurrentPage, currentData: trendingCurrentData, totalPages: trendingTotalPages, nextPage: trendingNextPage, prevPage: trendingPrevPage } = usePagination(trendingProducts);

  return (
    <>
      <div key={0} className='bg-light-orange py-2 px-16 shadow-header-shadow flex justify-center gap-16'>
        {categoriesArr.map((category, index) =>{
          return(
            <Link key={index} to={`/products?category=${category.category}`}>
              <div  className='flex w-32 flex-col'>
                <img className='h-16 p-2 self-center' src={category.img} />
                <p className='text-center'>{category.name}</p>
              </div>
            </Link>

          )
        })}
      </div>
      <div className="bg-home bg-cover bg-opcity-[10%] flex flex-col my-8 mx-auto w-[80%]">
        <h1 className='text-3xl text-center p-8'>Sogen Family</h1>
        <p className='text-sm text-center m-auto w-2/3 '>
          Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.
          Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo xvi.1​ Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.
        </p>
        <Link className='mx-auto my-12 py-2 px-16 text-light-green text-xl bg-dark-green' to='/products'>Shop now</Link>
      </div>
      <div>
        <h1 className='mx-16 mb-8'>TODAY'S UNDER $10</h1>
        <div className='flex justify-center gap-8'>
          <button className='text-4xl' onClick={underThirtyPrevPage} disabled={underThirtyCurrentPage === 1}>{'<'}</button>
          <div className='w-4/5 grid grid-cols-five justify-items-center gap-4'>
              <Card products={underThirtyCurrentData}/>
          </div>
          <button className='text-4xl' onClick={underThirtyNextPage} disabled={underThirtyCurrentPage === underThirtyTotalPages}>{'>'}</button>
        </div>
      </div>
      <div>
        <h1 className='mx-16 mb-8'>Trending this season</h1>
        <div className='flex justify-center mb-16 gap-8'>
          <button className='text-4xl' onClick={trendingPrevPage} disabled={trendingCurrentPage === 1}>{'<'}</button>
          <div className='w-4/5 grid grid-cols-five justify-items-center gap-4'>
              <Card products={trendingCurrentData}/>
          </div>
          <button className='text-4xl' onClick={trendingNextPage} disabled={trendingCurrentPage === trendingTotalPages}>{'>'}</button>
        </div>
      </div>
    </>
  )
}

export default Home

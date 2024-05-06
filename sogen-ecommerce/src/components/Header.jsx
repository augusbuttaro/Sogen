import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import logoIcon from '../assets/logo-icon.png'
import cartIcon from '../assets/cart-icon.png'
import lupaIcon from '../assets/lupa-icon.png'
import searchbarIcon from '../assets/searchbar-icon.png'
import { CartContext } from '../contexts/CartContext'


function Header() {
  const {cart} =useContext(CartContext)
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission
    // Perform the search action here
    window.location.href = `/products?search=${searchTerm}`;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(event);
    }
  };

  return (
    <>
      <div className='bg-orange flex align-center justify-between px-12'>
        <Link to='/'><img src={logoIcon} className='h-20' /></Link>
        <div className='flex items-center'>
          <input 
              type="text" 
              placeholder="Search" 
              className="self-center h-8 px-4 outline-none" 
              value={searchTerm} 
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => handleKeyPress(event)}
            />
            <Link to={`/products?search=${searchTerm}`} >
              <img className='h-8 bg-gray p-1' src={lupaIcon} />
            </Link>
        </div>
        <Link className=' self-center' to='/cart'>
          <img src={cartIcon} className='h-8'/>
          <div className='absolute top-12 right-10 bg-red rounded-2xl h-4 w-4'><p className='text-white m-auto text-xs text-center'>{cart.length}</p></div>
        </Link>
      </div>
    </>
  )
}

export default Header

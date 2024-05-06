import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation,  } from "react-router-dom"
import PriceFilter from '../components/PriceFilter'
import mensIcon from '../assets/mens-icon.png'
import womensIcon from '../assets/womens-icon.png'
import jewelryIcon from '../assets/jewelry-icon.png'
import electronicsIcon from '../assets/electronics-icon.png'


function Sidebar({ onPriceChange }) {
    const categoriesArr = [
        { name: "men's clothing", img: mensIcon, category: "men's clothing"},
        { name: "women's clothing",img: womensIcon, category: "women's clothing"},
        { name: 'jewelery', img: jewelryIcon, category: "jewelery"},
        { name: 'electronics', img: electronicsIcon, category: "electronics" },
      ]

      
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categories = searchParams.getAll('category');
    setSelectedCategories(categories);
  }, [location.search]);

  const handleCategoryClick = (categoryId) => {
    const updatedCategories = [...selectedCategories];
    const categoryIndex = updatedCategories.indexOf(categoryId);
  
    if (categoryIndex !== -1) {
      updatedCategories.splice(categoryIndex, 1);
    } else {
      updatedCategories.push(categoryId);
    }
  
    const searchParams = new URLSearchParams(location.search);
    updatedCategories.forEach((category) => {
      searchParams.append('category', category);
    });
  
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    setSelectedCategories(updatedCategories);
  };

  const handlePriceChange = (min, max) => {
    setSelectedPriceRange({ min, max });
  };

    return (
        <div className='w-1/4 h-100 bg-light-orange p-8'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl'>Categories</h1>
              <Link to='/products' className='text-[12px] underline text-gray'>clear filter</Link>
            </div>
            <div className='w-11/12 h-[1px] border-none rounded-lg bg-black m-auto mb-8'></div>
            {categoriesArr.map((category, index) =>{
                return(
                    <>
                        <div key={index} >
                        <Link
                        className='flex gap-4'
                            to={{
                                pathname: location.pathname,
                                search: `?category=${category.category}`,
                            }}
                            onClick={() => handleCategoryClick(category.category)}
                        >
                            <img className='h-16 p-2' src={category.img} alt={category.name} />
                            <p className='self-center text-xl'>{category.name}</p>
                        </Link>
                        </div>
                    </>
                    
                )
            })}
            <div>
                <h1 className='text-2xl mt-4'>Price</h1>
                <div className='w-11/12 h-[1px] border-none rounded-lg bg-black mb-8 m-auto'></div>
                <PriceFilter onChange={onPriceChange} />
            </div>
        </div>
    )
}

export default Sidebar

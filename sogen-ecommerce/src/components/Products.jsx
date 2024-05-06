import { useState, useContext, useEffect, } from 'react'
import { BrowserRouter, useLocation, Routes, Route, Link } from "react-router-dom"
import Sidebar from './Sidebar'
import { ProductContext } from '../contexts/ProductContext'
import Card from './Card'

function Products() {
  const { products } = useContext(ProductContext)
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]); 
  const [sortingMethod, setSortingMethod] = useState('AZ');
  const searchParams = new URLSearchParams(window.location.search);
  const categories = searchParams.getAll('category');
  const search = searchParams.get('search');

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        (categories.length === 0 || categories.includes(product.category)) &&
        (selectedPriceRange[1] === 100 ? product.price >= selectedPriceRange[0] : 
        (product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]))
    );

    if (search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [location.search, selectedPriceRange, products, search]);

  switch (sortingMethod) {
    case 'AZ':
      // Sorting alphabetically by name
      filteredProducts.sort((a, b) => {
      // Handle case where name is undefined
      const nameA = a.title || '';
      const nameB = b.title || '';
      return nameA.localeCompare(nameB); // Sort alphabetically
    });
    break;
    case 'ZA':
      // Sorting alphabetically by name
      filteredProducts.sort((a, b) => {
      // Handle case where name is undefined
      const nameA = a.title || '';
      const nameB = b.title || '';
      return nameB.localeCompare(nameA); // Sort alphabetically
    });
    break;
    case 'cheapest':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'expensive':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    default:
      break;
  }

  const handlePriceChange = (newValue) => {
    setSelectedPriceRange(newValue);
  };

  const handleSortingChange = (event) => {
    setSortingMethod(event.target.value);
  };

  return (
    <div className='flex'>
      <Sidebar onPriceChange={handlePriceChange}/>
      <div className='w-3/4 p-16'>
        <h1 className='text-center text-4xl'>{categories.length > 0 ? categories : "All" } Products</h1>
        <div className='flex justify-between items-center'>
          <p className='my-8'>Sort by:</p>
          <select value={sortingMethod} onChange={handleSortingChange}>
            <option value='AZ'>A-Z</option>
            <option value='ZA'>Z-A</option>
            <option value='expensive'>Most Expensive to Cheapest</option>
            <option value='cheapest'>Cheapest to Most Expensive</option>
          </select>
        </div>
        {filteredProducts.length === 0 ? (
          <div className='text-center text-red-500'>There are no products with that name...</div>
        ) : (
          <div className='flex justify-around'>
            <div className='grid grid-cols-five gap-8 px-16 w-[100%]'>
              <Card products={filteredProducts} />
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default Products

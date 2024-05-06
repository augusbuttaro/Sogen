import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import {CartContext} from '../contexts/CartContext'

function Checkout() {
  const [loginFormData, setLoginFormData] = useState({ name: "", address: "", phone: "", city: "", paymentMethod: "" })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const {clearCart} = useContext(CartContext)

  function handleSubmit(e) {
    e.preventDefault()
    setShowConfirmation(true)
    clearCart()
}

function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData(prev => ({
        ...prev,
        [name]: value
    }))
}
  return (
    <>
      <h1 className='text-4xl text-center my-8'>Checkout</h1>
      {showConfirmation ? (
                <div className='flex flex-col w-screen h-screen justify-center align-center'>
                    <h1 className='text-2xl self-center'>Congratulations, {loginFormData.name}! Your purchase was successful.</h1>
                    <Link className='self-center my-12 py-2 px-16 text-light-green text-xl bg-dark-green' to='/products'>Continue Shopping</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="">
                  <div className='flex justify-center'>
                    <div className='flex flex-col gap-8 w-2/5'>
                    <h2 className='text-xl mx-16'>Buyer Info</h2>
                      <div className='flex flex-col gap-2'>
                        <label className='w-3/5 text-sm self-center' for='name'>Name</label>
                        <input
                          required
                          className='w-3/5 self-center py-2 px-8'
                          name="name"
                          onChange={handleChange}
                          type="text"
                          placeholder="John Doe"
                          value={loginFormData.name}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='w-3/5 text-sm self-center' for='address'>Address</label>
                        <input
                          required
                          className='w-3/5 self-center py-2 px-8'
                          name="address"
                          onChange={handleChange}
                          type="text"
                          placeholder="Siempreviva Av. 123"
                          value={loginFormData.address}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='w-3/5 text-sm self-center' for='phone'>Phone Number</label>
                        <input
                          required
                          className='w-3/5 self-center py-2 px-8'
                          name="phone"
                          onChange={handleChange}
                          type="number"
                          placeholder="+1 111 11111"
                          value={loginFormData.phone}
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='w-3/5 text-sm self-center' for='city'>City</label>
                        <input
                          required
                          className='w-3/5 self-center py-2 px-8'
                        name="city"
                        onChange={handleChange}
                        type="text"
                        placeholder="New York"
                        value={loginFormData.city}
                      />
                      </div>
                    </div>
                    <div className='flex flex-col gap-8 w-2/5'>
                    <h2 className='text-xl mx-16'>Payment Method</h2>
                      <div className='flex flex-col gap-2'>
                        <select 
                            id="paymentMethod"
                            value={loginFormData.paymentMethod}
                            onChange={handleChange}
                            name="paymentMethod"
                            className='w-3/5 py-2 px-8 self-center'
                        > 
                          <option selected value='credit-card'>Credit card</option>
                          <option value='debit-card'>Debit Card</option>
                          <option value='bank-transfer'>Bank Transfer</option>
                          <option value='virtual-wallet'>Virtual Wallet</option>
                        </select>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label className='w-3/5 text-sm self-center' for='cardNumber'>Card Number</label>
                        <input
                          required
                          className='w-3/5 self-center py-2 px-8'
                          name="cardNumber"
                          onChange={handleChange}
                          type="number"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          value={loginFormData.cardNumber}
                        />
                      </div>
                      <div></div>
                      <div className='flex justify-center gap-4'>
                        <label className='text-sm self-center' for='cvv'>CVV</label>
                        <input
                          required
                          className='w-2/12 px-4 py-2'
                          name="cvv"
                          onChange={handleChange}
                          type="number"
                          placeholder="XXX"
                          value={loginFormData.cvv}
                        />
                        <label className='text-sm self-center' for='month'>Month</label>
                        <input
                          required
                          className='w-2/12 px-4 py-2'
                          name="month"
                          onChange={handleChange}
                          type="number"
                          placeholder="01"
                          value={loginFormData.month}
                        />
                        <label className='text-sm self-center' for='year'>Year</label>
                        <input
                          required
                          className='w-2/12 px-4 py-2'
                          name="year"
                          onChange={handleChange}
                          type="year"
                          placeholder="2024"
                          value={loginFormData.year}
                        />
                      </div>
                      <button className='bg-dark-green text-light-green self-center px-16 py-2'>
                        CheckOut
                      </button>
                    </div>
                  </div>
                  </form>
            )}
    </>
  )
}

export default Checkout

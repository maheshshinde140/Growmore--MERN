import React from 'react'
import logo from './logo.png'
function Footer() {
  return (
    <div className='w-100 bg-dark text-light d-flex mt-5 justify-content-center align-items-center flex-column '>
      <img src={logo} alt='' height={'70px'} width={'100px'}></img>
      <p>  All &copy; Right are reserve by BigBull @2024</p>
    </div>
  )
}

export default Footer


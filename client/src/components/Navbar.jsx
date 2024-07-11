import React from 'react';
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <header className='border-b border-neutral-700 shadow-md shadow-neutral-700'>
    <nav className='flex container mx-auto px-5 py-4 justify-between items-center'>
        <img src={logo} alt="logo" width={50} className='cursor-pointer'/>
        <a href="/" className=' hover:text-indigo-400 transition-all'>Home</a>
    </nav>
    </header>
  )
}

export default Navbar;
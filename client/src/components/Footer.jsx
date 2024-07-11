import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer className='border-t border-neutral-700 absolute bottom-0 w-full'>
        <p className='py-2 text-xs sm:text-sm text-center text-neutral-500'>Copyright &copy; {year} || All Rights Reserved</p>
    </footer>
  )
}

export default Footer;
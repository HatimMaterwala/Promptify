import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='flex justify-around items-center h-16 relative shadow-sm font-mono'>
      <div className="logo">
        <Image src={"/logo.png"} alt="Logo" width={50} height={50} />
      </div>
      <div className="buttons space-x-4">
        <button className='bg-white text-black px-3 py-1 rounded-full font-bold border border-r-4 border-b-4 border-black'>Sign Out</button>
        <button>Create Prompt</button>
      </div>
    </nav>
  )
}

export default Navbar

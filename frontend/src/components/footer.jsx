import React from 'react'

const Footer = () => {
  return (
    <>
        <div>
        <footer className=" w-full h-24 bg-black text-white py-4 mt-8">
          <div>
            <h2 className="text-lg font-bold text-center">ShopEase</h2>
          </div>
          <div>
            <p className="text-sm text-center mt-1">Your one-stop shop for everything!</p>

          </div>
          <div className="container mx-auto text-center">
            <p>&copy; 2024 ShopEase. All rights reserved.</p>
          </div>
        </footer>
        </div>
    </>
  )
}

export default Footer;
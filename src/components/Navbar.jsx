import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const {isLogin} = useAppContext()

  const handleLogin = ()=>{
    if(isLogin){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="text-sm w-full sticky top-0 z-[100] font-['Outfit']">
      {/* Banner Drop Price - Perbaikan pada sintaks gradasi */}
      <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-[#004E64] to-[#25A18E]">
        <p>Try AI Features</p>
      </div>

      {/* Main Navbar */}
      <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow-md">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-xl font-bold text-primary">PortfoliUI</span>
        </div>

        {/* Links Tengah (Desktop) */}
        <ul className="hidden md:flex items-center space-x-8 md:pl-28 text-main font-medium">
          <li><a href="#" className="hover:opacity-70 transition-opacity">Home</a></li>
          <li><a href="#" className="hover:opacity-70 transition-opacity">Services</a></li>
          <li><a href="#" className="hover:opacity-70 transition-opacity">Portfolio</a></li>
          <li><a href="#" className="hover:opacity-70 transition-opacity">Pricing</a></li>
        </ul>
        
        {/* Button (Desktop) */}
        <button 
          onClick={handleLogin}
          className="hidden md:inline-block btn-primary px-9 py-2 rounded-full active:scale-95 transition-all font-medium border-none">
          {isLogin ? "Go To Dashboard" : "Get Started"}
        </button>

        {/* Menu Toggle (Mobile) */}
        <button 
          aria-label="menu-btn" 
          type="button" 
          onClick={toggleMenu}
          className="inline-block md:hidden active:scale-90 transition text-main"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z"/>
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-[70px] left-0 w-full bg-white shadow-lg p-6 md:hidden transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
          <ul className="flex flex-col space-y-4 text-main">
            <li><a href="#" className="text-sm font-medium block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#" className="text-sm font-medium block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#" className="text-sm font-medium block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Portfolio</a></li>
            <li><a href="#" className="text-sm font-medium block border-b pb-2" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
          </ul>

          <button 
            type="button" 
            onClick={handleLogin}
            className="bg-primary text-white mt-6 text-sm hover:opacity-90 active:scale-95 transition-all w-full h-11 rounded-full font-medium"
          >
            {isLogin ? "Go To Dashboard" : "Get Started"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
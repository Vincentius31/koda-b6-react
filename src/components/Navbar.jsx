import { Menu, Search, ShoppingCart, XCircle } from "lucide-react";
import logoWhite from "../assets/img/Logo-White.png";
import logoBrown from "../assets/img/Logo-Brown.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ className = "" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Logout Successfully!");
    window.location.href = "/";
  };

  return (
    <>
      <header className={`absolute top-0 left-0 w-full z-40 ${className}`}>
        <nav className="flex items-center justify-between px-6 md:px-8 lg:px-20 py-6 text-white">
          
          <div className="flex flex-row gap-20 items-center">
            <Link to="/" className="flex items-center">
              <img src={logoWhite} alt="logo-white" className="h-8 w-auto object-contain" />
            </Link>

            <ul className="hidden md:flex items-center gap-10 text-sm">
              <Link to="/" className="hover:text-orange-400 transition">Home</Link>
              <Link to="/product" className="hover:text-orange-400 transition">Product</Link>
            </ul>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/history-order" className="hover:text-orange-400 transition">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/checkout-product" className="hover:text-orange-400 transition">
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition">
                  {user.email || "Profile"}
                </Link>
                <button onClick={handleLogout} className="bg-[#FF8906] text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-600 transition cursor-pointer">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition">
                  Sign In
                </Link>
                <Link to="/register" className="bg-[#FF8906] text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-600 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-5">
            <Link to="/checkout-product" className="text-white hover:text-orange-400 transition">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div 
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <img src={logoBrown} alt="Logo" className="h-7 w-auto" />
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <XCircle className="w-7 h-7 text-red-600 bg-white rounded-full" />
          </button>
        </div>

        <div className="px-6 flex-1 flex flex-col mt-2">
          
          <h3 className="text-black font-semibold text-base mb-3">Search Product</h3>
          
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 mb-8">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Find Product" 
              className="w-full outline-none text-gray-700 text-sm"
            />
          </div>

          <ul className="flex flex-col text-black font-medium">
            <li className="border-b border-[#FF8906] pb-3 mb-5">
              <Link to="/" className="text-black block" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="border-b border-gray-200 pb-3 mb-5">
              <Link to="/product" className="text-gray-700 block" onClick={() => setIsMobileMenuOpen(false)}>Product</Link>
            </li>
          </ul>
        </div>

        <div className="p-6 flex flex-col gap-4 mb-2">
          {user ? (
             <>
               <Link 
                 to="/profile" 
                 className="w-full py-3 border border-black text-black text-center rounded-md font-semibold hover:bg-gray-50 transition"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Profile
               </Link>
               <button 
                 onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                 className="w-full py-3 bg-[#FF8906] text-white text-center rounded-md font-semibold hover:bg-orange-600 transition"
               >
                 Logout
               </button>
             </>
          ) : (
             <>
               <Link 
                 to="/login" 
                 className="w-full py-3 border border-black text-black text-center rounded-md font-semibold hover:bg-gray-50 transition"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 SignIn
               </Link>
               <Link 
                 to="/register" 
                 className="w-full py-3 bg-[#FF8906] text-white text-center rounded-md font-semibold hover:bg-orange-600 transition"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Sign Up
               </Link>
             </>
          )}
        </div>
      </div>
    </>
  );
}
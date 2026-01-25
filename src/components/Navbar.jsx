import { Search, ShoppingCart } from "lucide-react"
import logoWhite from "../assets/img/Logo-White.png"

export default function Navbar({className = ""}) {
  return (
    <header className= {`absolute top-0 left-0 w-full z-50 ${className}`}>
      <nav className="flex items-center justify-between px-8 lg:px-20 py-6 text-white">
        <div className="flex flex-row gap-20">
          <a href="#" className="flex items-center">
            <img src={logoWhite} alt="logo-white" className="h-8 w-auto object-contain" />
          </a>
          <ul className="hidden md:flex items-center gap-10 text-sm">
            <li><a href="index.html" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="product.html" className="hover:text-orange-400 transition">Product</a></li>
          </ul>
        </div>


        <div className="hidden md:flex items-center gap-6" id="navAuth">
          <a href="#" className="hover:text-orange-400 transition">
            <Search className="w-5 h-5"/>
          </a>

          <a href="checkout-product.html" className="hover:text-orange-400 transition">
            <ShoppingCart className="w-5 h-5"/>
          </a>

          <a href="login.html"
            className="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition">
            Sign In
          </a>

          <a href="register.html"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-600 transition">
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  )
}

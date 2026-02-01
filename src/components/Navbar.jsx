import { Search, ShoppingCart } from "lucide-react";
import logoWhite from "../assets/img/Logo-White.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ className = "" }) {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();              
    navigate("/login");
  };

  return (
    <header className={`absolute top-0 left-0 w-full z-50 ${className}`}>
      <nav className="flex items-center justify-between px-8 lg:px-20 py-6 text-white">

        <div className="flex flex-row gap-20">
          <Link to="/" className="flex items-center">
            <img src={logoWhite} alt="logo-white" className="h-8 w-auto object-contain" />
          </Link>

          <ul className="hidden md:flex items-center gap-10 text-sm">
            <Link to="/" className="hover:text-orange-400 transition">Home</Link>
            <Link to="/product" className="hover:text-orange-400 transition">Product</Link>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-6" id="navAuth">
          <Link to="/product" className="hover:text-orange-400 transition">
            <Search className="w-5 h-5" />
          </Link>

          <Link to="/checkout-product" className="hover:text-orange-400 transition">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/profile"
                className="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition"
              >
                {currentUser.fullName || "Profile"}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-white text-white px-5 py-2 rounded-lg text-sm hover:border-orange-400 hover:text-orange-400 transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}

import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Coffee, ShoppingCart, Users, LogOut, Search, ShoppingBag } from 'lucide-react';
import logoBrown from "../../assets/img/Logo-Brown.png"
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Product", path: "/admin/product", icon: <Coffee size={20} /> },
        { name: "Order", path: "/admin/order", icon: <ShoppingCart size={20} /> },
        { name: "User", path: "/admin/user", icon: <Users size={20} /> }
    ];
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-200 py-6 flex flex-col fixed h-full">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <img
                        src={logoBrown}
                        alt="logo-brown"
                        className="object-contain ml-6"
                    />
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                                : 'text-gray-400 hover:bg-orange-50 hover:text-orange-500'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 w-full transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Keluar</span>
                    </button>
                </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* HEADER */}
                <header className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-end gap-6 sticky top-0 z-10">
                    <Search className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                    <ShoppingBag className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                    <div className="flex items-center gap-3 border-l pl-6">
                        <img
                            src="/admin-avatar.png"
                            alt="Admin"
                            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                        />
                        <span className="text-sm font-medium text-gray-700">Admin</span>
                        <span className="text-[10px] text-gray-400">▼</span>
                    </div>
                </header>

                {/* CONTENT DARI OUTLET */}
                <main className="p-8 bg-gray-50/50 min-h-[calc(100-64px)]">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

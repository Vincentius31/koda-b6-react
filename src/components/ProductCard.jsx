import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({
    id,
    name,
    src,
    description,
    price,         
    originalPrice, 
    rating,        
    discountRate
}) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        const newItem = {
            id: id,
            name: name,
            image: src,
            price: Number(price),
            qty: 1,
            size: "Regular",
            temperature: "Ice"
        };
        addToCart(newItem);
    };

    return (
        <div className="relative bg-transparent h-full flex flex-col">
            {/* 1. Image Container (Lebih proporsional) */}
            <div className="w-full h-64 overflow-hidden relative rounded-sm">
                <img src={src} alt={name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                
                {/* Badge Flash Sale (Muncul jika ada diskon) */}
                {discountRate > 0 && (
                    <div className="absolute top-4 left-4 bg-[#E51B22] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        FLASH SALE!
                    </div>
                )}
            </div>

            {/* 2. White Content Box (Melayang proporsional dengan -mt-16) */}
            <div className="relative -mt-16 mx-4 bg-white shadow-md p-5 flex flex-col grow border border-gray-50">
                <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1">{name}</h3>
                
                <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 leading-relaxed grow">
                    {description}
                </p>

                {/* Rating (5 Bintang sejajar sesuai mockup) */}
                {rating > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-3.5 h-3.5 ${i < Math.round(rating) ? "fill-[#FF8906] text-[#FF8906]" : "fill-gray-200 text-gray-200"}`} 
                                />
                            ))}
                        </div>
                        <span className="text-[12px] font-medium text-gray-500">{rating.toFixed(1)}</span>
                    </div>
                )}

                {/* Harga (Sejajar menyamping sesuai mockup) */}
                <div className="flex items-center gap-3 mb-5 mt-auto">
                    {originalPrice && Number(originalPrice) > Number(price) && (
                        <p className="text-[11px] text-[#E51B22] line-through font-semibold">
                            IDR {Number(originalPrice).toLocaleString("id-ID")}
                        </p>
                    )}
                    <p className="font-bold text-[#FF8906] text-lg tracking-tight">
                        IDR {Number(price).toLocaleString("id-ID")}
                    </p>
                </div>

                {/* Action Buttons (Proporsional sesuai mockup) */}
                <div className="flex items-center gap-2">
                    <Link to={`/details-product/${id}`} className="grow">
                        <button className="w-full bg-[#FF8906] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition text-sm cursor-pointer shadow-sm">
                            Buy
                        </button>
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="p-2.5 border border-[#FF8906] text-[#FF8906] rounded-md hover:bg-orange-50 transition cursor-pointer shrink-0"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
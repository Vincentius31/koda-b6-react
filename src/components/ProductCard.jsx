import { ShoppingCart, Star } from "lucide-react"; // Tambah Star untuk rating
import { PrimaryButton } from "./PrimaryButton";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({
    id,
    name,
    src,
    description,
    price,        
    originalPrice, 
    rating         
}) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
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
        <div className="relative bg-transparent h-full">
            {/* Image Container */}
            <div className="w-full aspect-square overflow-hidden rounded-sm">
                <img src={src} alt={name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
            </div>

            <div className="relative -mt-25 mx-3 bg-white shadow-lg p-8 flex flex-col h-full min-h-70">
                <h3 className="font-semibold text-base mb-1 line-clamp-1">{name}</h3>

                {/* Rating (Hanya tampil jika ada data rating) */}
                {rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                        <span className="text-[10px] font-bold text-gray-600">{rating.toFixed(1)}</span>
                    </div>
                )}

                <p className="text-sm text-gray-500 mb-3 line-clamp-2 grow">{description}</p>

                {/* Price Section */}
                <div className="mb-4">
                    {originalPrice && Number(originalPrice) > Number(price) && (
                        <p className="text-[10px] text-red-500 line-through">
                            IDR {Number(originalPrice).toLocaleString("id-ID")}
                        </p>
                    )}
                    <p className="font-bold text-[#FF8906] text-xl">
                        IDR {Number(price).toLocaleString("id-ID")}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-auto">
                    <Link to={`/details-product/${id}`} className="w-full">
                        <PrimaryButton>Buy</PrimaryButton>
                    </Link>

                    <button
                        onClick={handleAddToCart}
                        className="border border-orange-500 text-orange-500 bg-white p-3 rounded-lg hover:bg-orange-50 transition cursor-pointer"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
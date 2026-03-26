import { ShoppingCart, Star } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({
    id,
    name,
    src,
    description,
    price,         // Harga yang harus dibayar
    originalPrice, // Opsional: Untuk harga sebelum diskon
    rating         // Opsional: Untuk bintang
}) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Mencegah Link ikut terklik
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
        <div className="relative bg-transparent">
            {/* Image Section */}
            <div className="w-full aspect-square overflow-hidden rounded-sm">
                <img src={src} alt={name} className="w-full h-full object-cover" />
            </div>

            <div className="relative -mt-25 mx-3 bg-white shadow-lg p-8">
                <h3 className="font-semibold text-base mb-1 truncate">{name}</h3>

                {/* Rating (Hanya muncul jika ada data) */}
                {rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                        <span className="text-[10px] font-bold text-gray-600">{rating.toFixed(1)}</span>
                    </div>
                )}

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{description}</p>

                {/* Section Harga */}
                <div className="mb-4">
                    {/* Harga Coret (Jika ada diskon) */}
                    {originalPrice && Number(originalPrice) > Number(price) && (
                        <p className="text-[10px] text-red-500 line-through">
                            IDR {Number(originalPrice).toLocaleString("id-ID")}
                        </p>
                    )}
                    <p className="font-bold text-[#FF8906] text-xl">
                        IDR {Number(price).toLocaleString("id-ID")}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Link to={`/details-product/${id}`} className="w-full">
                        <PrimaryButton>Buy</PrimaryButton>
                    </Link>

                    <button
                        onClick={handleAddToCart}
                        className="border border-orange-500 text-orange-500 bg-white p-3 rounded-lg hover:bg-orange-50 transition mt-6 cursor-pointer"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
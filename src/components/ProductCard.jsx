import { ShoppingCart } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({
    id,
    name,
    src,
    description,
    price
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
        <div className="relative bg-transparent">
            <div className="w-full aspect-square overflow-hidden">
                <img src={src} alt={name} className="w-full h-full object-cover" />
            </div>

            <div className="relative -mt-25 mx-3 bg-white shadow-lg p-8">
                <h3 className="font-semibold text-base mb-1">{name}</h3>
                <p className="text-sm text-gray-500 mb-3">{description}</p>
                <p className="font-bold mb-4 text-[#FF8906] text-xl">
                    Rp {Number(price).toLocaleString("id-ID")}
                </p>

                <div className="flex items-center gap-2">
                    <Link to={`/details-product/${id}`} className="w-full">
                        <PrimaryButton>Buy</PrimaryButton>
                    </Link>

                    <button
                        onClick={handleAddToCart}
                        className="border border-orange-500 text-orange-500 bg-white p-3 rounded-lg hover:bg-orange-50 transition mt-6"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
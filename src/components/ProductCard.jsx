import { ShoppingCart } from "lucide-react"
import { PrimaryButton } from "./PrimaryButton"
import { Link } from "react-router-dom";

export default function ProductCard({ name, src, description, price }) {
    return (
        <div className="relative bg-transparent">
            <div className="w-full aspect-square overflow-hidden">
                <img src={src} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="relative -mt-[65px] mx-3 bg-white shadow-lg p-3">

                <h3 className="font-semibold text-xl mb-1">
                    {name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                    {description}
                </p>

                <p className="font-bold mb-4 text-[#FF8906] text-xl">
                    {price}
                </p>
                <div className="flex items-center gap-2">
                    <Link to={"/checkout-product"} className="w-full"><PrimaryButton>Buy</PrimaryButton></Link>
                    <Link to={"/details-product"}><button
                        className="border border-orange-500 text-orange-500 bg-white p-3 rounded-lg hover:bg-orange-50 transition mt-6 ">
                        <ShoppingCart className="w-5 h-5" />
                    </button></Link>
                </div>
            </div>
        </div>
    )
}

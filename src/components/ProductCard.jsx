import { ShoppingCart } from "lucide-react"
import { PrimaryButton } from "./PrimaryButton"
import { Link } from "react-router-dom";

export default function ProductCard({ id, product, name, src, description, price }) {
    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (!user) {
            alert("Please login first")
            return
        }

        const cartKey = `cart_${user.email}`
        const existingCart = JSON.parse(localStorage.getItem(cartKey)) || []

        const newItem = {
            productId: id,
            name,
            price,
            qty: 1,
            product
        }

        const updatedCart = [...existingCart, newItem]

        localStorage.setItem(cartKey, JSON.stringify(updatedCart))

        alert(`✅ Product berhasil ditambahkan ke cart\n🛒 Total item di cart: ${updatedCart.length}`)
    }


    return (
        <div className="relative bg-transparent">
            <div className="w-full aspect-square overflow-hidden">
                <img src={src} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="relative -mt-25 mx-3 bg-white shadow-lg p-8">

                <h3 className="font-semibold text-base mb-1">
                    {name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                    {description}
                </p>

                <p className="font-bold mb-4 text-[#FF8906] text-xl">
                    {price}
                </p>
                <div className="flex items-center gap-2">
                    <Link to={`/details-product/${id}`} className="w-full"><PrimaryButton>Buy</PrimaryButton></Link>
                    <button
                        onClick={handleAddToCart}
                        className="border border-orange-500 text-orange-500 bg-white p-3 rounded-lg hover:bg-orange-50 transition mt-6"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

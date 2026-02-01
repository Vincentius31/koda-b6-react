import React, { useState } from 'react'
import { PrimaryButton } from './PrimaryButton'
import { Link, useNavigate } from "react-router-dom";

export default function ProductInfo({ name, priceNormal, priceDiscount, descriptionProduct, }) {
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("Regular")
    const [temperature, setTemperature] = useState("Ice")

    const orderData = {
        name,
        priceNormal,
        priceDiscount,
        descriptionProduct,
        quantity,
        size,
        temperature
    }

    const handleBuy = () => {
        navigate("/checkout-product", {
            state: { order: orderData }
        })
    }

    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (!user) {
            alert("Please login first")
            return
        }

        const cartKey = `cart_${user.email}`
        const existingCart = JSON.parse(localStorage.getItem(cartKey)) || []

        const newItem = {
            ...orderData,
            qty: quantity
        }

        localStorage.setItem(
            cartKey,
            JSON.stringify([...existingCart, newItem])
        )

        alert(`✅ Product added to cart! Total item: ${existingCart.length + 1}`)
    }

    return (
        <div className='ml-8 mt-20'>
            <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full mb-3">
                FLASH SALE!
            </span>

            <h1 className="text-3xl font-semibold mb-2">
                {name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-gray-400 line-through text-sm">
                    {priceNormal}
                </span>
                <span className="text-orange-500 text-2xl font-semibold">
                    {priceDiscount}
                </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 text-sm">
                <div className="text-orange-400">★★★★★</div>
                <span className="text-gray-600">5.0</span>
                <span className="text-gray-400">| 200+ Review</span>
                <span className="text-orange-500">Recommendation 👍</span>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {descriptionProduct}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded border border-[#FF8906]">-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded bg-[#FF8906]">+</button>
            </div>

            {/* Size */}
            <div className="mb-6">
                <p className="font-medium mb-2">Choose Size</p>
                <div className="flex gap-3">
                    {["Regular", "Medium", "Large"].map(item => (
                        <button
                            key={item}
                            onClick={() => setSize(item)}
                            className={`px-5 py-2 rounded border ${size === item
                                ? "border-orange-500 text-orange-500"
                                : "text-gray-500"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hot / Ice */}
            <div className="mb-8">
                <p className="font-medium mb-2">Hot / Ice?</p>
                <div className="flex gap-3">
                    {["Ice", "Hot"].map(item => (
                        <button
                            key={item}
                            onClick={() => setTemperature(item)}
                            className={`px-8 py-2 rounded border ${temperature === item
                                ? "border-orange-500 text-orange-500"
                                : "text-gray-500"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <div className="w-60">
                    <PrimaryButton onClick={handleBuy}>
                        Buy
                    </PrimaryButton>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="mt-6 border border-orange-500 text-orange-500 px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-orange-50"
                >
                    🛒 Add to cart
                </button>
            </div>
        </div>
    )
}

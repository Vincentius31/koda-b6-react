import React from 'react'
import { PrimaryButton } from './PrimaryButton'
import { Link } from "react-router-dom";

export default function ProductInfo({name, priceNormal, priceDiscount, descriptionProduct, }) {
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
                <button className="w-8 h-8 rounded border border-[#FF8906]">-</button>
                <span>1</span>
                <button className="w-8 h-8 rounded bg-[#FF8906]">+</button>
            </div>

            {/* Size */}
            <div className="mb-6">
                <p className="font-medium mb-2">Choose Size</p>
                <div className="flex gap-3">
                    <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded">
                        Regular
                    </button>
                    <button className="border px-5 py-2 rounded text-gray-500">
                        Medium
                    </button>
                    <button className="border px-5 py-2 rounded text-gray-500">
                        Large
                    </button>
                </div>
            </div>

            {/* Hot / Ice */}
            <div className="mb-8">
                <p className="font-medium mb-2">Hot / Ice?</p>
                <div className="flex gap-3">
                    <button className="border border-orange-500 text-orange-500 px-8 py-2 rounded">
                        Ice
                    </button>
                    <button className="border px-8 py-2 rounded text-gray-500">
                        Hot
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <Link to={"/checkout-product"} className='w-60'><PrimaryButton>Buy</PrimaryButton></Link>
                <Link to={"/checkout-product"} className='mt-6'><button className="border border-orange-500 text-orange-500 px-8 py-3 rounded-lg flex items-center gap-2">
                    🛒 Add to cart
                </button></Link>
                
                
            </div>
        </div>
    )
}

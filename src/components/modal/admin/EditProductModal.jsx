import React from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';

export default function EditProductModal({ isOpen, onClose, productData }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-150 p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute right-6 top-6 transition-transform hover:scale-110">
                    <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-8">Edit Product</h2>

                <div className="space-y-5">
                    {/* Photo Section with Existing Images */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>
                        <div className="flex gap-4">
                            <img src="/hazelnut-1.png" className="w-16 h-16 rounded-xl object-cover" alt="prev" />
                            <img src="/hazelnut-2.png" className="w-16 h-16 rounded-xl object-cover" alt="prev" />
                            <div className="relative">
                                <img src="/hazelnut-3.png" className="w-16 h-16 rounded-xl object-cover" alt="prev" />
                                <div className="absolute -top-1 -right-10 bg-red-50 p-2 rounded-full cursor-pointer border border-red-100">
                                    <Trash2 size={12} className="text-red-500" />
                                </div>
                            </div>
                        </div>
                        <button className="bg-[#FF8A00] text-black px-8 py-2 rounded-lg text-xs font-bold mt-1">
                            Upload
                        </button>
                    </div>

                    {/* Product Name */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Product name</label>
                        <input type="text" defaultValue="Hazelnut Latte" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Price</label>
                        <input type="text" defaultValue="40.000" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                        <textarea rows="5" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none leading-relaxed">
                            Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.
                        </textarea>
                    </div>

                    {/* Size Section (Selected) */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#1F2937]">Product Size</label>
                        <div className="flex gap-3">
                            {['R', 'L', 'XL'].map((size) => (
                                <button key={size} className="px-8 py-2 bg-[#FF8A00] text-black rounded-xl text-sm font-bold">
                                    {size}
                                </button>
                            ))}
                            {['250 gr', '500gr'].map((size) => (
                                <button key={size} className="px-5 py-2 border border-gray-200 rounded-xl text-sm text-black">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stock Section */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Stock</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none bg-white">
                                <option>200 Stock</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    <button className="w-full bg-[#FF8A00] text-black py-4 rounded-lg font-bold text-sm shadow-lg shadow-orange-200 mt-2 hover:bg-orange-600 transition-all">
                        Edit Save
                    </button>
                </div>
            </div>
        </div>
    )
}

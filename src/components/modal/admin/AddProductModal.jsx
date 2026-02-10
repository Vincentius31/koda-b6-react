import React from 'react';
import { X, Image as ImageIcon, ChevronDown } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose }) {
    return (
        <>
            <div
                className={`fixed inset-0 z-60 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <div className={`fixed right-0 top-0 h-full w-full max-w-125 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="h-full overflow-y-auto p-8 relative custom-scrollbar">
                    <button onClick={onClose} className="absolute right-6 top-6 transition-transform hover:scale-110">
                        <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Add Product</h2>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>
                            <div className="flex gap-4">
                                <img src="/hazelnut-1.png" className="w-16 h-16 rounded-xl object-cover" alt="prev" />
                            </div>
                            <button className="bg-[#FF8A00] text-black px-8 py-2 rounded-lg text-xs font-bold mt-1">
                                Upload
                            </button>
                        </div>

                        {/* Product Name */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Product name</label>
                            <input type="text" placeholder="Enter Product Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Price</label>
                            <input type="text" placeholder="Enter Product Price" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                            <textarea rows="5" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none leading-relaxed">
                                Enter Product Description 
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
                                    <button key={size} className="px-5 py-2 border border-gray-200 rounded-xl text-sm text-gray-500">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stock Section */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Stock</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none bg-white font-medium">
                                    <option>50 Stock</option>
                                    <option>100 Stock</option>
                                    <option>150 Stock</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        <button className="w-full bg-[#FF8A00] text-black py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 mt-2 hover:bg-orange-600 transition-all">
                            Edit Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react';
import { X, Image as ImageIcon, ChevronDown } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-150 p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                {/* Tombol Close sesuai gambar */}
                <button onClick={onClose} className="absolute right-6 top-6 transition-transform hover:scale-110">
                    <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-8">Add Product</h2>

                <div className="space-y-5">
                    {/* Photo Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>
                        <div className="w-20 h-20 bg-[#E5E7EB] rounded-xl flex items-center justify-center text-gray-500">
                            <ImageIcon size={32} />
                        </div>
                        <button className="bg-[#FF8A00] text-black px-8 py-2 rounded-lg text-xs font-bold hover:bg-orange-600">
                            Upload
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Product name</label>
                        <input type="text" placeholder="Enter Product Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Price</label>
                        <input type="text" placeholder="Enter Product Price" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                        <textarea rows="4" placeholder="Enter Product Description" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"></textarea>
                    </div>

                    {/* Size Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-[#1F2937]">Product Size</label>
                        <div className="flex gap-3">
                            {['R', 'L', 'XL', '250 gr', '500gr'].map((size) => (
                                <button key={size} className="px-5 py-2 border border-gray-200 rounded-xl text-sm text-gray-400 hover:border-orange-500">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stock Section */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#1F2937]">Stock</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-400 appearance-none focus:outline-none bg-white">
                                <option>Enter Product Stock</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    <button className="w-full bg-[#FF8A00] text-black py-4 rounded-lg font-bold text-sm shadow-lg shadow-orange-200 mt-2 hover:bg-orange-600">
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    )
}

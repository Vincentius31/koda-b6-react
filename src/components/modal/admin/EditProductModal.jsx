import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';

export default function EditProductModal({ isOpen, onClose, productData, onSave }) {
    const [formData, setFormData] = useState({
        nameProduct: "",
        priceProduct: 0,
        description: "",
        stock: 0,
        size: [],
        imageProduct: []
    });

    useEffect(() => {
        if (productData) {
            setFormData(productData);
        }
    }, [productData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "priceProduct" || name === "stock" ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <>
            <div className={`fixed inset-0 z-60 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

            <div className={`fixed right-0 top-0 h-full w-full max-w-125 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full overflow-y-auto p-8 relative custom-scrollbar">
                    <button onClick={onClose} className="absolute right-6 top-6 transition-transform hover:scale-110">
                        <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Edit Product</h2>

                    <div className="space-y-5">
                        {/* Photo Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>
                            <div className="flex flex-wrap gap-4">
                                {formData.imageProduct?.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={img}
                                            className="w-20 h-20 rounded-xl object-cover bg-gray-100 border border-gray-100"
                                            alt={`product-${idx}`}
                                        />
                                        <button
                                            onClick={() => {
                                                const newImages = formData.imageProduct.filter((_, i) => i !== idx);
                                                setFormData({ ...formData, imageProduct: newImages });
                                            }}
                                            className="absolute -top-2 -right-2 bg-white shadow-md p-1.5 rounded-full hover:bg-red-50 transition-colors border border-red-100 group-hover:scale-110"
                                            title="Delete Photo"
                                        >
                                            <Trash2 size={14} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}

                                {formData.imageProduct?.length === 0 && (
                                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-[10px] text-center px-2">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <button className="bg-[#FF8A00] text-black px-8 py-2 rounded-lg text-xs font-bold mt-1 hover:bg-orange-400 transition-colors">
                                Upload New
                            </button>
                        </div>

                        {/* Product Name */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Product name</label>
                            <input
                                type="text"
                                name="nameProduct"
                                value={formData.nameProduct}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Price (IDR)</label>
                            <input
                                type="number"
                                name="priceProduct"
                                value={formData.priceProduct}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                            <textarea
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none leading-relaxed"
                            />
                        </div>

                        {/* Size Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Product Size</label>
                            <div className="flex flex-wrap gap-3">
                                {['R', 'L', 'XL', '250 gr', '500 gr'].map((size) => (
                                    <button
                                        key={size}
                                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${formData.size?.includes(size) ? 'bg-[#FF8A00] text-black' : 'border border-gray-200 text-gray-500'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stock Section */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Stock</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#FF8A00] text-black py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 mt-2 hover:bg-orange-600 transition-all"
                        >
                            Edit Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
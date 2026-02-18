import React, { useState, useRef } from 'react';
import { X, Trash2, Link, Upload } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onSave }) {
    const initialState = {
        nameProduct: "",
        priceProduct: 0,
        priceDiscount: 0,
        description: "",
        stock: 0,
        size: [],
        temp: [],
        method: [],
        imageProduct: [],
        category: "Coffee",
        rating: 5.0,
        sales: 0,
        statusFavourite: false,
        promoType: "New Arrival"
    };

    const [formData, setFormData] = useState(initialState);
    const [imageUrlInput, setImageUrlInput] = useState("");
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "priceProduct" || name === "priceDiscount" || name === "stock"
                ? parseInt(value) || 0
                : value
        }));
    };

    const handleAddImageViaLink = (e) => {
        e.preventDefault();
        if (imageUrlInput.trim() !== "") {
            setFormData(prev => ({
                ...prev,
                imageProduct: [...prev.imageProduct, imageUrlInput.trim()]
            }));
            setImageUrlInput("");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                imageProduct: [...prev.imageProduct, localUrl]
            }));
        }
    };

    const toggleOption = (field, value) => {
        setFormData(prev => {
            const currentOptions = prev[field] || [];
            const newOptions = currentOptions.includes(value)
                ? currentOptions.filter(item => item !== value)
                : [...currentOptions, value];
            return { ...prev, [field]: newOptions };
        });
    };

    const handleSave = () => {
        if (!formData.nameProduct || formData.imageProduct.length === 0) {
            alert("Please fill in the product name and add at least one image!");
            return;
        }

        onSave(formData);

        // Reset Form ke awal
        setFormData(initialState);
        alert("Product Added Successfully!");
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-60 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Modal */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-125 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full overflow-y-auto p-8 relative custom-scrollbar">
                    <button onClick={onClose} className="absolute right-6 top-6 transition-transform hover:scale-110">
                        <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Add New Product</h2>

                    <div className="space-y-5">
                        {/* PHOTO SECTION */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>

                            {/* Preview Images */}
                            <div className="flex flex-wrap gap-4 mb-2">
                                {formData.imageProduct.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img src={img} className="w-20 h-20 rounded-xl object-cover border border-gray-100" alt="prev" />
                                        <button
                                            onClick={() => setFormData({ ...formData, imageProduct: formData.imageProduct.filter((_, i) => i !== idx) })}
                                            className="absolute -top-2 -right-2 bg-white shadow-md p-1 rounded-full hover:bg-red-50"
                                        >
                                            <Trash2 size={12} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Upload Options */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Paste image URL..."
                                        value={imageUrlInput}
                                        onChange={(e) => setImageUrlInput(e.target.value)}
                                        className="flex-1 px-3 py-2 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button type="button" onClick={handleAddImageViaLink} className="bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors">Add</button>
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400 py-1">
                                    <span className="bg-gray-50 px-2 z-10">OR</span>
                                    <div className="absolute top-1/2 left-0 w-full border-t border-gray-200"></div>
                                </div>
                                <button type="button" onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">
                                    <Upload size={14} /> From Device
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-[#1F2937]">Product Name</label>
                                <input
                                    type="text"
                                    name="nameProduct"
                                    value={formData.nameProduct}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-[#1F2937]">Normal Price</label>
                                    <input type="number" name="priceProduct" value={formData.priceProduct} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-[#1F2937]">Discount Price</label>
                                    <input type="number" name="priceDiscount" value={formData.priceDiscount} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:ring-1 focus:ring-orange-500 leading-relaxed"
                                placeholder="Enter Product Description"
                            />
                        </div>

                        {/* Multi-Select Sections */}
                        <div className="space-y-4">
                            {/* Size Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1F2937]">Product Size</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Regular', 'Medium', 'Large', '250 gr', '500 gr'].map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => toggleOption('size', s)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.size.includes(s) ? 'bg-orange-500 text-white' : 'border border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                                        >
                                            {s === "Regular" ? "R" : s === "Medium" ? "M" : s === "Large" ? "L" : s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Temp Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1F2937]">Temperature</label>
                                <div className="flex gap-2">
                                    {['Ice', 'Hot'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => toggleOption('temp', t)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.temp.includes(t) ? 'bg-orange-500 text-white' : 'border border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Method Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1F2937]">Method</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Dine In', 'Door Delivery', 'Pick Up'].map(m => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => toggleOption('method', m)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.method.includes(m) ? 'bg-orange-500 text-white' : 'border border-gray-200 text-gray-400 hover:bg-gray-50'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Stock Amount</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSave}
                            className="w-full bg-[#FF8A00] text-black py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 mt-4 hover:bg-orange-600 transition-all active:scale-[0.98]"
                        >
                            Save Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
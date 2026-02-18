import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Link, Upload } from 'lucide-react';

export default function EditProductModal({ isOpen, onClose, productData, onSave }) {
    const [formData, setFormData] = useState({
        nameProduct: "",
        priceProduct: 0,
        priceDiscount: 0,
        description: "",
        stock: 0,
        size: [],
        temp: [],
        method: [],
        imageProduct: [],
        category: "",
        rating: 0    
    });

    const [imageUrlInput, setImageUrlInput] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (productData) {
            setFormData(productData);
        }
    }, [productData, isOpen]);

    if (!isOpen) return null;

    const handleAddImageViaLink = () => {
        if (imageUrlInput.trim() !== "") {
            setFormData(prev => ({
                ...prev,
                imageProduct: [...prev.imageProduct, imageUrlInput]
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "priceProduct" || name === "stock" ? parseInt(value) || 0 : value
        }));
    };

    const handleSizeToggle = (sizeName) => {
        setFormData(prev => {
            const currentSizes = prev.size || [];
            const newSizes = currentSizes.includes(sizeName)
                ? currentSizes.filter(s => s !== sizeName)
                : [...currentSizes, sizeName];
            return { ...prev, size: newSizes };
        });
    };

    const handleTempToggle = (tempValue) => {
        setFormData(prev => {
            const currentTemps = prev.temp || [];
            const newTemps = currentTemps.includes(tempValue)
                ? currentTemps.filter(t => t !== tempValue)
                : [...currentTemps, tempValue];
            return { ...prev, temp: newTemps };
        });
    };

    const handleMethodToggle = (methodValue) => {
        setFormData(prev => {
            const currentMethods = prev.method || [];
            const newMethods = currentMethods.includes(methodValue)
                ? currentMethods.filter(m => m !== methodValue)
                : [...currentMethods, methodValue];
            return { ...prev, method: newMethods };
        });
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
                        {/* PHOTO SECTION UPDATED */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>

                            {/* Preview Foto */}
                            <div className="flex flex-wrap gap-4 mb-4">
                                {formData.imageProduct?.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img src={img} className="w-20 h-20 rounded-xl object-cover bg-gray-100 border border-gray-100" alt="prev" />
                                        <button
                                            onClick={() => {
                                                const newImages = formData.imageProduct.filter((_, i) => i !== idx);
                                                setFormData({ ...formData, imageProduct: newImages });
                                            }}
                                            className="absolute -top-2 -right-2 bg-white shadow-md p-1.5 rounded-full hover:bg-red-50 border border-red-100"
                                        >
                                            <Trash2 size={12} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Pilihan Upload: Link & File */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                {/* Option 1: URL Link */}
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase">Option 1: Image URL</p>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Paste image link here..."
                                                value={imageUrlInput}
                                                onChange={(e) => setImageUrlInput(e.target.value)}
                                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none"
                                            />
                                            <Link size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                        </div>
                                        <button
                                            onClick={handleAddImageViaLink}
                                            className="bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div className="relative py-1">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-gray-50 px-2 text-gray-400 font-bold">OR</span></div>
                                </div>

                                {/* Option 2: File Upload */}
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase">Option 2: From Device</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors"
                                    >
                                        <Upload size={14} />
                                        Choose File
                                    </button>
                                </div>
                            </div>
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
                                {['Regular', 'Medium', 'Large', '250 gr', '500 gr'].map((sizeItem) => (
                                    <button
                                        key={sizeItem}
                                        type="button"
                                        onClick={() => handleSizeToggle(sizeItem)}
                                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${formData.size?.includes(sizeItem)
                                            ? 'bg-[#FF8A00] text-black shadow-sm border-[#FF8A00]'
                                            : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {sizeItem === "Regular" ? "R" : sizeItem === "Medium" ? "M" : sizeItem === "Large" ? "L" : sizeItem}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Temp Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Temperature Options</label>
                            <div className="flex gap-3">
                                {['Ice', 'Hot'].map((tempItem) => (
                                    <button
                                        key={tempItem}
                                        type="button"
                                        onClick={() => handleTempToggle(tempItem)}
                                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${formData.temp?.includes(tempItem)
                                            ? 'bg-[#FF8A00] text-black shadow-sm border-[#FF8A00]'
                                            : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {tempItem}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Method Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Delivery Method Options</label>
                            <div className="flex flex-wrap gap-3">
                                {['Dine In', 'Door Delivery', 'Pick Up'].map((methodItem) => (
                                    <button
                                        key={methodItem}
                                        type="button"
                                        onClick={() => handleMethodToggle(methodItem)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${formData.method?.includes(methodItem)
                                            ? 'bg-[#FF8A00] text-black shadow-sm border-[#FF8A00]'
                                            : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {methodItem}
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
import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Link, Upload, ChevronDown } from 'lucide-react';

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
        category: "Coffee",
        promoType: ""
    });

    const [imageUrlInput, setImageUrlInput] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (productData && isOpen) {
            setFormData({
                id: productData.id || productData.id_product,
                nameProduct: productData.nameProduct || "",
                priceProduct: productData.priceProduct || 0,
                priceDiscount: productData.priceDiscount || 0,
                description: productData.description || "",
                stock: productData.stock || 0,
                size: productData.size || [],
                temp: productData.temp || [],
                method: productData.method || [],
                imageProduct: productData.imageProduct || [],
                category: productData.category || "Coffee",
                promoType: productData.promoType || ""
            });
        }
    }, [productData, isOpen]);

    if (!isOpen) return null;

    const handleAddImageViaLink = () => {
        if (imageUrlInput.trim() !== "") {
            setFormData(prev => ({ ...prev, imageProduct: [...prev.imageProduct, imageUrlInput] }));
            setImageUrlInput("");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, imageProduct: [...prev.imageProduct, localUrl] }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "priceProduct" || name === "priceDiscount" || name === "stock" ? parseInt(value) || 0 : value
        }));
    };

    const handleToggle = (field, value) => {
        setFormData(prev => {
            const currentArray = prev[field] || [];
            const newArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value];
            return { ...prev, [field]: newArray };
        });
    };

    const handleSubmit = () => {
        if (!formData.nameProduct || formData.priceProduct <= 0) {
            alert("Name and valid price are required.");
            return;
        }
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
                        {/* PHOTO SECTION */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>

                            <div className="flex flex-wrap gap-4 mb-4">
                                {formData.imageProduct?.map((img, idx) => (
                                    <div key={idx} className="relative group">
                                        <img src={img} className="w-20 h-20 rounded-xl object-cover bg-gray-100 border border-gray-100" alt="prev" />
                                        <button onClick={() => setFormData({ ...formData, imageProduct: formData.imageProduct.filter((_, i) => i !== idx) })} className="absolute -top-2 -right-2 bg-white shadow-md p-1.5 rounded-full hover:bg-red-50 border border-red-100">
                                            <Trash2 size={12} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase">Option 1: Image URL</p>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input type="text" placeholder="Paste image link here..." value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none" />
                                            <Link size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                        </div>
                                        <button onClick={handleAddImageViaLink} className="bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors">Add</button>
                                    </div>
                                </div>
                                <div className="relative py-1">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-gray-50 px-2 text-gray-400 font-bold">OR</span></div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase">Option 2: From Device</p>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                    <button onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">
                                        <Upload size={14} /> Choose File
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* BASIC INFO */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Product name</label>
                            <input type="text" name="nameProduct" value={formData.nameProduct} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none bg-white focus:ring-1 focus:ring-orange-500">
                                <option value="Coffee">Coffee</option>
                                <option value="Non Coffee">Non Coffee</option>
                                <option value="Food">Food</option>
                                <option value="Add-On">Add-On</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-[#1F2937]">Normal Price </label>
                                <input type="number" name="priceProduct" value={formData.priceProduct} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-[#1F2937]">Discount Price</label>
                                <input type="number" name="priceDiscount" value={formData.priceDiscount} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Promo Type</label>
                            <div className="relative">
                                <select name="promoType" value={formData.promoType || ""} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
                                    <option value="">No Promo</option>
                                    <option value="New Arrival">New Arrival</option>
                                    <option value="Flash Sale">Flash Sale</option>
                                    <option value="Buy 1 Get 1">Buy 1 Get 1</option>
                                    <option value="Cheap">Cheap</option>
                                    <option value="Birthday Package">Birthday Package</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none leading-relaxed" />
                        </div>

                        {/* OPTIONS ARRAY */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Product Size</label>
                            <div className="flex flex-wrap gap-3">
                                {['Regular', 'Medium', 'Large', '250 gr', '500 gr'].map(s => (
                                    <button key={s} type="button" onClick={() => handleToggle('size', s)} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${formData.size?.includes(s) ? 'bg-[#FF8A00] text-black shadow-sm border-[#FF8A00]' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        {s === "Regular" ? "R" : s === "Medium" ? "M" : s === "Large" ? "L" : s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Temperature</label>
                            <div className="flex gap-3">
                                {['Ice', 'Hot'].map(t => (
                                    <button key={t} type="button" onClick={() => handleToggle('temp', t)} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${formData.temp?.includes(t) ? 'bg-[#FF8A00] text-black shadow-sm border-[#FF8A00]' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-[#1F2937]">Method</label>
                            <div className="flex flex-wrap gap-3">
                                {['Dine In', 'Door Delivery', 'Pick Up'].map(m => (
                                    <button key={m} type="button" onClick={() => handleToggle('method', m)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${formData.method?.includes(m) ? 'bg-[#FF8A00] text-black shadow-sm border-[#FF8A00]' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        <button onClick={handleSubmit} className="w-full bg-[#FF8A00] text-black py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 mt-2 hover:bg-orange-600 transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
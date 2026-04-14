import React, { useState, useRef, useEffect } from 'react';
import { X, Trash2, Upload, ChevronDown } from 'lucide-react';

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
        category: "Coffee",
        promoType: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setFormData(initialState);
            setImageFiles([]);
            setImagePreviews([]);
        }
    }, [isOpen]);

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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImageFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
        e.target.value = null;
    };

    const handleRemoveImage = (indexToRemove) => {
        setImageFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
        setImagePreviews(prev => prev.filter((_, idx) => idx !== indexToRemove));
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
        if (!formData.nameProduct || formData.priceProduct <= 0) {
            alert("Please fill in the product name and a valid price!");
            return;
        }

        const submitData = new FormData();

        submitData.append("nameProduct", formData.nameProduct);
        submitData.append("description", formData.description);
        submitData.append("category", formData.category);
        submitData.append("promoType", formData.promoType);
        submitData.append("priceProduct", formData.priceProduct);
        submitData.append("priceDiscount", formData.priceDiscount);
        submitData.append("stock", formData.stock);

        formData.size.forEach(s => submitData.append("size", s));
        formData.temp.forEach(t => submitData.append("temp", t));
        formData.method.forEach(m => submitData.append("method", m));

        // Append File Gambar
        imageFiles.forEach(file => {
            submitData.append("images", file); 
        });

        onSave(submitData);
    };

    return (
        <>
            <div className={`fixed inset-0 z-60 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

            <div className={`fixed right-0 top-0 h-full w-full max-w-125 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full overflow-y-auto p-8 relative custom-scrollbar">
                    <button onClick={onClose} className="absolute right-6 top-6 transition-transform hover:scale-110">
                        <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Add New Product</h2>

                    <div className="space-y-5">
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-[#1F2937]">Photo Product</label>

                            <div className="flex flex-wrap gap-4 mb-2">
                                {imagePreviews.map((imgSrc, idx) => (
                                    <div key={idx} className="relative group">
                                        <img src={imgSrc} className="w-20 h-20 rounded-xl object-cover border border-gray-100" alt="prev" />
                                        <button onClick={() => handleRemoveImage(idx)} className="absolute -top-2 -right-2 bg-white shadow-md p-1 rounded-full hover:bg-red-50">
                                            <Trash2 size={12} className="text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase">Upload From Device</p>
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">
                                        <Upload size={16} /> Choose Image Files
                                    </button>
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" multiple />
                                </div>
                            </div>
                        </div>

                        {/* BASIC INFO */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-bold text-[#1F2937]">Product Name</label>
                                <input type="text" name="nameProduct" value={formData.nameProduct} onChange={handleChange} placeholder="Enter Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
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
                                    <label className="block text-sm font-bold text-[#1F2937]">Normal Price</label>
                                    <input type="number" name="priceProduct" value={formData.priceProduct} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-[#1F2937]">Discount Price</label>
                                    <input type="number" name="priceDiscount" value={formData.priceDiscount} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Promo Type</label>
                            <div className="relative">
                                <select name="promoType" value={formData.promoType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none bg-white font-medium focus:ring-1 focus:ring-orange-500">
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

                        {/* DESCRIPTION */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:ring-1 focus:ring-orange-500 leading-relaxed" placeholder="Enter Product Description" />
                        </div>

                        {/* MULTI-SELECT SECTIONS */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1F2937]">Product Size</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Regular', 'Medium', 'Large', '250 gr', '500 gr'].map(s => (
                                        <button key={s} type="button" onClick={() => toggleOption('size', s)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.size.includes(s) ? 'bg-orange-500 text-white' : 'border border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                                            {s === "Regular" ? "R" : s === "Medium" ? "M" : s === "Large" ? "L" : s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1F2937]">Temperature</label>
                                <div className="flex gap-2">
                                    {['Ice', 'Hot'].map(t => (
                                        <button key={t} type="button" onClick={() => toggleOption('temp', t)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.temp.includes(t) ? 'bg-orange-500 text-white' : 'border border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-[#1F2937]">Method</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Dine In', 'Door Delivery', 'Pick Up'].map(m => (
                                        <button key={m} type="button" onClick={() => toggleOption('method', m)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.method.includes(m) ? 'bg-orange-500 text-white' : 'border border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* STOCK */}
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-[#1F2937]">Stock Amount</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-orange-500" />
                        </div>

                        <button onClick={handleSave} className="w-full bg-[#FF8A00] text-black py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 mt-4 hover:bg-orange-600 transition-all active:scale-[0.98]">
                            Save Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
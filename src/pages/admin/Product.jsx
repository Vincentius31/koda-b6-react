import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Pencil, Trash2 } from 'lucide-react';
import AddProductModal from '../../components/modal/admin/AddProductModal';
import EditProductModal from '../../components/modal/admin/EditProductModal';
import http, { BASE_URL } from '../../lib/http';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchProducts = async () => {
        try {
            const res = await http("/admin/product");
            if (res.success) {
                setProducts(res.data || []);
            }
        } catch (err) {
            console.error("Fetch gagal:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const result = products.filter(product => {
            const pName = product.nameProduct || "";
            return pName.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredProducts(result);
        setCurrentPage(1);
    }, [search, products]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah kamu yakin ingin menghapus product ini?")) return;

        try {
            const res = await http(`/admin/product/${id}`, { method: "DELETE" });
            if (res.success) {
                fetchProducts();
                alert("Product berhasil dihapus!");
            } else {
                alert("Gagal menghapus produk: " + res.message);
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleUpdateProduct = async (formData, imageFiles) => {
        const productId = formData.id;

        try {
            const res = await http(`/admin/product/${productId}`, {
                method: "PATCH",
                body: formData
            });

            if (!res.success) {
                alert("Gagal update produk: " + res.message);
                return;
            }

            if (imageFiles && imageFiles.length > 0) {
                const imgForm = new FormData();
                imageFiles.forEach(file => imgForm.append("images", file));

                const imgRes = await http(`/admin/product/${productId}/images`, {
                    method: "PATCH",
                    body: imgForm
                });

                if (!imgRes.success) {
                    alert("Data berhasil diupdate, tapi gagal upload gambar: " + imgRes.message);
                }
            }

            fetchProducts();
            setShowEditModal(false);
            alert("Product berhasil diupdate!");
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const res = await http("/admin/product", {
                method: "POST",
                body: newProduct
            });

            if (res.success) {
                fetchProducts();
                setShowAddModal(false);
                alert("Product Added Successfully!");
            } else {
                alert("Gagal menambah produk: " + res.message);
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-base text-gray-800">Product List</h2>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <button onClick={() => setShowAddModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm shadow-sm shadow-orange-200">
                    <Plus size={18} /> Add Product
                </button>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex flex-col gap-1 w-full md:w-64">
                        <label className="text-base text-gray-400">Search Product</label>
                        <div className="relative">
                            <input type="text" placeholder="Enter Product Name" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" />
                            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg mt-auto flex items-center gap-2 transition-colors">
                        <Filter size={18} /><span className="text-sm font-medium pr-1">Filter</span>
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-white border-b border-gray-50">
                            <tr className="text-gray-400 font-medium">
                                <th className="px-6 py-4 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                                <th className="px-4 py-4">Image</th>
                                <th className="px-4 py-4 min-w-37.5">Product Name</th>
                                <th className="px-4 py-4 min-w-30">Price</th>
                                <th className="px-4 py-4 min-w-30">Discount Price</th>
                                <th className="px-4 py-4 min-w-30">Promo Type</th>
                                <th className="px-4 py-4 min-w-50">Desc</th>
                                <th className="px-4 py-4 min-w-30">Product Size</th>
                                <th className="px-4 py-4 min-w-30">Temperature</th>
                                <th className="px-4 py-4 min-w-37.5">Method</th>
                                <th className="px-4 py-4">Stock</th>
                                <th className="px-4 py-4 text-center sticky right-0 bg-white">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.length > 0 ? (
                                currentItems.map((product) => {
                                    const rawSrc = product.imageProduct?.[0];
                                    const imageSrc = rawSrc
                                        ? `${rawSrc.startsWith("http") ? rawSrc : BASE_URL + rawSrc}?v=${product.updatedAt || product.id}`
                                        : "https://via.placeholder.com/40";

                                    return (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded" /></td>
                                            <td className="px-4 py-4"><img src={imageSrc} alt={product.nameProduct} className="w-10 h-10 rounded-lg object-cover bg-gray-100" /></td>
                                            <td className="px-4 py-4 font-medium text-gray-700">{product.nameProduct}</td>
                                            <td className="px-4 py-4 text-gray-600">IDR {product.priceProduct?.toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 text-gray-600">IDR {product.priceDiscount?.toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 font-medium text-gray-700">{product.promoType || '-'}</td>
                                            <td className="px-4 py-4 text-gray-400 text-[11px] leading-relaxed max-w-37.5 truncate" title={product.description}>{product.description}</td>
                                            <td className="px-4 py-4 text-gray-600">{(product.size || []).join(", ")}</td>
                                            <td className="px-4 py-4 text-gray-600">{(product.temp || []).join(", ")}</td>
                                            <td className="px-4 py-4 text-gray-600">{(product.method || []).join(", ")}</td>
                                            <td className="px-4 py-4 text-gray-600">{product.stock}</td>
                                            <td className="px-4 py-4 text-center sticky right-0 bg-white">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => handleEditClick(product)} className="p-1.5 text-orange-400 hover:bg-orange-50 rounded-md transition-colors"><Pencil size={16} /></button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="12" className="py-8 text-gray-400">Tidak ada produk ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-black border-t border-gray-50">
                    <p>Show {currentItems.length} of {filteredProducts.length} products</p>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-2 py-1 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-orange-500'}`}>Prev</button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded-md flex items-center justify-center ${currentPage === i + 1 ? 'bg-orange-500 text-white font-bold' : 'text-gray-500 hover:bg-orange-50'}`}>{i + 1}</button>
                            ))}
                        </div>
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`px-2 py-1 ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-orange-500'}`}>Next</button>
                    </div>
                </div>
            </div>

            <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleAddProduct} />
            <EditProductModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} productData={selectedProduct} onSave={handleUpdateProduct} />
        </div>
    );
}
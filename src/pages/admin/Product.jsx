import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, Pencil, Trash2 } from 'lucide-react';
import AddProductModal from '../../components/modal/admin/AddProductModal';
import EditProductModal from '../../components/modal/admin/EditProductModal';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Product() {
    const [products, setProducts] = useLocalStorage("products", []);
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (products.length > 0) return;
        const fetchData = async () => {
            try {
                const res = await fetch("https://raw.githubusercontent.com/Vincentius31/koda-b6-react/main/src/data/menu.json");
                const data = await res.json();
                setProducts(data);
            } catch (err) { console.error("Fetch gagal:", err); }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const result = products.filter(product =>
            product.nameProduct.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(result);
        setCurrentPage(1);
    }, [search, products]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleDelete = (id) => {
        if (!window.confirm("Apakah kamu yakin ingin menghapus product ini?")) return;
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleUpdateProduct = (updatedProduct) => {
        const updatedList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        setProducts(updatedList);
        setShowEditModal(false);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-base text-gray-800">Product List</h2>
            {/* Header Toolbar (Search & Add) tetap sama */}
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
                                <th className="px-4 py-4">Product Name</th>
                                <th className="px-4 py-4">Price</th>
                                <th className="px-4 py-4">Desc</th>
                                <th className="px-4 py-4">Product Size</th>
                                <th className="px-4 py-4">Temperature</th>
                                <th className="px-4 py-4">Method</th>
                                <th className="px-4 py-4">Stock</th>
                                <th className="px-4 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-4 py-4"><img src={product.imageProduct?.[0]} alt={product.nameProduct} className="w-10 h-10 rounded-lg object-cover bg-gray-100" /></td>
                                    <td className="px-4 py-4 font-medium text-gray-700">{product.nameProduct}</td>
                                    <td className="px-4 py-4 text-gray-600">IDR {product.priceProduct.toLocaleString("id-ID")}</td>
                                    <td className="px-4 py-4 text-gray-400 text-[11px] leading-relaxed max-w-37.5">{product.description}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.size.join(", ")}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.temp.join(", ")}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.method.join(", ")}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.stock}</td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleEditClick(product)} className="p-1.5 text-orange-400 hover:bg-orange-50 rounded-md transition-colors"><Pencil size={16} /></button>
                                            <button onClick={() => handleDelete(product.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls tetap sama */}
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

            <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
            <EditProductModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} productData={selectedProduct} onSave={handleUpdateProduct}/>
        </div>
    )
}
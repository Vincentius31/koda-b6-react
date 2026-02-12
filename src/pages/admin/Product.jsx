import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, Pencil, Trash2 } from 'lucide-react';
import AddProductModal from '../../components/modal/admin/AddProductModal';
import EditProductModal from '../../components/modal/admin/EditProductModal';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Product() {
    const [products, setProducts] = useLocalStorage("products", []);

    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {

        if (products.length > 0) return;

        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://raw.githubusercontent.com/Vincentius31/koda-b6-react/main/src/data/menu.json"
                );

                const data = await res.json();

                const formatted = data.map(item => ({
                    id: item.id,
                    name: item.nameProduct,
                    price: `IDR ${item.priceProduct.toLocaleString("id-ID")}`,
                    desc: item.description,
                    size: item.size.join(", "),
                    method: item.method.join(", "),
                    stock: item.stock,
                    img: item.imageProduct?.[0] || "https://via.placeholder.com/40"
                }));

                setProducts(formatted);

            } catch (err) {
                console.error("Fetch gagal:", err);
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        const result = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredProducts(result);
    }, [search, products]);


    return (
        <div className="space-y-4">
            <h2 className="text-xl font-base text-gray-800">Product List</h2>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <button onClick={() => setShowAddModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium text-sm shadow-sm shadow-orange-200">
                    <Plus size={18} />
                    Add Product
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
                        <Filter size={18} />
                        <span className="text-sm font-medium pr-1">Filter</span>
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-gray-50">
                            <tr className="text-gray-400 font-medium">
                                <th className="px-6 py-4 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                                <th className="px-4 py-4">Image</th>
                                <th className="px-4 py-4">Product Name</th>
                                <th className="px-4 py-4">Price</th>
                                <th className="px-4 py-4">Desc</th>
                                <th className="px-4 py-4">Product Size</th>
                                <th className="px-4 py-4">Method</th>
                                <th className="px-4 py-4">Stock</th>
                                <th className="px-4 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-4 py-4">
                                        <img src={product.img} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                    </td>
                                    <td className="px-4 py-4 font-medium text-gray-700">{product.name}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.price}</td>
                                    <td className="px-4 py-4 text-gray-400 text-[11px] leading-relaxed max-w-37.5">
                                        {product.desc}
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">{product.size}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.method}</td>
                                    <td className="px-4 py-4 text-gray-600">{product.stock}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => setShowEditModal(true)} className="p-1.5 text-orange-400 hover:bg-orange-50 rounded-md transition-colors">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-black border-t border-gray-50">
                    <p>Show {products.length} product</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:text-gray-600">Prev</button>
                        <span className="text-orange-500 font-bold">1</span>
                        <button className="p-1 hover:text-gray-600">Next</button>
                    </div>
                </div>
            </div>

            <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
            <EditProductModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
        </div>
    )
}

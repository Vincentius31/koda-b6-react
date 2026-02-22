import React, { useState, useEffect } from 'react';
import { Search, Filter, Pencil, Trash2, ChevronDown } from 'lucide-react';
import EditOrderModal from '../../components/modal/admin/EditOrderModal';

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchOrders = () => {
            const allOrders = JSON.parse(localStorage.getItem("all_orders")) || [];
            setOrders(allOrders.reverse());
        };
        fetchOrders();
        window.addEventListener('storage', fetchOrders);
        return () => window.removeEventListener('storage', fetchOrders);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter]);

    const handleEditClick = (order) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Hapus pesanan ini?")) {
            const allOrders = JSON.parse(localStorage.getItem("all_orders")) || [];
            const filtered = allOrders.filter(o => o.orderId !== id);
            localStorage.setItem("all_orders", JSON.stringify(filtered));
            setOrders(filtered);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'done': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-red-100 text-red-400';
            case 'on progress': return 'bg-orange-100 text-orange-400';
            default: return 'bg-gray-200 text-gray-500';
        }
    };

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order List</h2>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-end items-end gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex flex-col gap-1 md:w-64">
                        <label className="text-xs text-gray-400 font-medium">Status</label>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="min-w-64 pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 appearance-none outline-none cursor-pointer"
                            >
                                <option value="All">All Status</option>
                                <option value="Done">Done</option>
                                <option value="On Progress">On Progress</option>
                                <option value="Pending">Pending</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 flex-1 md:w-64">
                        <label className="text-xs text-gray-400 font-medium">Search Order</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter Order Number"
                                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>
                    <button className="bg-[#FF8A00] text-white p-2.5 rounded-lg mt-auto"><Filter size={18} /></button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-gray-50 uppercase text-[10px] tracking-widest text-gray-400 font-bold">
                            <tr>
                                <th className="px-6 py-4 w-12 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
                                <th className="px-4 py-4">No. Order</th>
                                <th className="px-4 py-4">Date</th>
                                <th className="px-4 py-4">Order Items</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Total</th>
                                <th className="px-4 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
                                        <td className="px-4 py-4 text-gray-500 font-medium">{order.orderId}</td>
                                        <td className="px-4 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-4">
                                            <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-0.5">
                                                {order.items.slice(0, 2).map((item, i) => (
                                                    <li key={i}>{item.name} x{item.qty}</li>
                                                ))}
                                                {order.items.length > 2 && <li>...more</li>}
                                            </ul>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 font-bold text-gray-700">IDR {order.total.toLocaleString()}</td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => handleEditClick(order)} className="p-1.5 text-orange-400 hover:bg-orange-50 rounded-md"><Pencil size={16} /></button>
                                                <button onClick={() => handleDelete(order.orderId)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-gray-400 italic">No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section (Logic Updated) */}
                <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-400 border-t border-gray-50">
                    <p>Show {currentOrders.length} Order of {filteredOrders.length} order</p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className={`p-1 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed`}
                        >
                            Prev
                        </button>
                        <div className="flex gap-4 font-medium">
                            {[...Array(totalPages)].map((_, i) => (
                                <span
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`cursor-pointer hover:text-gray-600 ${currentPage === i + 1 ? "text-[#FF8A00] font-bold" : ""}`}
                                >
                                    {i + 1}
                                </span>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-1 hover:text-gray-600 flex items-center gap-1 font-bold ml-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <EditOrderModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                orderData={selectedOrder}
            />
        </div>
    );
}
import React, { useState } from 'react';
import { Plus, Search, Filter, Pencil, Trash2, FileText, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import EditOrderModal from '../../components/modal/admin/EditOrderModal';


export default function Order() {
    const orders = [
        { id: '#12354-09893', date: '26 January 2023', items: 'Hazelnut Latte R 1x, Caramel Machiato L 1x', status: 'Done', total: 'IDR 40.000', statusColor: 'bg-green-100 text-green-600' },
        { id: '#12354-09893', date: '26 January 2023', items: 'Hazelnut Latte 1x, Caramel Machiato 1x', status: 'Pending', total: 'IDR 40.000', statusColor: 'bg-red-100 text-red-400' },
        { id: '#12354-09893', date: '26 January 2023', items: 'Hazelnut Latte 1x, Caramel Machiato 1x', status: 'On Progress', total: 'IDR 40.000', statusColor: 'bg-orange-100 text-orange-400' },
        { id: '#12354-09893', date: '26 January 2023', items: 'Hazelnut Latte 1x, Caramel Machiato 1x', status: 'Waiting', total: 'IDR 40.000', statusColor: 'bg-gray-200 text-gray-500' },
        { id: '#12354-09893', date: '26 January 2023', items: 'Hazelnut Latte 1x, Caramel Machiato 1x', status: 'On Progress', total: 'IDR 40.000', statusColor: 'bg-orange-100 text-orange-400' },
    ]

    const [isDetailOpen, setIsDetailOpen] = useState(false)

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order List</h2>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-end items-end gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Status Filter */}
                    <div className="flex flex-col gap-1 md:w-64">
                        <label className="text-xs text-gray-400 font-medium">Status</label>
                        <div className="relative">
                            <select className="min-w-64 pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 appearance-none outline-none">
                                <option>All</option>
                                <option>Done</option>
                                <option>Pending</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    {/* Search Order */}
                    <div className="flex flex-col gap-1 flex-1 md:w-64">
                        <label className="text-xs text-gray-400 font-medium">Search Order</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter Order Number"
                                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>

                    <button className="bg-[#FF8A00] text-white p-2.5 rounded-lg mt-auto">
                        <Filter size={18} />
                    </button>
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
                                <th className="px-4 py-4">Order</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Total</th>
                                <th className="px-4 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-4 py-4 text-gray-500 font-medium">{order.id}</td>
                                    <td className="px-4 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-4 py-4">
                                        <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-0.5">
                                            {order.items.split(',').map((item, i) => (
                                                <li key={i}>{item.trim()}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${order.statusColor}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 font-bold text-gray-700">{order.total}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => setIsDetailOpen(true)} className="p-1.5 text-orange-400 hover:bg-orange-50 rounded-md"><Pencil size={16} /></button>
                                            <button className="p-1.5 text-red-400 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-400 border-t border-gray-50">
                    <p>Show 5 Order of 100 order</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:text-gray-600">Prev</button>
                        <div className="flex gap-4 font-medium">
                            <span className="text-[#FF8A00] font-bold cursor-default">1</span>
                            {[2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                <span key={n} className="cursor-pointer hover:text-gray-600">{n}</span>
                            ))}
                        </div>
                        <button className="p-1 hover:text-gray-600 flex items-center gap-1 font-bold ml-2">
                            Next 
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <EditOrderModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}/>
        </div>
    )
}

import React, { useState } from 'react';
import { Plus, Search, Filter, Pencil, Trash2, FileText, ChevronDown } from 'lucide-react';

export default function User() {
    const [users] = useState([
        { id: 1, name: 'Eleanor Pena', phone: '(205) 555-0100', address: '3517 W. Gray St. Utica, Pennsylvania 57867', email: 'cikaracak@gmail.com', image: 'https://i.pravatar.cc/150?u=eleanor' },
        { id: 2, name: 'Ronald Richards', phone: '(205) 555-0100', address: '1901 Thornridge Cir. Shiloh, Hawaii 81063', email: 'cikaracak@gmail.com', image: 'https://i.pravatar.cc/150?u=ronald' },
        { id: 3, name: 'Darlene Robertson', phone: '(209) 555-0104', address: '4140 Parker Rd. Allentown, New Mexico 31134', email: 'cikaracak@gmail.com', image: 'https://i.pravatar.cc/150?u=darlene' },
        { id: 4, name: 'Kristin Watson', phone: '(252) 555-0126', address: '2972 Westheimer Rd. Santa Ana, Illinois 85486', email: 'cikaracak@gmail.com', image: 'https://i.pravatar.cc/150?u=kristin' },
        { id: 5, name: 'Dianne Russell', phone: '(201) 555-0124', address: '4517 Washington Ave. Manchester, Kentucky 39495', email: 'cikaracak@gmail.com', image: 'https://i.pravatar.cc/150?u=dianne' },
    ]);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">User List</h2>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <button className="flex items-center gap-2 bg-[#FF8A00] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-orange-600 transition-colors">
                    <Plus size={18} strokeWidth={3} />
                    Add User
                </button>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Search User */}
                    <div className="flex flex-col gap-1 flex-1 md:w-80">
                        <label className="text-xs text-gray-400 font-medium">Search User</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter User Name"
                                className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                            <Search className="absolute right-3 top-3 text-gray-400" size={18} />
                        </div>
                    </div>

                    <button className="bg-[#FF8A00] text-white p-2.5 rounded-lg mt-auto hover:bg-orange-600 transition-colors shadow-sm">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-gray-50 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                            <tr>
                                <th className="px-6 py-5 w-12 text-center">
                                    <input type="checkbox" className="rounded border-gray-300 accent-orange-500 w-4 h-4" />
                                </th>
                                <th className="px-4 py-5 font-bold">Image</th>
                                <th className="px-4 py-5 font-bold">Full Name</th>
                                <th className="px-4 py-5 font-bold">Phone</th>
                                <th className="px-4 py-5 font-bold">Address</th>
                                <th className="px-4 py-5 font-bold text-center">Email</th>
                                <th className="px-4 py-5 font-bold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-center">
                                        <input type="checkbox" className="rounded border-gray-300 accent-orange-500 w-4 h-4" />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-orange-100 border border-gray-100">
                                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-medium text-gray-700">{user.name}</td>
                                    <td className="px-4 py-4 text-gray-600">{user.phone}</td>
                                    <td className="px-4 py-4 text-gray-500 text-xs leading-relaxed max-w-50">
                                        {user.address}
                                    </td>
                                    <td className="px-4 py-4 text-gray-600 text-center">{user.email}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                                                <FileText size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Pencil size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-400 border-t border-gray-50 bg-gray-50/30">
                    <p>Show 5 user of 100 user</p>
                    <div className="flex items-center gap-4">
                        <button className="hover:text-gray-700 font-medium">Prev</button>
                        <div className="flex items-center gap-4">
                            <span className="text-orange-500 font-bold bg-orange-50 w-6 h-6 flex items-center justify-center rounded cursor-default">1</span>
                            {[2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                <span key={n} className="cursor-pointer hover:text-gray-700 transition-colors">{n}</span>
                            ))}
                        </div>
                        <button className="hover:text-gray-700 font-medium flex items-center gap-1">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Coffee, Truck, UserRoundCheck } from 'lucide-react';
import React from 'react'

export default function Dashboard() {
    const stats = [
        { title: 'Order On Progress', value: '200', color: 'bg-[#56CA82]', icon: <Coffee color='orange'/> },
        { title: 'Order Shipping', value: '100', color: 'bg-[#6D5DD3]', icon: <Truck color='orange'/> },
        { title: 'Order Done', value: '50', color: 'bg-[#B270C9]', icon: <UserRoundCheck color='orange'/> },
    ];

    const bestSellers = [
        { name: 'Caramel Macchiato', sold: '300 Cup', profit: '9.000.000' },
        { name: 'Hazelnut Latte', sold: '200 Cup', profit: '8.000.000' },
        { name: 'Kopi Susu', sold: '100 Cup', profit: '7.000.000' },
        { name: 'Espresso Supreme', sold: '90 Cup', profit: '6.000.000' },
        { name: 'Caramel Velvet Latte', sold: '80 Cup', profit: '5.000.000' },
        { name: 'Hazelnut Dream Brew', sold: '70 Cup', profit: '4.000.000' },
        { name: 'Vanilla Silk Mocha', sold: '60 Cup', profit: '3.000.000' },
        { name: 'Dark Roast Delight', sold: '50 Cup', profit: '2.000.000' },
        { name: 'Ethiopian Yirgacheffe Euphoria', sold: '40 Cup', profit: '1.000.000' },
        { name: 'Indonesian Sumatra Reserve', sold: '30 Cup', profit: '500.000' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`${stat.color} text-white p-5 rounded-2xl flex justify-between items-start shadow-sm`}>
                        <div>
                            <p className="text-xs font-medium opacity-80 mb-2 flex items-center gap-2">
                                <span className="p-1.5 bg-white rounded-full">{stat.icon}</span>
                                {stat.title}
                            </p>
                            <div className="flex items-baseline gap-2 mt-4">
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <span className="text-[10px] opacity-70">+1.01% ↗</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CHART SECTION */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h4 className="font-bold text-gray-800">Total Penjualan</h4>
                        <p className="text-[10px] text-gray-400">1000 cup (16 - 23 January 2023)</p>
                    </div>
                    <select className="text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-500 bg-gray-50">
                        <option>16 - 23 January 2023</option>
                    </select>
                </div>

                {/* Visualisasi Grafik Sederhana (Placeholder Line) */}
                <div className="h-40 w-full relative mt-4 flex items-end overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path
                            d="M0,80 Q100,70 200,85 T400,60 T600,75 T800,40 T1000,30"
                            fill="none"
                            stroke="#56CA82"
                            strokeWidth="3"
                        />
                        <path
                            d="M0,80 Q100,70 200,85 T400,60 T600,75 T800,40 T1000,30 V100 H0 Z"
                            fill="url(#gradient)"
                            fillOpacity="0.1"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#56CA82" />
                                <stop offset="100%" stopColor="white" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Label Tanggal Bawah */}
                    <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-gray-300 px-2">
                        <span>16 Jan</span><span>18 Jan</span><span>20 Jan</span><span>22 Jan</span><span>23 Jan</span>
                    </div>
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-800 text-sm">Produk Terlaris</h4>
                    <select className="text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-500 bg-gray-50">
                        <option>16 - 23 January 2023</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-[11px] border-b border-gray-50 uppercase tracking-wider">
                                <th className="pb-3 font-medium w-12">No</th>
                                <th className="pb-3 font-medium">Nama Produk</th>
                                <th className="pb-3 font-medium">Terjual</th>
                                <th className="pb-3 font-medium text-right">Keuntungan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bestSellers.map((item, index) => (
                                <tr key={index} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-3 text-[12px] text-gray-400">{index + 1}</td>
                                    <td className="py-3 text-[12px] text-gray-700 font-medium">{item.name}</td>
                                    <td className="py-3 text-[12px] text-gray-500">{item.sold}</td>
                                    <td className="py-3 text-[12px] text-right text-green-500 font-bold">
                                        IDR {item.profit}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

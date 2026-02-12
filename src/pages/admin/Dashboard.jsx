import { Coffee, Truck, UserRoundCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/Vincentius31/koda-b6-react/refs/heads/main/src/data/menu.json")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const totalSold = products.reduce((acc, curr) => acc + (curr.sold || 0), 0);
    const totalProfit = products.reduce((acc, curr) => acc + ((curr.sold || 0) * curr.priceDiscount), 0);

    const stats = [
        {
            title: 'Order On Progress',
            value: Math.floor(totalSold * 0.2),
            color: 'bg-[#56CA82]',
            icon: <Coffee color='orange' />
        },
        {
            title: 'Order Shipping',
            value: Math.floor(totalSold * 0.1),
            color: 'bg-[#6D5DD3]',
            icon: <Truck color='orange' />
        },
        {
            title: 'Order Done',
            value: totalSold,
            color: 'bg-[#B270C9]',
            icon: <UserRoundCheck color='orange' />
        },
    ];

    const bestSellers = [...products]
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 10)
        .map(item => ({
            name: item.nameProduct,
            sold: `${item.sold || 0} Cup`,
            profit: ((item.sold || 0) * item.priceDiscount).toLocaleString('id-ID')
        }));

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
                                <span className="text-[10px] opacity-70">+{(Math.random() * 2).toFixed(2)}% ↗</span>
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
                        <p className="text-[10px] text-gray-400">{totalSold} cup (Lifetime Data)</p>
                    </div>
                    <select className="text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-500 bg-gray-50">
                        <option>Current Menu Data</option>
                    </select>
                </div>

                {/* Dinamisasi Grafik Sederhana melalui SVG Path */}
                <div className="h-40 w-full relative mt-4 flex items-end overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path
                            // Path ini merepresentasikan fluktuasi profit per kategori (Simulasi visual)
                            d="M0,90 Q150,20 300,70 T600,30 T900,50 T1000,10"
                            fill="none"
                            stroke="#56CA82"
                            strokeWidth="3"
                        />
                        <path
                            d="M0,90 Q150,20 300,70 T600,30 T900,50 T1000,10 V100 H0 Z"
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
                    <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-gray-300 px-2 font-medium">
                        <span>Coffee</span><span>Non Coffee</span><span>Food</span><span>Add-On</span><span>Special</span>
                    </div>
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-800 text-sm">Produk Terlaris</h4>
                    <span className="text-[10px] text-gray-400">Berdasarkan data JSON Terbaru</span>
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
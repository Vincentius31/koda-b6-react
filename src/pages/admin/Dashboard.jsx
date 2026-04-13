import { Coffee, Truck, UserRoundCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import http from '../../lib/http';

export default function Dashboard() {
    const [orderStats, setOrderStats] = useState({ on_progress: 0, shipping: 0, done: 0 });
    const [salesData, setSalesData] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsJson, salesJson, bestSellersJson] = await Promise.all([
                    http("/admin/dashboard/order-stats"),
                    http("/admin/dashboard/sales-category"),
                    http("/admin/dashboard/best-sellers?limit=10")
                ]);

                if (statsJson?.success) setOrderStats(statsJson.data);
                if (salesJson?.success) setSalesData(salesJson.data);
                if (bestSellersJson?.success) setBestSellers(bestSellersJson.data);

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const totalSold = orderStats.done;

    const stats = [
        {
            title: 'Order On Progress',
            value: orderStats.on_progress,
            color: 'bg-[#56CA82]',
            icon: <Coffee color='orange' />
        },
        {
            title: 'Order Shipping',
            value: orderStats.shipping,
            color: 'bg-[#6D5DD3]',
            icon: <Truck color='orange' />
        },
        {
            title: 'Order Done',
            value: orderStats.done,
            color: 'bg-[#B270C9]',
            icon: <UserRoundCheck color='orange' />
        },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`${stat.color} text-white p-5 rounded-2xl flex justify-between items-start shadow-sm`}>
                        <div>
                            <p className="text-xs font-medium opacity-80 mb-2 flex items-center gap-2">
                                <span className="p-1.5 bg-white rounded-full">{stat.icon}</span>
                                {stat.title}
                            </p>
                            <div className="flex items-baseline gap-2 mt-4">
                                <h3 className="text-2xl font-bold">{loading ? "..." : stat.value}</h3>
                                <span className="text-[10px] opacity-70">+{(Math.random() * 2).toFixed(2)}% ↗</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h4 className="font-bold text-gray-800">Total Penjualan</h4>
                        <p className="text-[10px] text-gray-400">{loading ? "..." : totalSold} cup (Lifetime Data)</p>
                    </div>
                    <select className="text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-500 bg-gray-50">
                        <option>Current Menu Data</option>
                    </select>
                </div>

                <div className="h-64 w-full mt-4">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Memuat grafik...</div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#56CA82" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#56CA82" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#56CA82"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

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
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-sm text-gray-400">Memuat data...</td>
                                </tr>
                            ) : (
                                bestSellers.map((item, index) => (
                                    <tr key={index} className="group hover:bg-gray-50 transition-colors">
                                        <td className="py-3 text-[12px] text-gray-400">{index + 1}</td>
                                        <td className="py-3 text-[12px] text-gray-700 font-medium">{item.product_name}</td>
                                        <td className="py-3 text-[12px] text-gray-500">{item.sold} Cup</td>
                                        <td className="py-3 text-[12px] text-right text-green-500 font-bold">
                                            IDR {item.profit.toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
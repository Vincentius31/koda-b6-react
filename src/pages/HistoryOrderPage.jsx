import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, MessageSquareText } from 'lucide-react';
import Footer from '../components/Footer';
import { PrimaryButton } from '../components/PrimaryButton';
import { Link } from "react-router-dom";

export default function HistoryOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("currentUser"));
        if (userData && userData.email) {
            const allOrders = JSON.parse(localStorage.getItem("all_orders")) || [];
            const userOrders = allOrders.filter(order => order.customer.email === userData.email);
            const sortedOrders = userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            setOrders(sortedOrders);
        }
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'done': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-red-100 text-red-500';
            case 'waiting': return 'bg-gray-200 text-gray-500';
            default: return 'bg-orange-100 text-orange-500'; 
        }
    };

    return (
        <div className='bg-white'>
            <Navbar className='bg-black' />

            <section className="max-w-7xl mx-auto px-6 py-10 mt-20">
                <div className="flex items-center gap-3 mb-8">
                    <h1 className="text-3xl font-semibold">History Order</h1>
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded">
                        {orders.length}
                    </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                    <div className="flex gap-3">
                        <button className="px-5 py-2 rounded bg-orange-500 text-white text-sm font-medium">All Orders</button>
                        <button className="px-5 py-2 rounded bg-gray-100 text-sm font-medium">On Progress</button>
                        <button className="px-5 py-2 rounded bg-gray-100 text-sm font-medium">Finish Order</button>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border rounded text-sm">
                        <Calendar className='w-4 h-4' /> February 2026
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-5 p-5 bg-gray-50 rounded-lg border border-gray-100">
                                    <img
                                        src={order.items[0]?.image}
                                        className="w-28 h-28 object-cover rounded-md shadow-sm"
                                        alt="product"
                                    />

                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">No. Order</p>
                                            <p className="font-semibold text-sm">{order.orderId}</p>
                                            <Link to={`/detail-order/${order.orderId}`} className="text-orange-500 text-sm">
                                                Views Order Detail
                                            </Link>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Date</p>
                                            <p className="font-semibold text-sm">{formatDate(order.date)}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="font-semibold text-sm text-orange-600">
                                                IDR {order.total.toLocaleString("id-ID")}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className={`inline-block text-[10px] px-3 py-1 rounded-full font-bold uppercase ${getStatusStyle(order.status)}`}>
                                                {order.status || "On Progress"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No order history found.</p>
                                <Link to="/product" className="text-orange-500 font-bold mt-2 inline-block">Order Now!</Link>
                            </div>
                        )}

                        {orders.length > 0 && (
                            <div className="flex justify-center items-center gap-3 pt-6">
                                <button className="w-9 h-9 rounded-full bg-orange-500 text-white">1</button>
                                <button className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition">2</button>
                                <button className="w-9 h-9 rounded-full bg-orange-500 text-white">→</button>
                            </div>
                        )}
                    </div>

                    <aside className="border border-gray-100 shadow-sm rounded-xl p-6 h-fit bg-white sticky top-28">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                <MessageSquareText className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-lg">Send Us Message</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            If you are unable to find an answer or find your product quickly,
                            please describe your problem. We will give you a solution.
                        </p>
                        <PrimaryButton>Send Message</PrimaryButton>
                    </aside>
                </div>
            </section>

            <Footer />
        </div>
    );
}
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DetailOrderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("currentUser"));
        if (userData && userData.email) {
            const storageKey = `orders_${userData.email}`;
            const history = JSON.parse(localStorage.getItem(storageKey)) || [];
            const selectedOrder = history.find(item => item.orderId === id);

            if (selectedOrder) {
                setOrderDetail(selectedOrder);
            } else {
                navigate("/history-order");
            }
        } else {
            navigate("/login");
        }
    }, [id, navigate]);

    if (!orderDetail) return null;

    const formattedDate = new Date(orderDetail.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <>
            <Navbar className='bg-black' />

            <section className="max-w-7xl mx-auto px-6 py-14 mt-20">
                <h1 className="text-4xl font-medium mb-2">
                    {orderDetail.orderId}
                </h1>
                <p className="text-gray-500 mb-12">{formattedDate}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Order Information</h2>

                        <div className="space-y-5 text-sm">
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Full Name</span>
                                <span className="font-semibold">{orderDetail.customer.fullName}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Email</span>
                                <span className="font-semibold">{orderDetail.customer.email}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Address</span>
                                <span className="font-semibold">{orderDetail.customer.address || "-"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Payment Method</span>
                                <span className="font-semibold">Cash (Manual)</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-semibold">{orderDetail.delivery}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Status</span>
                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                                    On Progress
                                </span>
                            </div>

                            <div className="flex justify-between pt-6 text-base font-semibold">
                                <span>Total Transaction</span>
                                <span className="text-orange-500">
                                    IDR {orderDetail.total.toLocaleString("id-ID")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h2 className="text-xl font-semibold mb-2">Items Purchased</h2>

                        {orderDetail.items.map((item, idx) => (
                            <div key={idx} className="flex gap-5 p-5 bg-white shadow-sm border border-gray-100 rounded-lg">
                                <img
                                    src={item.image}
                                    className="w-24 h-24 object-cover rounded-md"
                                    alt={item.name}
                                />

                                <div className="flex-1">
                                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full inline-block mb-1 font-bold">
                                        FLASH SALE!
                                    </span>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-gray-500 text-xs mb-2">
                                        {item.qty}pcs | {item.size} | {item.temperature} | {orderDetail.delivery}
                                    </p>

                                    <div className="flex gap-3 items-center">
                                        <span className="text-orange-500 font-bold">
                                            IDR {item.price.toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
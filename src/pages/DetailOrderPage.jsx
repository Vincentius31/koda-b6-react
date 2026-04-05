import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import http, { BASE_URL } from '../lib/http'

export default function DetailOrderPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const res = await http(`/transactions/${id}`);
                if (res && res.success) {
                    setOrderDetail(res.data);
                } else {
                    navigate("/history-order");
                }
            } catch (error) {
                console.error("Fetch order detail error", error);
                navigate("/history-order");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchOrderDetail();
        }
    }, [id, navigate]);

    const getImageUrl = (path) => {
        if (!path) return "https://via.placeholder.com/150";
        return path.startsWith("http") ? path : `${BASE_URL}/uploads/products/${path}`;
    };

    if (isLoading) {
        return (
            <>
                <Navbar className='bg-black' />
                <section className="max-w-7xl mx-auto px-6 py-14 mt-20">
                    <p className="text-center text-gray-500">Loading order detail...</p>
                </section>
                <Footer />
            </>
        );
    }

    if (!orderDetail) return null;

    const formattedDate = new Date(orderDetail.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'done': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-red-100 text-red-500';
            case 'waiting': return 'bg-gray-200 text-gray-500';
            default: return 'bg-orange-100 text-orange-600';
        }
    };

    return (
        <>
            <Navbar className='bg-black' />

            <section className="max-w-7xl mx-auto px-6 py-14 mt-20">
                <h1 className="text-4xl font-medium mb-2">
                    {orderDetail.transaction_number}
                </h1>
                <p className="text-gray-500 mb-12">{formattedDate}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Order Information</h2>

                        <div className="space-y-5 text-sm">
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Full Name</span>
                                <span className="font-semibold">{orderDetail.customer?.fullname || "-"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Email</span>
                                <span className="font-semibold">{orderDetail.customer?.email || "-"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Address</span>
                                <span className="font-semibold">{orderDetail.customer?.address || "-"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Payment Method</span>
                                <span className="font-semibold">{orderDetail.payment_method || "Cash"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-semibold">{orderDetail.delivery_method}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Status</span>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(orderDetail.status)}`}>
                                    {orderDetail.status || "Pending"}
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

                        {orderDetail.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-5 p-5 bg-white shadow-sm border border-gray-100 rounded-lg">
                                <img
                                    src={getImageUrl(item.image)}
                                    className="w-24 h-24 object-cover rounded-md"
                                    alt={item.product_name}
                                />

                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.product_name}</h4>
                                    <p className="text-gray-500 text-xs mb-2">
                                        {item.quantity}pcs {item.size ? `| ${item.size}` : ""} {item.variant ? `| ${item.variant}` : ""}
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
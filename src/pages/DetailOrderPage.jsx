import React from 'react'
import Navbar from '../components/Navbar'
import imageProduct from '../assets/img/Image 31.png'
import Footer from '../components/Footer'

export default function DetailOrderPage() {
    return (
        <>
            <Navbar className='bg-black' />

            <section className="max-w-7xl mx-auto px-6 py-14 mt-20 ml-10">
                <h1 className="text-4xl font-medium mb-2">Order <span className='font-extrabold'>#12354-09893</span></h1>
                <p className="text-gray-500 mb-12">21 March 2023 at 10:30 AM</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Order Information</h2>

                        <div className="space-y-5 text-sm">
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Full Name</span>
                                <span className="font-semibold">Ghaluh Wizard Anggoro</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Address</span>
                                <span className="font-semibold">Griya bandung indah</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Phone</span>
                                <span className="font-semibold">082116304338</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Payment Method</span>
                                <span className="font-semibold">Cash</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-semibold">Dine In</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-500">Status</span>
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">Done</span>
                            </div>

                            <div className="flex justify-between pt-6 text-base font-semibold">
                                <span>Total Transaction</span>
                                <span className="text-orange-500">IDR 40.000</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h2 className="text-xl font-semibold mb-6">Your Order</h2>

                        <div className="flex gap-5 p-5 bg-white shadow">
                            <img src={imageProduct} className="w-28 h-28 object-cover" />

                            <div className="flex-1">
                                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full inline-block mb-2">
                                    FLASH SALE!
                                </span>
                                <h4 className="font-semibold">Hazelnut Latte</h4>
                                <p className="text-gray-500 text-sm mb-2">
                                    2pcs | Regular | Ice | Dine In
                                </p>

                                <div className="flex gap-3 items-center">
                                    <span className="text-red-500 line-through text-sm">IDR 40.000</span>
                                    <span className="text-orange-500 font-semibold">IDR 20.000</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-5 p-5 bg-white shadow">
                            <img src={imageProduct} className="w-28 h-28 object-cover" />

                            <div className="flex-1">
                                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full inline-block mb-2">
                                    FLASH SALE!
                                </span>
                                <h4 className="font-semibold">Hazelnut Latte</h4>
                                <p className="text-gray-500 text-sm mb-2">
                                    2pcs | Regular | Ice | Dine In
                                </p>

                                <div className="flex gap-3 items-center">
                                    <span className="text-red-500 line-through text-sm">IDR 40.000</span>
                                    <span className="text-orange-500 font-semibold">IDR 20.000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </>
    )
}

import React from 'react'
import Navbar from '../components/Navbar'
import { Calendar, MessageSquareText } from 'lucide-react'
import Footer from '../components/Footer'
import imageProduct from '../assets/img/Image 31.png'
import { PrimaryButton } from '../components/PrimaryButton'

export default function HistoryOrder() {
    return (
        <div className='bg-white'>
            <Navbar className='bg-black' />

            <section className="max-w-7xl mx-auto px-6 py-10 mt-20">
                <div className="flex items-center gap-3 mb-8">
                    <h1 className="text-3xl font-semibold">History Order</h1>
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded">2</span>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex gap-3">
                        <button className="px-5 py-2 rounded bg-gray-100 text-sm font-medium">On Progress</button>
                        <button className="px-5 py-2 rounded bg-gray-100 text-sm font-medium">Sending Goods</button>
                        <button className="px-5 py-2 rounded bg-gray-100 text-sm font-medium">Finish Order</button>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 border rounded text-sm ml-57">
                        <Calendar className='w-4 h-4' /> January 2023
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex gap-5 p-5 bg-gray-50">
                            <img src={imageProduct} className="w-28 h-28 object-cover" alt="product-coffee" />

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="text-sm text-gray-500">No. Order</p>
                                    <p className="font-semibold">#12354-09893</p>
                                    <a href="#" className="text-orange-500 text-sm">Views Order Detail</a>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-semibold">23 January 2023</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-semibold">Idr 40.000</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className="inline-block bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full">
                                        On Progress
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-5 p-5 bg-gray-50">
                            <img src={imageProduct} className="w-28 h-28 object-cover" alt="" />

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="text-sm text-gray-500">No. Order</p>
                                    <p className="font-semibold">#12354-09893</p>
                                    <a href="#" className="text-orange-500 text-sm">Views Order Detail</a>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-semibold">23 January 2023</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-semibold">Idr 40.000</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className="inline-block bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full">
                                        On Progress
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-5 p-5 bg-gray-50">
                            <img src={imageProduct} className="w-28 h-28 object-cover" alt="" />

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="text-sm text-gray-500">No. Order</p>
                                    <p className="font-semibold">#12354-09893</p>
                                    <a href="#" className="text-orange-500 text-sm">Views Order Detail</a>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-semibold">23 January 2023</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-semibold">Idr 40.000</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className="inline-block bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full">
                                        On Progress
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-5 p-5 bg-gray-50">
                            <img src={imageProduct} className="w-28 h-28 object-cover" alt="" />

                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="text-sm text-gray-500">No. Order</p>
                                    <p className="font-semibold">#12354-09893</p>
                                    <a href="#" className="text-orange-500 text-sm">Views Order Detail</a>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-semibold">23 January 2023</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-semibold">Idr 40.000</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className="inline-block bg-orange-100 text-orange-500 text-xs px-3 py-1 rounded-full">
                                        On Progress
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-center items-center gap-3 pt-6">
                            <button className="w-9 h-9 rounded-full bg-orange-500 text-white">1</button>
                            <button className="w-9 h-9 rounded-full bg-gray-200">2</button>
                            <button className="w-9 h-9 rounded-full bg-gray-200">3</button>
                            <button className="w-9 h-9 rounded-full bg-gray-200">4</button>
                            <button className="w-9 h-9 rounded-full bg-orange-500 text-white">→</button>
                        </div>

                    </div>

                    <aside className="border-gray-50 shadow rounded-lg p-6 h-fit">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                <MessageSquareText className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-lg">Send Us Message</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            if your unable to find answer or find your product quickly,
                            please describe your problem and tell us. we will give you solution.
                        </p>
                        <PrimaryButton>Send Message</PrimaryButton>
                    </aside>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

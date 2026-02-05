import React from 'react'
import { X, User, MapPin, Phone, CreditCard, Truck, Activity, ChevronDown } from 'lucide-react'

export default function EditOrderModal({ isOpen, onClose, orderNumber = "#12354-09893" }) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Container */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-125 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="h-full flex flex-col p-8 relative">
                    {/* Header & Close Button */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Order {orderNumber}</h2>
                        <button onClick={onClose} className="transition-transform hover:scale-110">
                            <X size={32} className="text-red-500 border-2 border-red-500 rounded-full p-1" strokeWidth={3} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                        {/* Order Information Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800">Order Information</h3>
                            <div className="space-y-4">
                                <InfoRow icon={<User size={18} />} label="Full Name" value="Ghaluh Wizard Anggoro" />
                                <InfoRow icon={<MapPin size={18} />} label="Address" value="Griya bandung indah" />
                                <InfoRow icon={<Phone size={18} />} label="Phone" value="082116304338" />
                                <InfoRow icon={<CreditCard size={18} />} label="Payment Method" value="Cash" />
                                <InfoRow icon={<Truck size={18} />} label="Shipping" value="Dine In" />

                                {/* Status Dropdown */}
                                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <Activity size={18} />
                                        <span className="text-sm">Status</span>
                                    </div>
                                    <div className="relative">
                                        <select className="appearance-none bg-gray-100 px-4 py-2 pr-10 rounded-lg text-sm font-medium text-gray-700 outline-none border-none">
                                            <option>On progress</option>
                                            <option>Done</option>
                                            <option>Pending</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Total Transaksi */}
                        <div className="flex justify-between items-center py-4">
                            <span className="text-sm font-medium text-gray-500">Total Transaksi</span>
                            <span className="text-lg font-bold text-[#FF8A00]">Idr 40.000</span>
                        </div>

                        {/* Your Order Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800">Your Order</h3>
                            <div className="space-y-3">
                                <OrderItem
                                    img="https://via.placeholder.com/80"
                                    name="Hazelnut Latte"
                                    details="2pcs | Regular | Ice | Dine In"
                                    oldPrice="IDR40.000"
                                    newPrice="IDR 20.000"
                                />
                                <OrderItem
                                    img="https://via.placeholder.com/80"
                                    name="Caramel Machiato"
                                    details="2pcs | Regular | Ice | Dine In"
                                    oldPrice="IDR40.000"
                                    newPrice="IDR 20.000"
                                />
                            </div>
                        </section>
                    </div>

                    {/* Update Button */}
                    <button className="w-full bg-[#FF8A00] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-100 mt-6 hover:bg-orange-600 transition-colors">
                        Update
                    </button>
                </div>
            </div>
        </>
    )
}

// Helper Components
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
            {icon}
            <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-bold text-gray-800">{value}</span>
    </div>
)

const OrderItem = ({ img, name, details, oldPrice, newPrice }) => (
    <div className="flex gap-4 p-3 bg-gray-50 rounded-xl">
        <img src={img} alt={name} className="w-16 h-16 rounded-lg object-cover" />
        <div className="flex flex-col justify-between py-0.5">
            <div>
                <h4 className="text-sm font-bold text-gray-800">{name}</h4>
                <p className="text-[10px] text-gray-400 font-medium">{details}</p>
            </div>
            <div className="flex gap-2 items-center">
                <span className="text-[10px] text-red-500 line-through font-bold">{oldPrice}</span>
                <span className="text-[11px] text-[#FF8A00] font-bold">{newPrice}</span>
            </div>
        </div>
    </div>
)


import { useLocation, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Input from "../components/Input"
import { Mail, MapPin, User } from "lucide-react"
import ImageProduct from "../assets/img/Image 31.png"
import { PrimaryButton } from "../components/PrimaryButton"

export default function CheckoutProdutPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const order = state?.order

  const [delivery, setDelivery] = useState("Dine In")
  const [tax, setTax] = useState(4000)

  // ❌ Kalau user akses langsung
  useEffect(() => {
    if (!order) navigate("/product")
  }, [order, navigate])

  if (!order) return null

  const priceNumber = Number(
    order.priceDiscount.replace(/\D/g, "")
  )

  const orderTotal = priceNumber * order.quantity
  const subTotal = orderTotal + tax

  const handleCheckout = () => {
    const history = JSON.parse(localStorage.getItem("orders")) || []

    history.push({
      ...order,
      delivery,
      total: subTotal,
      date: new Date().toISOString(),
    })

    localStorage.setItem("orders", JSON.stringify(history))
    navigate("/history-order")
  }

  return (
    <>
      <Navbar className="bg-black" />

      <main className="max-w-7xl mx-auto px-6 py-10 mt-20 mb-10">
        <h1 className="text-3xl font-semibold mb-8">Payment Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* ORDER */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <Link to="/product" className="w-25">
                  <PrimaryButton>+ Add Menu</PrimaryButton>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-gray-50">
                  <img
                    src={ImageProduct}
                    alt="coffee"
                    className="w-24 h-24 object-cover"
                  />

                  <div className="flex-1">
                    <span className="inline-block text-xs bg-red-500 text-white px-2 py-1 rounded mb-1">
                      FLASH SALE
                    </span>

                    <h3 className="font-semibold">{order.name}</h3>

                    <p className="text-sm text-gray-500">
                      {order.quantity}pcs | {order.size} | {order.temperature} | {delivery}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="line-through text-sm text-gray-400">
                        {order.priceNormal}
                      </span>
                      <span className="font-semibold text-orange-500">
                        {order.priceDiscount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT INFO */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Payment Info & Delivery
              </h2>

              <div className="space-y-4">
                <Input label="Email" type="email" placeholder="Enter Your Email" icon={Mail} />
                <Input label="Full Name" type="text" placeholder="Enter Your Full Name" icon={User} />
                <Input label="Address" type="text" placeholder="Enter Your Address" icon={MapPin} />

                {/* DELIVERY */}
                <div>
                  <p className="mb-2 text-sm font-medium">Delivery</p>
                  <div className="flex gap-3">
                    {["Dine In", "Door Delivery", "Pick Up"].map(item => (
                      <button
                        key={item}
                        onClick={() => setDelivery(item)}
                        className={`px-4 py-2 border rounded ${delivery === item
                            ? "border-orange-500 text-orange-500"
                            : ""
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="font-semibold mb-4">Total</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order</span>
                <span>IDR {orderTotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>IDR 0</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>IDR {tax.toLocaleString("id-ID")}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-semibold">
                <span>Sub Total</span>
                <span>IDR {subTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full"
            >
              <PrimaryButton>Checkout</PrimaryButton>
            </button>

            <p className="text-xs text-gray-500 mt-4">
              *Get Discount if you pay with Bank Central Asia
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

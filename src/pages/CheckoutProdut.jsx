import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { Mail, MapPin, User } from "lucide-react";
import ImageProduct from "../assets/img/Image 31.png"

export default function CheckoutProdut() {
  return (
    <>
      <Navbar className="bg-black"/>

      <main className="max-w-7xl mx-auto px-6 py-10 mt-20 mb-10">
        <h1 className="text-3xl font-semibold mb-8">Payment Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                  + Add Menu
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 p-4 bg-gray-50"
                  >
                    <img
                      src={ImageProduct}
                      alt="coffee"
                      className="w-24 h-24 object-cover"
                    />

                    <div className="flex-1">
                      <span className="inline-block text-xs bg-red-500 text-white px-2 py-1 rounded mb-1">
                        FLASH SALE
                      </span>
                      <h3 className="font-semibold">Hazelnut Latte</h3>
                      <p className="text-sm text-gray-500">
                        2pcs | Regular | Ice | Dine In
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="line-through text-sm text-gray-400">
                          IDR 40.000
                        </span>
                        <span className="font-semibold text-orange-500">
                          IDR 20.000
                        </span>
                      </div>
                    </div>

                    <button className="text-red-500 font-bold">×</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Payment Info & Delivery
              </h2>

              <div className="space-y-4">
                <Input label={"Email"} type={"email"} placeholder={"Enter Your Email"} icon={Mail} />
                <Input label={"Full Name"} type={"text"} placeholder={"Enter Your Full Name"} icon={User} />
                <Input label={"Address"} type={"text"} placeholder={"Enter Your Address"} icon={MapPin} />

                <div>
                  <p className="mb-2 text-sm font-medium">Delivery</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded border-orange-500 text-orange-500">
                      Dine In
                    </button>
                    <button className="px-4 py-2 border rounded">
                      Door Delivery
                    </button>
                    <button className="px-4 py-2 border rounded">
                      Pick Up
                    </button>
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
                <span>IDR 40.000</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>IDR 0</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>IDR 4.000</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-semibold">
                <span>Sub Total</span>
                <span>IDR 44.000</span>
              </div>
            </div>

            <button className="w-full bg-orange-500 text-white py-3 rounded mt-6">
              Checkout
            </button>

            <p className="text-xs text-gray-500 mt-4">
              *Get Discount if you pay with Bank Central Asia
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { Mail, MapPin, User, X } from "lucide-react";
import { PrimaryButton } from "../components/PrimaryButton";

export default function CheckoutProductPage() {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart } = useCart();

  const [delivery, setDelivery] = useState("Dine In");

  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const [email, setEmail] = useState(userData.email || "");
  const [fullName, setFullName] = useState(userData.name || "");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0 && localData.length === 0) {
      navigate("/product");
    }
  }, [cart, navigate]);

  if (cart.length === 0) return null;

  const orderTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const deliveryFee = delivery === "Door Delivery" ? 10000 : 0;

  const tax = orderTotal * 0.1;
  const subTotal = orderTotal + tax + deliveryFee;

  const handleCheckout = () => {
    const history = JSON.parse(localStorage.getItem("orders")) || [];

    history.push({
      items: cart,
      customer: { email, fullName, address },
      delivery,
      deliveryFee,
      tax: tax,
      total: subTotal,
      date: new Date().toISOString(),
    });

    localStorage.setItem("orders", JSON.stringify(history));
    clearCart();
    navigate("/history-order");
  };

  return (
    <>
      <Navbar className="bg-black" />

      <main className="max-w-7xl mx-auto px-6 py-10 mt-20 mb-10">
        <h1 className="text-3xl font-semibold mb-8">Payment Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <div className="w-30">
                  <PrimaryButton onClick={() => navigate("/product")}>
                    + Add Menu
                  </PrimaryButton>
                </div>
              </div>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />

                    <div className="flex-1">
                      <span className="inline-block text-xs bg-red-500 text-white px-2 py-1 rounded mb-1">
                        FLASH SALE
                      </span>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.qty}pcs | {item.size} | {item.temperature}
                      </p>
                      <p className="font-semibold text-orange-500 mt-1">
                        IDR {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.temperature)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <X size={20} color="red" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Payment Info & Delivery</h2>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  icon={Mail}
                />
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                  icon={User}
                />
                <Input
                  label="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Your Address"
                  icon={MapPin}
                />

                <div>
                  <p className="mb-2 text-sm font-medium">Delivery Method</p>
                  <div className="flex gap-3">
                    {["Dine In", "Door Delivery", "Pick Up"].map(item => (
                      <button
                        key={item}
                        onClick={() => setDelivery(item)}
                        className={`px-4 py-2 border rounded-lg transition ${delivery === item
                          ? "border-orange-500 text-orange-500 bg-orange-50"
                          : "border-gray-200"
                          }`}
                      >
                        {item} {item === "Door Delivery"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-gray-50 p-6 rounded-lg h-fit sticky top-28">
            <h2 className="font-semibold mb-4 text-xl">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Price ({cart.length} items)</span>
                <span className="font-medium">IDR {orderTotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={deliveryFee > 0 ? "font-medium" : "text-green-600 font-medium"}>
                  {deliveryFee > 0 ? `IDR ${deliveryFee.toLocaleString("id-ID")}` : "FREE"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">IDR {tax.toLocaleString("id-ID")}</span>
              </div>

              <hr className="my-4 border-dashed" />

              <div className="flex justify-between text-lg font-bold">
                <span>Sub Total</span>
                <span className="text-orange-500">IDR {subTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="w-full mt-6">
              <PrimaryButton onClick={handleCheckout}>Confirm Payment</PrimaryButton>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
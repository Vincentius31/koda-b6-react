import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { Mail, MapPin, User, X, ShoppingCart } from "lucide-react";
import { PrimaryButton } from "../components/PrimaryButton";

export default function CheckoutProductPage() {
  const navigate = useNavigate();
  const { cart, clearCart, removeFromCart } = useCart();
  const [delivery, setDelivery] = useState("Dine In");

  const userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [email, setEmail] = useState(userData.email || "");
  const [fullName, setFullName] = useState(userData.fullName || "");
  const [address, setAddress] = useState("");

  const orderTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = delivery === "Door Delivery" ? 10000 : 0;
  const tax = orderTotal * 0.1;
  const subTotal = orderTotal + tax + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some products first!");
      return;
    }

    const activeUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!activeUser || !activeUser.email) {
      alert("Please login to continue checkout.");
      return;
    }

    if (!email || !fullName || (delivery === "Door Delivery" && !address)) {
      alert("Please fill in all required fields!");
      return;
    }

    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const timePart = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `ORD-${datePart}${timePart}${randomPart}`;

    const storageKey = `orders_${activeUser.email}`;
    const history = JSON.parse(localStorage.getItem(storageKey)) || [];

    history.push({
      orderId: newOrderId,
      items: cart,
      customer: { email, fullName, address },
      delivery,
      deliveryFee,
      tax: tax,
      total: subTotal,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(storageKey, JSON.stringify(history));
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
                <div className="w-36">
                  <PrimaryButton onClick={() => navigate("/product")}>+ Add Menu</PrimaryButton>
                </div>
              </div>

              <div className="space-y-4">
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg relative">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                      <div className="flex-1">
                        <span className="inline-block text-xs bg-red-500 text-white px-2 py-1 rounded mb-1 font-bold">FLASH SALE</span>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.qty}pcs | {item.size} | {item.temperature}</p>
                        <p className="font-semibold text-orange-500 mt-1">IDR {item.price.toLocaleString("id-ID")}</p>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id, item.size, item.temperature)} className="text-gray-400 hover:text-red-500">
                        <X size={20} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mb-2" />
                    <p className="text-gray-500 italic">Your cart is currently empty.</p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Payment Info & Delivery</h2>
              <div className="space-y-4">
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" icon={Mail} />
                <Input label="Full Name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Your Full Name" icon={User} />
                <Input label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Your Address" icon={MapPin} />
                <div>
                  <p className="mb-2 text-sm font-medium">Delivery Method</p>
                  <div className="flex flex-wrap gap-3">
                    {["Dine In", "Door Delivery", "Pick Up"].map(item => {
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setDelivery(item)}
                          className={`px-4 py-2 border rounded-lg transition ${delivery === item
                              ? "border-orange-500 text-orange-500 bg-orange-50 font-medium"
                              : "border-gray-200 text-gray-600"
                            }`}
                        >
                          {item} {item === "Door Delivery" && "(+10k)"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-gray-50 p-6 rounded-lg h-fit lg:sticky lg:top-28 border border-gray-100">
            <h2 className="font-semibold mb-4 text-xl">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Total Price</span><span className="font-medium">IDR {orderTotal.toLocaleString("id-ID")}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span className={deliveryFee > 0 ? "font-medium" : "text-green-600 font-bold"}>{deliveryFee > 0 ? `IDR ${deliveryFee.toLocaleString("id-ID")}` : "FREE"}</span></div>
              <div className="flex justify-between border-b pb-3"><span className="text-gray-600">Tax (10%)</span><span className="font-medium">IDR {tax.toLocaleString("id-ID")}</span></div>
              <div className="flex justify-between text-lg font-bold pt-2"><span>Sub Total</span><span className="text-orange-500">IDR {subTotal.toLocaleString("id-ID")}</span></div>
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={handleCheckout}>Confirm Payment</PrimaryButton>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
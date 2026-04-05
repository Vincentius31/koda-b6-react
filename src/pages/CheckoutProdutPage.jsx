import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartData, clearCartData } from "../components/redux/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { Mail, MapPin, User, X, ShoppingCart } from "lucide-react";
import { PrimaryButton } from "../components/PrimaryButton";
import http, { BASE_URL } from "../lib/http";

export default function CheckoutProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items) || [];
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [delivery, setDelivery] = useState("Dine In");

  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoadingCart(true);
      try {
        const res = await http("/cart");
        if (res && res.success) {
          dispatch(setCartData(res.data || []));
        }
      } catch (error) {
        console.error("Fetch cart error", error);
      } finally {
        setIsLoadingCart(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await http("/profile");
        if (res && res.success && res.data) {
          setEmail(res.data.email || "");
          setFullName(res.data.fullname || "");
          setAddress(res.data.address || "");
        }
      } catch (error) {
        console.error("Fetch profile error", error);
      }
    };

    fetchCart();
    fetchProfile();
  }, [dispatch]);

  const handleRemoveItem = async (cartId) => {
    try {
      const res = await http(`/cart/${cartId}`, { method: "DELETE" });
      if (res && res.success) {
        const updatedCart = await http("/cart");
        dispatch(setCartData(updatedCart?.data || []));
      }
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const getItemTotal = (item) => {
    const basePrice = item.base_price || 0;
    const variantPrice = item.variant_price || 0;
    const sizePrice = item.size_price || 0;
    return (basePrice + variantPrice + sizePrice) * item.quantity;
  };

  const orderTotal = cart.reduce((acc, item) => acc + getItemTotal(item), 0);
  const deliveryFee = delivery === "Door Delivery" ? 10000 : 0;
  const tax = orderTotal * 0.1;
  const subTotal = orderTotal + tax + deliveryFee;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some products first!");
      return;
    }

    if (!email || !fullname || (delivery === "Door Delivery" && !address)) {
      alert("Please fill in all required fields!");
      return;
    }

    const checkoutItems = cart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size_name || "",
      variant: item.variant_name || "",
      price: getItemTotal(item),
    }));

    const checkoutData = {
      delivery_method: delivery,
      subtotal: orderTotal + deliveryFee,
      total: subTotal,
      payment_method: "Cash",
      items: checkoutItems,
    };

    try {
      const res = await http("/checkout", {
        method: "POST",
        body: JSON.stringify(checkoutData),
      });

      if (res && res.success) {
        dispatch(clearCartData());
        alert("Order placed successfully!");
        navigate("/history-order");
      } else {
        alert(res?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Checkout error", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150";
    return path.startsWith("http") ? path : `${BASE_URL}/uploads/products/${path}`;
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
                {isLoadingCart ? (
                  <p className="text-center text-gray-500 py-10">Loading your cart...</p>
                ) : cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id_cart} className="flex gap-4 p-4 bg-gray-50 rounded-lg relative">
                      <img src={getImageUrl(item.product_image)} alt={item.product_name} className="w-24 h-24 object-cover rounded-md" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product_name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.quantity}pcs
                          {item.size_name ? ` | ${item.size_name}` : ""}
                          {item.variant_name ? ` | ${item.variant_name}` : ""}
                        </p>
                        <p className="font-semibold text-orange-500 mt-1">IDR {getItemTotal(item).toLocaleString("id-ID")}</p>
                      </div>
                      <button type="button" onClick={() => handleRemoveItem(item.id_cart)} className="text-gray-400 hover:text-red-500 cursor-pointer">
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
                {/* Form input akan otomatis terisi saat fetchProfile selesai */}
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" icon={Mail} />
                <Input label="Full Name" type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} placeholder="Enter Your Full Name" icon={User} />
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

          <section className="bg-gray-50 p-6 rounded-lg h-fit lg:top-28 border border-gray-100">
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
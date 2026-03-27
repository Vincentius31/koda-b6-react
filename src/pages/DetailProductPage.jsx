import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import http, { BASE_URL } from "../lib/http";

export default function DetailProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [variant, setVariant] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const result = await http(`/detail-product/${id}`);

        if (result && result.success) {
          const data = result.data.product;
          setProduct(data);
          setRecommended(result.data.recommended || []);

          if (data.sizes?.length > 0) setSize(data.sizes[0]);
          if (data.variants?.length > 0) setVariant(data.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };
  }, [id]);

  const handleAddToCart = (isBuyNow = false) => {
    if (!product) return;

    const newItem = {
      id: product.id_product,
      name: product.name,
      image: product.images?.length > 0 ? product.images[0] : "",
      price: product.discount_price,
      qty: quantity,
      size: size,
      variant: variant
    };

    addToCart(newItem);
    if (isBuyNow) navigate("/checkout-product");
    else alert("Added to cart!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparing your menu...</p>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 font-bold text-black">Product not found.</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar className="bg-black" />

      <section className="max-w-7xl mx-auto px-6 py-12 pt-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-8 cursor-pointer font-medium"
        >
          <ArrowLeft size={20} /> Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="aspect-square overflow-hidden mb-6 bg-gray-100 rounded-2xl shadow-sm">
              <img
                src={product.images?.length > 0 ? product.images[0] : ""}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, idx) => (
                <div key={idx} className="aspect-square overflow-hidden cursor-pointer border-2 rounded-xl hover:border-orange-500 transition">
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit uppercase tracking-wider">
              {product.discount_rate > 0 ? `Sale ${product.discount_rate * 100}%` : "Fresh Menu"}
            </span>
            <h1 className="text-5xl font-bold mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-orange-500 text-4xl font-extrabold">IDR {product.discount_price.toLocaleString()}</span>
              {product.discount_rate > 0 && (
                <span className="text-gray-400 line-through text-xl">IDR {product.price.toLocaleString()}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-8 text-sm">
              <div className="text-yellow-400 text-lg">{"★".repeat(Math.round(product.rating))}</div>
              <span className="text-gray-500 font-medium">({product.rating}) | {product.total_review} Reviews</span>
            </div>

            <p className="text-gray-600 mb-10 text-lg leading-relaxed">{product.desc}</p>

            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <p className="font-bold mb-3 text-sm uppercase text-gray-400 tracking-widest">Select Size</p>
                <div className="flex gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-6 py-2 rounded-full border-2 transition-all font-bold text-sm ${size === s ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-100 text-gray-400 hover:border-gray-300"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.length > 0 && (
              <div className="mb-10">
                <p className="font-bold mb-3 text-sm uppercase text-gray-400 tracking-widest">Preference</p>
                <div className="flex gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`px-8 py-2 rounded-full border-2 transition-all font-bold text-sm ${variant === v ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-100 text-gray-400 hover:border-gray-300"
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 mt-auto">
              <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-orange-500">-</button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-xl hover:text-orange-500">+</button>
              </div>
              <button onClick={() => handleAddToCart(true)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-full font-bold shadow-lg shadow-orange-200 transition-all hover:-translate-y-1">
                Buy Now
              </button>
              <button onClick={() => handleAddToCart(false)} className="w-14 h-14 border-2 border-orange-500 text-orange-500 rounded-full flex items-center justify-center hover:bg-orange-50 transition-all">
                <ShoppingCart size={24} />
              </button>
            </div>
          </div>
        </div>

        <section className="mt-32 pt-20 border-t border-gray-100">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Recommendation <span className="text-orange-500">For You</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {recommended.map(item => (
              <ProductCard
                key={item.id_product}
                id={item.id_product}
                name={item.name}
                src={item.image_path}
                description={item.desc}
                price={item.discount_price}
                originalPrice={item.price}
                discountRate={item.discount_rate}
              />
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}
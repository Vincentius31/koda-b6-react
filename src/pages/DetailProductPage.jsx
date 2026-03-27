import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import http, { BASE_URL } from "../lib/http";

export default function DetailProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- State Data ---
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- State Pilihan User ---
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [variant, setVariant] = useState("");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        const result = await http(`/detail-product/${id}`);

        if (result && result.success) {
          const data = result.data.product;
          setProduct(data);
          setRecommended(result.data.recommended || []);

          if (data.images?.length > 0) setActiveImage(data.images[0]);
          
          if (data.sizes?.length > 0) setSize(data.sizes[0]);
          if (data.variants?.length > 0) setVariant(data.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
    setQuantity(1);
    window.scrollTo(0, 0); 
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
    if (isBuyNow) {
      navigate("/checkout-product");
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/500";
    return path.startsWith("http") ? path : `${BASE_URL}/uploads/products/${path}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium italic">Preparing your delicious menu...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar className="bg-black" />
        <div className="flex flex-col items-center justify-center py-40">
          <h2 className="text-2xl font-bold text-gray-800">Oops! Product not found.</h2>
          <button onClick={() => navigate("/product")} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-bold">
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar className="bg-black" />

      <section className="max-w-7xl mx-auto px-6 py-12 pt-32">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition mb-10 cursor-pointer font-semibold group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* --- KIRI: GALERI GAMBAR --- */}
          <div>
            <div className="aspect-square overflow-hidden mb-6 bg-gray-50 rounded-3xl shadow-sm border border-gray-100">
              <img
                src={getImageUrl(activeImage || (product.images && product.images[0]))}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square overflow-hidden cursor-pointer border-2 rounded-2xl transition-all ${
                    activeImage === img ? "border-orange-500 scale-95" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img src={getImageUrl(img)} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
               <span className="inline-block bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {product.discount_rate > 0 ? `PROMO ${product.discount_rate * 100}% OFF` : "NEW ARRIVAL"}
              </span>
            </div>
            
            <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-orange-500 text-4xl font-black">IDR {product.discount_price?.toLocaleString('id-ID')}</span>
              {product.discount_rate > 0 && (
                <span className="text-gray-300 line-through text-xl font-medium">IDR {product.price?.toLocaleString('id-ID')}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-full border border-gray-100">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-gray-600 font-bold text-sm ml-1">{product.rating}</span>
              <span className="text-gray-300 mx-1">|</span>
              <span className="text-gray-500 text-sm font-medium">{product.total_review} Reviews</span>
            </div>

            <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium">{product.desc}</p>

            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <p className="font-black mb-4 text-xs uppercase text-gray-400 tracking-widest">Select Size</p>
                <div className="flex gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-8 py-2.5 rounded-xl border-2 transition-all font-bold text-sm ${
                        size === s ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-100 text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.length > 0 && (
              <div className="mb-12">
                <p className="font-black mb-4 text-xs uppercase text-gray-400 tracking-widest">Preference</p>
                <div className="flex gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`px-8 py-2.5 rounded-xl border-2 transition-all font-bold text-sm ${
                        variant === v ? "border-orange-500 text-orange-500 bg-orange-50" : "border-gray-100 text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 mt-auto">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1 shadow-inner border border-gray-200">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:text-orange-500 transition-colors">-</button>
                <span className="w-12 text-center font-black text-xl">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:text-orange-500 transition-colors">+</button>
              </div>
              
              <button 
                onClick={() => handleAddToCart(true)} 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4.5 rounded-2xl font-black shadow-xl shadow-orange-100 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider"
              >
                Buy Now
              </button>
              
              <button 
                onClick={() => handleAddToCart(false)} 
                className="w-16 h-16 border-2 border-orange-500 text-orange-500 rounded-2xl flex items-center justify-center hover:bg-orange-50 transition-all active:scale-90"
              >
                <ShoppingCart size={28} />
              </button>
            </div>
          </div>
        </div>

        <section className="mt-32 pt-24 border-t border-gray-100">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black mb-2">Recommendation</h2>
              <p className="text-gray-400 font-medium">Try our other best-selling menus</p>
            </div>
            <button onClick={() => navigate("/product")} className="text-orange-500 font-bold hover:underline mb-2 cursor-pointer">View All Products →</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {recommended.slice(0, 3).map(item => (
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
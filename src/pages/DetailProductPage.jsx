import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCartData } from "../components/redux/cartSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import http, { BASE_URL } from "../lib/http";

export default function DetailProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_PER_PAGE = 3;
  const [quantity, setQuantity] = useState(1);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
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
          if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
          if (data.variants?.length > 0) setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
    setQuantity(1);
    setCurrentPage(1);
  }, [id]);

  const additionalCost = (selectedSize?.additional_price || 0) + (selectedVariant?.additional_price || 0);
  const finalDiscountPrice = (product?.discount_price || 0) + additionalCost;
  const finalOriginalPrice = (product?.price || 0) + additionalCost;

  const handleAddToCart = async (isBuyNow = false) => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first to add items to cart!");
        navigate("/login");
        return;
    }

    try {
        const payload = {
            product_id: product.id_product,
            quantity: quantity,
            variant_id: selectedVariant?.id_variant || null,
            size_id: selectedSize?.id_size || null
        };

        const postRes = await http("/cart", { method: "POST", body: payload });
        
        if (postRes && postRes.success) {
            const cartRes = await http("/cart");
            if (cartRes && cartRes.success) {
                dispatch(setCartData(cartRes.data || [])); 
            }
            if (isBuyNow) {
                navigate("/checkout-product");
            } else {
                alert(`${product.name} added to cart!`);
            }
        } else {
            alert(postRes.message || "Failed to add to cart");
        }
    } catch (error) {
        console.error("Cart Error:", error);
    }
  };

  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const currentItems = recommended.slice(startIndex, startIndex + ITEM_PER_PAGE);
  const totalPages = Math.ceil(recommended.length / ITEM_PER_PAGE);

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/500";
    return path.startsWith("http") ? path : `${BASE_URL}/uploads/products/${path}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Preparing your delicious menu...</p>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-40 font-bold">Product not found.</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar className="bg-black" />

      <section className="max-w-7xl mx-auto px-4 py-12 pt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

          <div>
            <div className="aspect-square overflow-hidden mb-4 rounded-xl shadow-sm border bg-gray-50">
              <img src={getImageUrl(activeImage || (product.images ? product.images[0] : ""))} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-4 gap-4 accent-[#FF8906]">
              {product.images?.map((img, idx) => (
                <div key={idx} onClick={() => setActiveImage(img)} className="aspect-square overflow-hidden cursor-pointer border-2 rounded-xl hover:border-orange-500 transition">
                  <img src={getImageUrl(img)} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-7 mb-3">
              {product.discount_rate > 0 && (
                <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold w-fit">
                  FLASH SALE!
                </span>
              )}
            </div>

            <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-3">
              <span className="text-orange-500 text-3xl font-bold">IDR {finalDiscountPrice.toLocaleString('id-ID')}</span>
              {product.discount_rate > 0 && (
                <span className="text-gray-400 line-through text-lg font-medium">IDR {finalOriginalPrice.toLocaleString('id-ID')}</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm font-medium">
              <div className="text-yellow-400 text-lg">{"★".repeat(Math.round(product.rating))}</div>
              <span className="text-gray-600">({product.rating}) | {product.total_review} Review</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed font-medium">{product.desc}</p>

            <div className="mb-6 accent-[#FF8906]">
              <p className="font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 active:scale-95 transition">-</button>
                <span className="text-lg font-black">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 rounded-lg border border-orange-500 text-orange-500 font-bold hover:bg-orange-50 active:scale-95 transition">+</button>
              </div>
            </div>

            {product.sizes?.length > 0 && (
              <div className="mb-6 accent-[#FF8906]">
                <p className="font-medium mb-2">Choose Size</p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((item) => {
                    const displayLabels = { "R": "Regular", "M": "Medium", "L": "Large" };
                    const label = displayLabels[item.size_name] || item.size_name;
                    return (
                      <button
                        key={item.id_size}
                        onClick={() => setSelectedSize(item)}
                        className={`px-5 py-2 rounded-lg border transition-all font-bold text-sm flex gap-2 items-center justify-center ${selectedSize?.id_size === item.id_size
                            ? "border-orange-500 text-orange-500 bg-orange-50"
                            : "text-gray-500 border-gray-200 hover:border-orange-300"
                          }`}
                      >
                        {label}
                        {item.additional_price > 0 && <span className="text-xs font-normal opacity-70">(+{item.additional_price.toLocaleString('id-ID')})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.variants?.length > 0 && (
              <div className="mb-8 accent-[#FF8906]">
                <p className="font-medium mb-2">Variants</p>
                <div className="flex gap-3 flex-wrap accent-[#FF8906]">
                  {product.variants.map((item) => (
                    <button
                      key={item.id_variant}
                      onClick={() => setSelectedVariant(item)}
                      className={`px-8 py-2 rounded-lg border transition-all font-bold text-sm flex gap-2 items-center justify-center ${selectedVariant?.id_variant === item.id_variant
                          ? "border-orange-500 text-orange-500 bg-orange-50"
                          : "text-gray-500 border-gray-200 hover:border-orange-300"
                        }`}
                    >
                      {item.variant_name}
                      {item.additional_price > 0 && <span className="text-xs font-normal opacity-70">(+{item.additional_price.toLocaleString('id-ID')})</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-auto">
              <button onClick={() => handleAddToCart(true)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition active:scale-95 uppercase">
                Buy Now
              </button>
              <button onClick={() => handleAddToCart(false)} className="px-6 py-4 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition active:scale-90 flex items-center justify-center">
                <ShoppingCart size={24} />
              </button>
            </div>
          </div>
        </div>

        <section className="mt-24 pt-12 border-t border-gray-100">
          <h2 className="text-3xl font-semibold mb-10">
            Recommendation <span className="text-[#8E6447]">For You</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-h-87.5">
            {currentItems.map(item => (
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
            {currentItems.length === 0 && <p className="text-gray-500 italic">No recommendations found.</p>}
          </div>


          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 accent-[#FF8906]">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full transition font-bold text-sm ${currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </section>

      <Footer />
    </div>
  );
}
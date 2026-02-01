import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext"; 

export default function DetailProductPage() {
    const { id } = useParams();
    const location = useLocation();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(location.state?.product || null);
    const [recommended, setRecommended] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEM_PER_PAGE = 3;

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("Regular");
    const [temperature, setTemperature] = useState("Ice");

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/Vincentius31/koda-b6-react/refs/heads/main/src/data/menu.json")
            .then(res => res.json())
            .then(data => {
                const found = data.find(item => String(item.id) === id);
                setProduct(found || null);

                const filtered = data.filter(item => String(item.id) !== id);
                setRecommended(filtered);
            })
            .catch(() => {
                setProduct(null);
                setRecommended([]);
            });

        setQuantity(1);
        setSize("Regular");
        setTemperature("Ice");
    }, [id]);

    if (!product) {
        return <p className="p-6">Product not found</p>;
    }

    const handleAddToCart = () => {
        const newItem = {
            id: product.id,
            name: product.nameProduct,
            image: product.imageDepan,
            price: Number(product.priceDiscount),
            qty: quantity,
            size: size,
            temperature: temperature
        };
        addToCart(newItem);
    };

    const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
    const currentItems = recommended.slice(startIndex, startIndex + ITEM_PER_PAGE);
    const totalPages = Math.ceil(recommended.length / ITEM_PER_PAGE);

    return (
        <div>
            <Navbar className="bg-black" />

            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

                    {/* --- KODE DARI PRODUCT GALLERY --- */}
                    <div>
                        <div className="w-auto aspect-square overflow-hidden mb-4 mt-25">
                            <img
                                src={product.imageDepan}
                                alt={product.nameProduct}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[product.imageKedua, product.imageKetiga, product.imageKeempat].map((img, idx) => (
                                <div key={idx} className="aspect-square overflow-hidden cursor-pointer border hover:border-orange-500">
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- KODE DARI PRODUCT INFO --- */}
                    <div className="mt-25">
                        <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full mb-3">
                            FLASH SALE!
                        </span>
                        <h1 className="text-4xl font-semibold mb-2">{product.nameProduct}</h1>

                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-gray-400 line-through text-lg">IDR {product.priceProduct}</span>
                            <span className="text-orange-500 text-3xl font-bold">IDR {product.priceDiscount}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-sm">
                            <div className="text-orange-400">★★★★★</div>
                            <span className="text-gray-600">5.0 | 200+ Review</span>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <p className="font-medium mb-2">Quantity</p>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg border border-orange-500 text-orange-500 font-bold">-</button>
                                <span className="text-lg font-semibold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 rounded-lg bg-orange-500 text-white font-bold">+</button>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-6">
                            <p className="font-medium mb-2">Choose Size</p>
                            <div className="flex gap-3">
                                {["Regular", "Medium", "Large"].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setSize(item)}
                                        className={`px-5 py-2 rounded-lg border transition ${size === item ? "border-orange-500 text-orange-500 bg-orange-50" : "text-gray-500 border-gray-200"}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Temperature Selector */}
                        <div className="mb-8">
                            <p className="font-medium mb-2">Hot / Ice?</p>
                            <div className="flex gap-3">
                                {["Ice", "Hot"].map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setTemperature(item)}
                                        className={`px-8 py-2 rounded-lg border transition ${temperature === item ? "border-orange-500 text-orange-500 bg-orange-50" : "text-gray-500 border-gray-200"}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button onClick={handleAddToCart} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition">
                                Buy Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-4 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition"
                            >
                                <ShoppingCart />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RECOMMENDATION SECTION --- */}
                <section>
                    <h2 className="text-3xl font-semibold mb-10">
                        Recommendation <span className="text-[#8E6447]">For You</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {currentItems.map(item => (
                            <ProductCard
                                id={item.id}
                                name={item.nameProduct}
                                src={item.imageDepan}
                                description={item.description}
                                price={item.priceDiscount}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-3 mt-12">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-10 h-10 rounded-full transition ${currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </section>

            <Footer />
        </div>
    );
}
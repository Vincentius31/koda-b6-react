import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductCard from "../components/ProductCard"
import imgProductCard from "../assets/img/Image 30.png"
import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export default function DetailProductPage() {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);

    const [recommended, setRecommended] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const ITEM_PER_PAGE = 3


    useEffect(() => {
        fetch("https://raw.githubusercontent.com/Vincentius31/koda-b6-react/refs/heads/main/src/data/menu.json")
            .then(res => res.json())
            .then(data => {
                const found = data.find(item => String(item.id) === id);
                setProduct(found || null)

                const filtered = data.filter(item => String(item.id) !== id);
                setRecommended(filtered)
            })
            .catch(() => {
                setProduct(null)
                setRecommended([])
            });
    }, [id]);

    if (!product) {
        return <p className="p-6">Product not found</p>
    }

    const startIndex = (currentPage - 1) * ITEM_PER_PAGE
    const currentItems = recommended.slice(startIndex, startIndex + ITEM_PER_PAGE)
    const totalPages = Math.ceil(recommended.length / ITEM_PER_PAGE)

    return (
        <div>
            <Navbar className="bg-black" />

            {/* Product Showcase */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <ProductGallery img1={product.imageDepan} img2={product.imageKedua} img3={product.imageKetiga} img4={product.imageKeempat} />
                    <ProductInfo name={product.nameProduct} priceNormal={`IDR ${product.priceProduct}`} priceDiscount={`IDR ${product.priceDiscount}`} descriptionProduct={product.description}
                    />
                </div>

                <section>
                    <h2 className="text-3xl font-semibold mb-10">
                        Recommendation <span className="text-[#8E6447]">For You</span>
                    </h2>

                    {/* Product List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-300">
                        {currentItems.map(item => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                product={item}
                                name={item.nameProduct}
                                src={item.imageDepan}
                                description={item.description}
                                price={`IDR ${item.priceProduct}`}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-12">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-10 h-10 rounded-full ${currentPage === index + 1
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </section>

            <Footer />
        </div>
    )
}

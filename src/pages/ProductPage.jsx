import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Filter from "../components/Filter"
import Footer from "../components/Footer"
import imageHero from "../assets/img/Rectangle 299.png"
import imagePromoGreen from "../assets/img/person-product.png"
import imagePromoYellow from "../assets/img/person2-product.png"
import http, { BASE_URL } from "../lib/http"

const promos = [
    { bg: "bg-[#88B788]", img: imagePromoGreen, title: "HAPPY MOTHER'S DAY!", desc: "Get one of our favorite menu for free!", note: "Klaim Kupon" },
    { bg: "bg-[#88B788]", img: imagePromoGreen, title: "HAPPY MOTHER'S DAY!", desc: "Get one of our favorite menu for free!", note: "Klaim Kupon" },
    { bg: "bg-[#88B788]", img: imagePromoGreen, title: "HAPPY MOTHER'S DAY!", desc: "Get one of our favorite menu for free!", note: "Klaim Kupon" },
    { bg: "bg-[#F5C361]", img: imagePromoYellow, title: "Free Coffee", desc: "Get a cup of coffee for free on sunday morning", note: "Only at 7–9 AM" }
]

export default function ProductPage() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [products, setProducts] = useState([])
    const [meta, setMeta] = useState({ totalPages: 1, currentPage: 1 })
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [selectedCat, setSelectedCat] = useState("")
    const [selectedPromos, setSelectedPromos] = useState([]) // Penting: Agar Filter tidak crash
    const [priceRange, setPriceRange] = useState(200000)

    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        category: "",
        minPrice: "0",
        maxPrice: "50000"
    })

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                setIsLoading(true);

                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    search: appliedFilters.search,
                    category: appliedFilters.category,
                    min_price: appliedFilters.minPrice,
                    max_price: appliedFilters.maxPrice
                });

                const result = await http(`/products?${params.toString()}`);

                console.log("Data dari Backend:", result.data);

                if (result && result.success) {
                    const items = result.data?.items || result.data?.Items || [];
                    const metaData = result.data?.meta || result.data?.Meta;

                    setProducts(items);

                    if (metaData) {
                        setMeta({
                            totalPages: metaData.total_pages || metaData.totalPages || metaData.TotalPages || 1,
                            currentPage: metaData.current_page || metaData.currentPage || metaData.CurrentPage || 1
                        });
                    }
                }
            } catch (error) {
                console.error("Gagal memuat produk:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCatalog();
    }, [currentPage, appliedFilters]);

    // 2. Handlers
    const handleApplyFilter = () => {
        setAppliedFilters({
            search: searchValue,
            category: selectedCat,
            minPrice: "0",
            maxPrice: priceRange.toString()
        });
        setCurrentPage(1);
    }

    const handleReset = () => {
        setSearchValue("");
        setSelectedCat("");
        setSelectedPromos([]);
        setPriceRange(200000);
        setAppliedFilters({ search: "", category: "", minPrice: "0", maxPrice: "200000" });
        setCurrentPage(1);
    }

    const nextPromo = () => setCurrentIndex(prev => prev === promos.length - 1 ? 0 : prev + 1)
    const prevPromo = () => setCurrentIndex(prev => prev === 0 ? promos.length - 1 : prev - 1)

    return (
        <div className="bg-white min-h-screen">
            <Navbar className="bg-black" />

            {/* Hero */}
            <section className="relative h-75 bg-black">
                <img src={imageHero} alt="Hero" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center px-8 mx-10 py-10 pb-3">
                    <h1 className="text-white text-3xl md:text-4xl max-w-xl font-bold">
                        We Provide Good Coffee and Healthy Meals
                    </h1>
                </div>
            </section>

            {/* Promo Slider */}
            <section className="mt-10 px-15">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-black">Today <span className="text-[#8E6447]">Promo</span></h2>
                    <div className="flex gap-2">
                        <button onClick={prevPromo} className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:border-orange-500 transition cursor-pointer">←</button>
                        <button onClick={nextPromo} className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition cursor-pointer">→</button>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className="flex gap-4 transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 280}px)` }}>
                        {promos.map((promo, index) => (
                            <div key={index} className={`min-w-65 ${promo.bg} rounded-xl p-4 flex gap-3 shadow-sm`}>
                                <img src={promo.img} alt="promo" className="w-20 h-20 object-contain" />
                                <div className="text-black">
                                    <p className="font-bold text-sm">{promo.title}</p>
                                    <p className="text-xs">{promo.desc}</p>
                                    <span className="text-xs font-bold">{promo.note}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section className="pb-20">
                <h2 className="text-2xl font-semibold mb-10 pl-30 pt-10 text-black">Our <span className="text-orange-500">Product</span></h2>

                <div className="flex flex-col lg:flex-row gap-10 px-15 lg:px-30">

                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-1/4">
                        <Filter
                            searchValue={searchValue}
                            onSearchChange={setSearchValue}
                            onSearch={handleApplyFilter}
                            selectedCats={selectedCat ? [selectedCat] : []}
                            onCatChange={(cat) => setSelectedCat(cat)}
                            selectedPromo={selectedPromos}
                            onPromoChange={(promo) => setSelectedPromos(p => p.includes(promo) ? p.filter(pr => pr !== promo) : [...p, promo])}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                            onReset={handleReset}
                        />
                    </aside>

                    {/* Product Grid */}
                    <div className="w-full lg:w-3/4">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64 text-black">Loading catalog...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-24">
                                    {products.map((item) => {
                                        const imageSrc = item.image_path && item.image_path.startsWith("http")
                                            ? item.image_path
                                            : `${BASE_URL}/uploads/products/${item.image_path || 'default.jpg'}`;

                                        return (
                                            <ProductCard
                                                key={item.id_product}
                                                id={item.id_product}
                                                name={item.name}
                                                src={imageSrc}
                                                description={item.desc}
                                                rating={item.rating}
                                                price={item.discount_price}
                                                originalPrice={item.price}
                                                discountRate={item.discount_rate}
                                            />
                                        );
                                    })}
                                </div>

                                {products.length === 0 && (
                                    <div className="text-center py-20 text-gray-500">No products found.</div>
                                )}

                                {/* Pagination */}
                                {meta.totalPages > 1 && (
                                    <div className="flex justify-center mt-20 gap-3">
                                        {[...Array(meta.totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-10 h-10 rounded-full font-bold transition-all ${currentPage === i + 1 ? "bg-orange-500 text-white shadow-lg" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(p => p < meta.totalPages ? p + 1 : 1)}
                                            className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md"
                                        >
                                            →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Filter from "../components/Filter"
import Footer from "../components/Footer"
import imageHero from "../assets/img/Rectangle 299.png"
import imagePromoGreen from "../assets/img/person-product.png"
import imagePromoYellow from "../assets/img/person2-product.png"
import http, { BASE_URL } from "../lib/http"

export default function ProductPage() {
    const [currentIndex, setCurrentIndex] = useState(0)

    // --- State Data API ---
    const [products, setProducts] = useState([])
    const [promos, setPromos] = useState([]) // State baru untuk Promo dari DB
    const [meta, setMeta] = useState({ totalPages: 1, currentPage: 1 })
    const [isLoading, setIsLoading] = useState(true)

    // --- State Filter ---
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [selectedCat, setSelectedCat] = useState("")
    const [selectedPromos, setSelectedPromos] = useState([])
    const [priceRange, setPriceRange] = useState(50000)

    const [appliedFilters, setAppliedFilters] = useState({
        search: "", category: "", minPrice: "0", maxPrice: "50000"
    })

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const result = await http("/products/promos");
                
                if (result && result.success) {
                    let rawPromos = [];
                    if (Array.isArray(result.data)) {
                        rawPromos = result.data;
                    } else if (result.data?.items || result.data?.Items) {
                        rawPromos = result.data.items || result.data.Items;
                    }
                    
                    const uniquePromos = [];
                    const seenDescriptions = new Set();
                    
                    rawPromos.forEach(promo => {
                        const desc = promo.description || promo.Description;
                        const isFlash = promo.is_flash_sale ?? promo.IsFlashSale ?? false;
                        const rate = promo.discount_rate ?? promo.DiscountRate ?? 0;
                        const id = promo.id_discount ?? promo.IDDiscount ?? Math.random();

                        if (desc && !seenDescriptions.has(desc)) {
                            seenDescriptions.add(desc);
                            
                            uniquePromos.push({
                                id_discount: id,
                                description: desc,
                                is_flash_sale: isFlash,
                                discount_rate: rate
                            });
                        }
                    });

                    setPromos(uniquePromos);
                }
            } catch (error) {
                console.error("Gagal memuat promo:", error);
            }
        };
        fetchPromos();
    }, []);

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

    // Handlers
    const handleApplyFilter = () => {
        setAppliedFilters({ search: searchValue, category: selectedCat, minPrice: "0", maxPrice: priceRange.toString() });
        setCurrentPage(1);
    }

    const handleReset = () => {
        setSearchValue(""); setSelectedCat(""); setSelectedPromos([]); setPriceRange(50000);
        setAppliedFilters({ search: "", category: "", minPrice: "0", maxPrice: "50000" });
        setCurrentPage(1);
    }

    // Slider Logic Dinamis
    const nextPromo = () => setCurrentIndex(prev => prev >= promos.length - 3 ? 0 : prev + 1)
    const prevPromo = () => setCurrentIndex(prev => prev === 0 ? Math.max(0, promos.length - 3) : prev - 1)

    return (
        <div className="bg-white min-h-screen">
            <Navbar className="bg-black" />

            <section className="relative h-75 bg-black">
                <img src={imageHero} alt="Hero" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center px-8 mx-10 py-10 pb-3">
                    <h1 className="text-white text-3xl md:text-4xl max-w-xl font-bold">
                        We Provide Good Coffee and Healthy Meals
                    </h1>
                </div>
            </section>

            {/* Promo Slider Terhubung ke API */}
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
                        {promos.length > 0 ? promos.map((promo, index) => {
                            // Logika agar warna Hijau dan Kuning selang-seling
                            const isYellow = index % 2 !== 0;
                            const bgClass = isYellow ? "bg-[#F5C361]" : "bg-[#88B788]";
                            const imgSource = isYellow ? imagePromoYellow : imagePromoGreen;

                            return (
                                <div key={promo.id_discount || index} className={`min-w-65 ${bgClass} rounded-xl p-4 flex gap-3 shadow-sm`}>
                                    <img src={imgSource} alt="promo" className="w-20 h-20 object-contain" />
                                    <div className="text-black flex flex-col justify-center">
                                        <p className="font-bold text-sm">
                                            {promo.is_flash_sale ? "FLASH SALE!" : "SPECIAL PROMO"}
                                        </p>
                                        <p className="text-[11px] mt-1 mb-2 line-clamp-2 leading-tight">
                                            {promo.description}
                                        </p>
                                        <span className="text-[10px] font-bold bg-white/40 w-fit px-2 py-1 rounded">
                                            Discount {promo.discount_rate * 100}%
                                        </span>
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="text-gray-400 text-sm italic">No promos available today.</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <h2 className="text-2xl font-semibold mb-10 pl-30 pt-10 text-black">Our <span className="text-orange-500">Product</span></h2>

                <div className="flex flex-col lg:flex-row gap-10 px-15 lg:px-30">
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

                    <div className="w-full lg:w-3/4">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64 text-black font-medium">Loading catalog...</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24">
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
                                    <div className="text-center py-20 text-gray-500 font-medium">No products found.</div>
                                )}

                                {meta.totalPages > 1 && (
                                    <div className="flex justify-center mt-20 gap-3">
                                        {[...Array(meta.totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-10 h-10 rounded-full font-bold transition-all cursor-pointer ${currentPage === i + 1 ? "bg-orange-500 text-white shadow-lg" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(p => p < meta.totalPages ? p + 1 : 1)}
                                            className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md cursor-pointer"
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
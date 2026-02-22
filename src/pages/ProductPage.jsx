import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Filter from "../components/Filter"
import Footer from "../components/Footer"
import imageHero from "../assets/img/Rectangle 299.png"
import imagePromoGreen from "../assets/img/person-product.png"
import imagePromoYellow from "../assets/img/person2-product.png"
import { useEffect, useState } from "react"

const promos = [
    { bg: "bg-[#88B788]", img: imagePromoGreen, title: "HAPPY MOTHER'S DAY!", desc: "Get one of our favorite menu for free!", note: "Klaim Kupon" },
    { bg: "bg-[#88B788]", img: imagePromoGreen, title: "HAPPY MOTHER'S DAY!", desc: "Get one of our favorite menu for free!", note: "Klaim Kupon" },
    { bg: "bg-[#88B788]", img: imagePromoGreen, title: "HAPPY MOTHER'S DAY!", desc: "Get one of our favorite menu for free!", note: "Klaim Kupon" },
    { bg: "bg-[#F5C361]", img: imagePromoYellow, title: "Free Coffee", desc: "Get a cup of coffee for free on sunday morning", note: "Only at 7–9 AM" }
]

export default function ProductPage() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 6

    const [searchValue, setSearchValue] = useState("")
    const [selectedCats, setSelectedCats] = useState([])
    const [selectedPromos, setSelectedPromos] = useState([])
    const [priceRange, setPriceRange] = useState(50000)

    const [appliedFilters, setAppliedFilters] = useState({
        search: "",
        cats: [],
        promos: [],
        price: 50000
    })

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://raw.githubusercontent.com/Vincentius31/koda-b6-react/refs/heads/main/src/data/menu.json");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Gagal memuat produk:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const nextPromo = () => setCurrentIndex(prev => prev === promos.length - 1 ? 0 : prev + 1)
    const prevPromo = () => setCurrentIndex(prev => prev === 0 ? promos.length - 1 : prev - 1)


    const handleApplyFilter = () => {
        setAppliedFilters({
            search: searchValue,
            cats: selectedCats,
            promos: selectedPromos,
            price: priceRange
        })
        setCurrentPage(1)
    }

    const handleReset = () => {
        setSearchValue("")
        setSelectedCats([])
        setSelectedPromos([])
        setPriceRange(50000)
        setAppliedFilters({ search: "", cats: [], promos: [], price: 50000 })
        setCurrentPage(1)
    }

    const filteredProducts = products.filter(item => {
        const matchSearch = item.nameProduct?.toLowerCase().includes(appliedFilters.search.toLowerCase())
        const matchCat = appliedFilters.cats.length === 0 || appliedFilters.cats.includes(item.category)
        const matchPromo = appliedFilters.promos.length === 0 || appliedFilters.promos.includes(item.promoType)
        const matchPrice = item.priceDiscount <= appliedFilters.price
        return matchSearch && matchCat && matchPromo && matchPrice
    })

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const currentProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div>
            <Navbar className="bg-black" />
            <section className="relative h-75 bg-black">
                <img src={imageHero} alt="Hero" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center px-8 mx-10 py-10 pb-3">
                    <h1 className="text-white text-3xl md:text-4xl max-w-xl">We Provide Good Coffee and Healthy Meals</h1>
                </div>
            </section>

            <section className="mt-10">
                <div className="flex justify-between items-center px-15">
                    <h2 className="text-3xl font-semibold mb-4">Today <span className="text-[#8E6447]">Promo</span></h2>
                    <div className="flex gap-2">
                        <button onClick={prevPromo} className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:border-orange-500 transition">←</button>
                        <button onClick={nextPromo} className="w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center hover:bg-orange-600 transition">→</button>
                    </div>
                </div>
                <div className="overflow-hidden px-15">
                    <div className="flex gap-4 transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 280}px)` }}>
                        {promos.map((promo, index) => (
                            <div key={index} className={`min-w-65 ${promo.bg} rounded-xl p-4 flex gap-3`}>
                                <img src={promo.img} alt="promo" className="w-20 h-20" />
                                <div>
                                    <p className="font-bold text-sm">{promo.title}</p>
                                    <p className="text-xs">{promo.desc}</p>
                                    <span className="text-xs">{promo.note}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 mt-6 px-15">
                    {promos.map((_, index) => (
                        <span key={index} className={`h-1.5 rounded-full transition-all ${index === currentIndex ? "w-4 bg-orange-500" : "w-1.5 bg-gray-300"}`} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6 pl-30 pt-10">Our <span className="text-orange-500">Product</span></h2>
                <div className="flex flex-col lg:flex-row gap-50 pl-25">
                    <Filter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onSearch={handleApplyFilter}
                        selectedCats={selectedCats}
                        onCatChange={(cat) => setSelectedCats(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat])}
                        selectedPromo={selectedPromos}
                        onPromoChange={(promo) => setSelectedPromos(p => p.includes(promo) ? p.filter(pr => pr !== promo) : [...p, promo])}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        onReset={handleReset}
                    />
                    <div className="flex-2 max-w-180 ml-18">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 auto-rows-fr">
                            {currentProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.nameProduct}
                                    src={item.imageProduct ? item.imageProduct[0] : ""}
                                    description={item.description}
                                    price={item.priceDiscount}
                                />
                            ))}
                            {currentProducts.length === 0 && (
                                <p className="col-span-full text-center py-20 text-gray-500">Produk tidak ditemukan.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10 gap-3 pb-10 pl-30">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-full ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-gray-200"}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => setCurrentPage(p => p < totalPages ? p + 1 : 1)} className="w-8 h-8 rounded-full bg-orange-500 text-white">→</button>
                </div>
            </section>
            <Footer />
        </div>
    )
}
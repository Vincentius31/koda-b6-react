import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProductGallery from "../components/ProductGallery"
import img1 from "../assets/img/Image 31.png"
import img2 from "../assets/img/Image 32.png"
import img3 from "../assets/img/Image 33.png"
import img4 from "../assets/img/Image 34.png"
import ProductInfo from "../components/ProductInfo"
import ProductCard from "../components/ProductCard"
import imgProductCard from "../assets/img/Image 30.png"




export default function DetailProductPage() {
    return (
        <div>
            <Navbar className="bg-black" />

            {/* Product Showcase */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <ProductGallery img1={img1} img2={img2} img3={img3} img4={img4} />
                    <ProductInfo name={"Hazelnut Latte"} priceNormal={"IDR 20.000"} priceDiscount={"IDR 10.000"}
                        descriptionProduct={"Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours."}
                    />
                </div>

                <section>
                    <h2 className="text-3xl font-semibold mb-10">
                        Recommendation <span className="text-[#8E6447]">For You</span>
                    </h2>

                    {/* Product List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-300">
                        <ProductCard name={"Hazelnut Latte"} src={imgProductCard} 
                        description={"You can explore the menu that we provide with fun and have their own taste and make your day better."} price={"IDR 20.000"}/>
                        <ProductCard name={"Hazelnut Latte"} src={imgProductCard} 
                        description={"You can explore the menu that we provide with fun and have their own taste and make your day better."} price={"IDR 20.000"}/>
                        <ProductCard name={"Hazelnut Latte"} src={imgProductCard} 
                        description={"You can explore the menu that we provide with fun and have their own taste and make your day better."} price={"IDR 20.000"}/>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-12">
                        <button className="w-10 h-10 rounded-full bg-orange-500 text-white">
                            1
                        </button>

                        <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                            2
                        </button>

                        <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                            3
                        </button>

                        <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                            4
                        </button>

                        <button className="w-10 h-10 rounded-full bg-orange-500 text-white">
                            →
                        </button>
                    </div>
                </section>
            </section>

            <Footer />
        </div>
    )
}

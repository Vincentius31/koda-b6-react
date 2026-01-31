import Navbar from "../components/Navbar"
import imageHero from "../assets/img/Rectangle 299.png"
import imagePromoGreen from "../assets/img/person-product.png"
import imagePromoYellow from "../assets/img/person2-product.png"
import ProductCard from "../components/ProductCard"
import Filter from "../components/Filter"
import imageProduct from "../assets/img/image 27.png"
import Footer from "../components/Footer"

export default function ProductPage() {
    return (
        <div>
            <Navbar className="bg-black" />

            {/* Hero Section */}
            <section className="relative h-75 bg-black">
                <img
                    src={imageHero}
                    alt="Hero"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center px-8 mx-10 py-10 pb-3 font-normal">
                    <h1 className="text-white text-3xl md:text-4xl max-w-xl">
                        We Provide Good Coffee and Healthy Meals
                    </h1>
                </div>
            </section>

            {/* Promo Section */}
            <section className="mt-10">
                <div className="flex gap-250 pl-15">
                    <h2 className="text-3xl font-semibold mb-4 ml-15">Today <span className="text-[#8E6447]">Promo</span></h2>
                    <div className="flex gap-2 justify-items-end-safe">
                        <button onclick="prevTestimonial()"
                            class="w-10 h-10 text-bold rounded-full border border-gray-500 flex items-center justify-center hover:border-orange-500 transition">
                            ←
                        </button>
                        <button onclick="nextTestimonial()"
                            class="w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center hover:bg-orange-600 transition">
                            →
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-3 pl-15">
                    <div className="min-w-70 bg-[#88B788] rounded-xl p-4 flex gap-3">
                        <img src={imagePromoGreen} alt="image-promo" className="w-20 h-20" />
                        <div>
                            <p className="font-bold text-sm">HAPPY MOTHER'S DAY!</p>
                            <p className="text-xs">
                                Get one of our favorite menu for free!
                            </p>
                            <span className="text-xs text-[#FFFFFF]">Klaim Kupon</span>
                        </div>
                    </div>

                    <div className="min-w-70 bg-[#88B788] rounded-xl p-4 flex gap-3">
                        <img src={imagePromoGreen} alt="image-promo" className="w-20 h-20" />
                        <div>
                            <p className="font-bold text-sm">HAPPY MOTHER'S DAY!</p>
                            <p className="text-xs">
                                Get one of our favorite menu for free!
                            </p>
                            <span className="text-xs text-[#FFFFFF]">Klaim Kupon</span>
                        </div>
                    </div>

                    <div className="min-w-70 bg-[#88B788] rounded-xl p-4 flex gap-3">
                        <img src={imagePromoGreen} alt="image-promo" className="w-20 h-20" />
                        <div>
                            <p className="font-bold text-sm">HAPPY MOTHER'S DAY!</p>
                            <p className="text-xs">
                                Get one of our favorite menu for free!
                            </p>
                            <span className="text-xs text-[#FFFFFF]">Klaim Kupon</span>
                        </div>
                    </div>

                    <div className="min-w-70 bg-[#F5C361] rounded-xl p-4 flex gap-3">
                        <img src={imagePromoYellow} alt="image-promo" className="w-20 h-20" />
                        <div>
                            <p className="font-bold text-sm">Free Coffee</p>
                            <p className="text-xs">
                                Get a cup of coffee for free on sunday morning
                            </p>
                            <span className="text-xs">Only at 7–9 AM</span>
                        </div>
                    </div>
                </div>

                <div class="flex gap-2 mt-6 ml-15 pl-15">
                    <span class="w-3 h-1.5 rounded-full bg-orange-500"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6 pl-30 pt-10">
                    Our <span className="text-orange-500">Product</span>
                </h2>

                <div className="flex flex-col lg:flex-row gap-50 pl-25">
                    <Filter />

                    <div className="flex-2 max-w-175">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 auto-rows-fr">
                            <ProductCard
                                name={"Hazelnut Latte"}
                                src={imageProduct}
                                description={"You can explore the menu that we provide with fun and have their own taste and make your day better."}
                                price={"IDR 20.000"}>
                            </ProductCard>
                            <ProductCard
                                name={"Hazelnut Latte"}
                                src={imageProduct}
                                description={"You can explore the menu that we provide with fun and have their own taste and make your day better."}
                                price={"IDR 20.000"}>
                            </ProductCard>
                            <ProductCard
                                name={"Hazelnut Latte"}
                                src={imageProduct}
                                description={"You can explore the menu that we provide with fun and have their own taste and make your day better."}
                                price={"IDR 20.000"}>
                            </ProductCard>
                            <ProductCard
                                name={"Hazelnut Latte"}
                                src={imageProduct}
                                description={"You can explore the menu that we provide with fun and have their own taste and make your day better."}
                                price={"IDR 20.000"}>
                            </ProductCard>
                            <ProductCard
                                name={"Hazelnut Latte"}
                                src={imageProduct}
                                description={"You can explore the menu that we provide with fun and have their own taste and make your day better."}
                                price={"IDR 20.000"}>
                            </ProductCard>
                            <ProductCard
                                name={"Hazelnut Latte"}
                                src={imageProduct}
                                description={"You can explore the menu that we provide with fun and have their own taste and make your day better."}
                                price={"IDR 20.000"}>
                            </ProductCard>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10 gap-3 pb-10 pl-30">
                    <button className="w-8 h-8 rounded-full bg-orange-500 text-white">
                        1
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-200">2</button>
                    <button className="w-8 h-8 rounded-full bg-gray-200">3</button>
                    <button className="w-8 h-8 rounded-full bg-gray-200">4</button>
                    <button className="w-8 h-8 rounded-full bg-orange-500 text-white">→</button>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

// Import Component
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"

// Import Image
import imageRight from "../assets/img/Rectangle 287.png"
import imageBarista from "../assets/img/Rectangle 291.png"
import imageGlobal from "../assets/img/Huge Global.png"
import { CircleCheck, MessageCircleMore } from "lucide-react"
import imageProduct from "../assets/img/image 27.png"
import imageTesti from "../assets/img/Rectangle 295.png"


export default function HomePage() {
    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="bg-linear-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-center px-10 lg:px-20">
                    <div className="max-w-md">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Start Your Day with Coffee and Good Meals
                        </h1>
                        <p className="text-gray-300 mt-5 text-sm leading-relaxed">
                            We provide high quality beans, good taste, and healthy meals made by love just for you.
                            Start your day with us for a bigger smile.
                        </p>

                        <button
                            className="mt-8 bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-lg text-white font-semibold">
                            Get Started
                        </button>

                        <div className="flex gap-10 mt-12">
                            <div>
                                <h3 className="text-4xl font-400 text-orange-400">90+</h3>
                                <p className="text-xs text-gray-300">Staff</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-400 text-orange-400">30+</h3>
                                <p className="text-xs text-gray-300">Stores</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-400 text-orange-400">800+</h3>
                                <p className="text-xs text-gray-300">Customer</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <img src={imageRight} alt="Coffee" className="w-full h-full object-cover" />
                    <button className="absolute bottom-10 right-10 bg-orange-500 p-4 rounded-full shadow-lg">
                        <MessageCircleMore className="w-6 h-6" />
                    </button>
                </div>
            </section>

            {/* Benefit Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="flex items-center px-10 lg:px-24">
                    <div className="max-w-md">

                        <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                            We Provide <span className="text-[#8E6447]">Good <br /> Coffee</span> and <span className="text-[#8E6447]">Healthy <br /> Meals</span>
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                            You can explore the menu that we provide with fun and have their own taste.
                        </p>

                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <CircleCheck color="green" className="w-5 h-5 mt-1 text-white" />
                                <span>High quality beans</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CircleCheck color="green" className="w-5 h-5 mt-1 text-white" />
                                <span>Healthy meals, you can request the ingredients</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CircleCheck color="green" className="w-5 h-5 mt-1 text-white" />
                                <span>Chat with our staff to get better experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CircleCheck color="green" className="w-5 h-5 mt-1 text-white" />
                                <span>Free member card with a minimum purchase of IDR 200.000</span>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="relative">
                    <img src={imageBarista} alt="Barista" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </section>

            {/* Favourite Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-3xl font-bold mb-4">Here is People’s <span className="text-[#8E6447]">Favorite</span></h2>
                    <p className="text-center text-gray-500 text-sm mb-12">
                        Let’s choose and have a bit of people’s favorite. It might be yours too!
                    </p>
                    <div id="menu-favourite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
            </section>

            {/* Global Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        <span className="text-[#8E6447]">Visit Our Store</span> in the Spot on the Map Below
                    </h2>
                    <p className="text-gray-500 text-sm mb-10">
                        See our store in every city on the spot and choose your nearest store.
                    </p>
                    <img src={imageGlobal} className="mx-auto px-10 " />
                </div>
            </section>

            {/* Testimonial Section */}
            <section class="bg-linear-to-r from-gray-900 to-black py-24">
                <div class="container mx-auto px-6">
                    <div class="relative overflow-hidden">
                        <div id="testimonialSlider" class="flex transition-transform duration-500 ease-in-out">
                            <div class="min-w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
                                <div class="flex justify-center">
                                    <img src={imageTesti} alt="Viezh Robert"
                                        class="w-105 h-65 object-cover"/>
                                </div>
                                <div>
                                    <span class="text-xs tracking-widest text-orange-400 uppercase">
                                        Testimonial
                                    </span>
                                    <h3 class="text-2xl font-semibold mt-2">
                                        Viezh Robert
                                    </h3>
                                    <p class="text-sm text-gray-400 mb-4">
                                        Manager Coffee Shop
                                    </p>
                                    <p class="text-gray-200 text-sm leading-relaxed mb-6 max-w-md">
                                        “Wow… I am very happy to spend my whole day here.
                                        The Wi-Fi is good, and the coffee and meals make me feel
                                        comfortable. Very recommended!”
                                    </p>
                                    <div class="flex items-center gap-3 mb-6">
                                        <div class="text-orange-400 text-lg">
                                            ★ ★ ★ ★ ★
                                        </div>
                                        <span class="text-sm text-gray-300">5.0</span>
                                    </div>
                                    <div class="flex gap-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

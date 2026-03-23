// Import Component
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Import Image
import imageRight from "../assets/img/Rectangle 287.png"
import imageBarista from "../assets/img/Rectangle 291.png"
import imageGlobal from "../assets/img/Huge Global.png"
import { CircleCheck, MessageCircleMore, Star, ArrowLeft, ArrowRight } from "lucide-react"
import imageTesti from "../assets/img/Rectangle 295.png"
import http from "../lib/http"

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await http("/landing/recommended-products");
                if (productRes && productRes.success) {
                    setProducts(productRes.data);
                }

                const reviewRes = await http("/landing/reviews");
                if (reviewRes && reviewRes.success) {
                    setReviews(reviewRes.data);
                }

            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gray-900">
                <div className="order-2 lg:order-1 bg-linear-to-b from-gray-900 to-gray-800 text-white flex flex-col justify-center px-8 py-16 lg:py-0 lg:px-20">
                    <div className="max-w-md mx-auto lg:mx-0">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Start Your Day with Coffee and Good Meals
                        </h1>
                        <p className="text-gray-300 mt-5 text-sm md:text-base leading-relaxed">
                            We provide high quality beans, good taste, and healthy meals made by love just for you.
                            Start your day with us for a bigger smile.
                        </p>

                        <button className="mt-8 bg-[#FF8906] hover:bg-orange-600 transition px-8 py-3 rounded-lg text-white font-semibold">
                            Get Started
                        </button>

                        <div className="flex gap-10 mt-12">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold text-[#FF8906]">90+</h3>
                                <p className="text-xs md:text-sm text-gray-300 mt-1">Staff</p>
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold text-[#FF8906]">30+</h3>
                                <p className="text-xs md:text-sm text-gray-300 mt-1">Stores</p>
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold text-[#FF8906]">800+</h3>
                                <p className="text-xs md:text-sm text-gray-300 mt-1">Customer</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2 relative h-[50vh] lg:h-auto lg:min-h-screen">
                    <img src={imageRight} alt="Coffee" className="w-full h-full object-cover" />
                    <button className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-[#FF8906] p-4 rounded-full shadow-lg">
                        <MessageCircleMore className="w-6 h-6 text-white" />
                    </button>
                </div>
            </section>

            {/* Benefit Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Teks di bawah saat mobile, di kiri saat desktop */}
                <div className="order-2 lg:order-1 flex items-center px-8 py-16 lg:py-0 lg:px-24">
                    <div className="max-w-md mx-auto lg:mx-0">

                        <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                            We Provide <span className="text-[#8E6447]">Good <br className="hidden lg:block" /> Coffee</span> and <span className="text-[#8E6447]">Healthy <br className="hidden lg:block" /> Meals</span>
                        </h2>

                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                            You can explore the menu that we provide with fun and have their own taste.
                        </p>

                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <CircleCheck className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                                <span className="text-sm md:text-base text-gray-700">High quality beans</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CircleCheck className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                                <span className="text-sm md:text-base text-gray-700">Healthy meals, you can request the ingredients</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CircleCheck className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                                <span className="text-sm md:text-base text-gray-700">Chat with our staff to get better experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CircleCheck className="w-5 h-5 mt-1 text-green-500 shrink-0" />
                                <span className="text-sm md:text-base text-gray-700">Free member card with a minimum purchase of IDR 200.000</span>
                            </li>
                        </ul>

                    </div>
                </div>

                <div className="order-1 lg:order-2 relative h-[50vh] lg:h-auto lg:min-h-screen">
                    <img src={imageBarista} alt="Barista" className="w-full h-full object-cover" />
                </div>
            </section>

            {/* Favourite Section */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-center text-3xl font-bold mb-4">Here is People’s <span className="text-[#8E6447]">Favorite</span></h2>
                    <p className="text-center text-gray-500 text-sm md:text-base mb-12">
                        Let’s choose and have a bit of people’s favorite. It might be yours too!
                    </p>
                    <div id="menu-favourite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {isLoading ? (
                            <p className="text-center col-span-full">Sedang meracik menu favorit...</p>
                        ) : products.length === 0 ? (
                            <p className="text-center col-span-full">Data produk kosong</p>
                        ) : (
                            products.map((item) => (
                                <ProductCard
                                    key={item.id_product}
                                    id={item.id_product}
                                    name={item.name}
                                    src={item.image_path}
                                    description={item.desc}
                                    price={item.price}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Global Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <h2 className="text-3xl font-bold mb-4">
                        <span className="text-[#8E6447]">Visit Our Store</span> in the Spot on the Map Below
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mb-10">
                        See our store in every city on the spot and choose your nearest store.
                    </p>
                    <img src={imageGlobal} className="mx-auto px-4 lg:px-0 w-full max-w-4xl object-contain" alt="Map" />
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="bg-[#0B0D17] py-24 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="relative">
                        {reviews.length === 0 ? (
                            <p className="text-center text-gray-400">Belum ada ulasan.</p>
                        ) : (
                            <div id="testimonialSlider" className="flex transition-transform duration-500 ease-in-out">
                                <div className="min-w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto text-white">

                                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                                        <img
                                            src={reviews[currentIndex].profile_picture || imageTesti}
                                            alt={reviews[currentIndex].fullname}
                                            className="w-full max-w-sm lg:max-w-md h-64 md:h-80 object-cover rounded-sm shadow-lg"
                                        />
                                    </div>

                                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                                        <span className="text-xs tracking-widest text-[#FF8906] uppercase mb-4 font-bold">
                                            Testimonial
                                        </span>

                                        <div className="flex flex-col lg:flex-row gap-4 mb-4 items-center">
                                            <div className="hidden lg:block w-1 h-12 bg-[#FF8906]"></div>
                                            <div className="py-1">
                                                <h3 className="text-3xl lg:text-4xl font-semibold">
                                                    {reviews[currentIndex].fullname}
                                                </h3>
                                                <p className="text-[#FF8906] text-sm mt-2 font-medium">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 mt-2 max-w-md italic">
                                            “{reviews[currentIndex].messages}”
                                        </p>

                                        <div className="flex items-center gap-2 mb-8">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 ${i < Math.round(reviews[currentIndex].rating) ? "text-[#FF8906] fill-[#FF8906]" : "text-gray-600 fill-transparent"}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-300 ml-2 font-semibold">
                                                {reviews[currentIndex].rating.toFixed(1)}
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-center lg:items-start gap-6">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handlePrev}
                                                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition cursor-pointer shadow-md">
                                                    <ArrowLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    className="w-12 h-12 rounded-full bg-[#FF8906] text-white flex items-center justify-center hover:bg-orange-600 transition cursor-pointer shadow-md">
                                                    <ArrowRight className="w-6 h-6" />
                                                </button>
                                            </div>

                                            <div className="flex gap-2">
                                                {reviews.map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#FF8906]" : "w-2 bg-gray-600"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
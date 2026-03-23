import logoBrown from "../assets/img/Logo-Brown.png"
import facebookOrange from "../assets/img/facebook-orange.png"
import instagramOrange from "../assets/img/instagram-orange.png"
import twitterOrange from "../assets/img/twitter-orange.png"

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-8 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">

                <div className="flex flex-col items-start">
                    <img src={logoBrown} alt="Coffee Shop" className="h-8 mb-6" />
                    <p className="text-gray-500 leading-relaxed pr-4">
                        Coffee Shop is a store that sells some good meals,
                        and especially coffee.
                    </p>
                    <p className="mt-8 text-gray-400 font-medium">©2026 CoffeeStore</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 text-base mb-6">Product</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Our Product</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Pricing</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Locations</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Countries</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Blog</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 text-base mb-6">Engage</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Partner</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">FAQ</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">About Us</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-[#FF8906] transition cursor-pointer">Terms of Service</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-gray-800 text-base mb-6">Social Media</h4>
                    <div className="flex gap-4">
                        <img src={facebookOrange} alt="Facebook" className="h-8 w-8 hover:scale-110 transition cursor-pointer" />
                        <img src={twitterOrange} alt="Twitter" className="h-8 w-8 hover:scale-110 transition cursor-pointer" />
                        <img src={instagramOrange} alt="Instagram" className="h-8 w-8 hover:scale-110 transition cursor-pointer" />
                    </div>
                </div>

            </div>
        </footer>
    )
}
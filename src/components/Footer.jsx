import logoBrown from "../assets/img/Logo-Brown.png"
import facebookOrange from "../assets/img/facebook-orange.png"
import instagramOrange from "../assets/img/instagram-orange.png"
import twitterOrange from "../assets/img/twitter-orange.png"

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-10 ps-20">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
            <div className="pt-9">
                <img src={logoBrown} className="h-8 mb-4"/>
                <p className="text-gray-500">
                    Coffee Shop is a store that sells some good meals,
                    and especially coffee.
                </p>
                <p className="mt-6 text-gray-400">©2020CoffeeStore</p>
            </div>

            <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-500">
                    <li>Our Product</li>
                    <li>Pricing</li>
                    <li>Locations</li>
                    <li>Countries</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-4">Engage</h4>
                <ul className="space-y-2 text-gray-500">
                    <li>Partner</li>
                    <li>FAQ</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold mb-4">Social Media</h4>
                <div className="flex gap-4">
                    <img src={facebookOrange} className="h-8"/>
                    <img src={twitterOrange} className="h-8"/>
                    <img src={instagramOrange} className="h-8"/>
                </div>
            </div>
        </div>
    </footer>
  )
}

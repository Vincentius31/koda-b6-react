// Image Import
import pictureLeft from "../assets/img/Rectangle 292.png"
import logoBrown from "../assets/img/Logo-Brown.png"
import { Mail } from 'lucide-react'

// Component Import
import Input from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";

export const ForgotPassPage = () => {
    return (
        <div>
            <section className="register-container flex min-h-screen flex-col md:flex-row">
                {/* Image Left */}
                <div className="register-image md:w-[45%] h-55 md:h-auto">
                    <img src={pictureLeft} alt="Coffee" className="w-full h-full object-cover" />
                </div>

                {/* Section Right */}
                <section className="register-form md:w-[55%] flex items-center justify-center py-8">
                    <div className="form-wrapper w-[90%] md:w-[70%]">
                        {/* Section Logo, Title, and Sub Title */}
                        <img src={logoBrown} alt="Coffee Shop" className="logo w-30 mb-5" />
                        <h2 className="text-brown text-2xl font-semibold mb-1">Fill out the form correctly</h2>
                        <p className="content text-gray-400 mb-6">We will send new password to your email</p>

                        {/* Section Form */}
                        <form className="flex flex-col gap-6">
                            <Input label={"Email"} type={"email"} placeholder={"Enter Your Email"} icon={Mail} />
                        </form>

                        {/* Button Register */}
                        <PrimaryButton>Submit</PrimaryButton>

                    </div>
                </section>

            </section>
        </div>
    )
}

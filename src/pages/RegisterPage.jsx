// Image Import
import pictureLeft from "../assets/img/Rectangle 289.png"
import logoBrown from "../assets/img/Logo-Brown.png"
import logoFacebook from "../assets/img/facebook.png"
import logoGoogle from "../assets/img/google.png"
import { Mail, User } from 'lucide-react'

// Component Import
import Input from "../components/Input";
import Password from "../components/Password";
import { PrimaryButton } from "../components/PrimaryButton";

export default function RegisterPage() {

  return (
    <div>
      <section className="register-container flex min-h-screen flex-col md:flex-row">
        {/* Image Left */}
        <div className="register-image md:w-[45%] h-[220px] md:h-auto">
          <img src={pictureLeft} alt="Coffee" className="w-full h-full object-cover" />
        </div>

        {/* Section Right */}
        <section className="register-form md:w-[55%] flex items-center justify-center py-8">
          <div className="form-wrapper w-[90%] md:w-[70%]">
            {/* Section Logo, Title, and Sub Title */}
            <img src={logoBrown} alt="Coffee Shop" className="logo w-[120px] mb-5" />
            <h2 className="text-brown text-2xl font-semibold mb-1">Register</h2>
            <p className="content text-gray-400 mb-6">Fill out the form correctly</p>

            {/* Section Form */}
            <form className="flex flex-col gap-6">
              <Input label={"Full Name"} type={"text"} placeholder={"Enter Your Full Name"} icon={User} />
              <Input label={"Email"} type={"email"} placeholder={"Enter Your Email"} icon={Mail} />
              <Password label={"Password"} placeholder={"Enter Your Password"} />
              <Password label={"Confirm Password"} placeholder={"Enter Your Password"} />
            </form>

            {/* Button Register */}
            <PrimaryButton>Register</PrimaryButton>

            <p className="login-text text-center text-sm my-4">
              Have An Account?
              <a href="login.html" className="text-primary ml-1 hover:underline text-[#FF8906]">Login</a>
            </p>

            <div className="divider flex items-center my-6">
              <span className="flex-1 h-px bg-gray-300"></span>
              <p className="mx-3 text-sm text-gray-400">Or</p>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            <div className="social-login grid grid-cols-2 gap-4">
              <a href="#"
                class="social flex items-center justify-center gap-2 border rounded-md py-3 hover:bg-gray-100">
                <img src={logoFacebook} className="w-5"/>
                  Facebook
              </a>
              <a href="#"
                className="social flex items-center justify-center gap-2 border rounded-md py-3 hover:bg-gray-100">
                <img src={logoGoogle} className="w-5"/>
                  Google
              </a>
            </div>
          </div>
        </section>

      </section>
    </div>
  );
}
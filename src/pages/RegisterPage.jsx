// Image and Icon Import
import pictureLeft from "../assets/img/Rectangle 289.png"
import logoBrown from "../assets/img/Logo-Brown.png"
import logoFacebook from "../assets/img/facebook.png"
import logoGoogle from "../assets/img/google.png"
import { Mail, User } from 'lucide-react'

// Component Import
import Input from "../components/Input";
import Password from "../components/Password";
import { PrimaryButton } from "../components/PrimaryButton";

// Library Import
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm} from "react-hook-form"

const schema = yup.object({
  fullname: yup.string().required("Full name wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().min(4, "Minimal 4 karakter").required("Password wajib diisi"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], "Password tidak sama").required("Confirm password wajib diisi"),
})

export default function RegisterPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const emailExist = users.find(user=> user.email === data.email)

    if(emailExist){
      alert("Email sudah terdaftar")
      return
    }

    users.push({
      fullName: data.fullName,
      email: data.email,
      password: data.password
    })

    localStorage.setItem("users", JSON.stringify(users))
    alert("Register berhasil")
    navigate("/login")
  }

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
            <h2 className="text-brown text-2xl font-semibold mb-1">Register</h2>
            <p className="content text-gray-400 mb-6">Fill out the form correctly</p>

            {/* Section Form */}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
              <Input 
                label={"Full Name"} 
                type={"text"} 
                placeholder={"Enter Your Full Name"} 
                icon={User} 
                register={register("fullname")}
                error={errors.fullname?.message}
              />
              <Input 
                label={"Email"} 
                type={"email"} 
                placeholder={"Enter Your Email"} 
                icon={Mail}
                register={register("email")}
                error={errors.email?.message} 
              />
              <Password 
                label={"Password"} 
                placeholder={"Enter Your Password"}
                register={register("password")}
                error={errors.password?.message} 
              />
              <Password 
                label={"Confirm Password"} 
                placeholder={"Enter Your Password"}
                register={register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <PrimaryButton>Register</PrimaryButton>
            </form>
            
            <p className="login-text text-center text-sm my-4">
              Have An Account?
              <Link to={"/login"} className="text-primary ml-1 hover:underline text-[#FF8906]">Login</Link>
            </p>

            <div className="divider flex items-center my-6">
              <span className="flex-1 h-px bg-gray-300"></span>
              <p className="mx-3 text-sm text-gray-400">Or</p>
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            <div className="social-login grid grid-cols-2 gap-4">
              <a href="#"
                className="social flex items-center justify-center gap-2 border rounded-md py-3 hover:bg-gray-100">
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
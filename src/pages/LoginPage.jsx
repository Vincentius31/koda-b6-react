// Image Import
import pictureLeft from "../assets/img/Rectangle 290.png";
import logoBrown from "../assets/img/Logo-Brown.png";
import logoFacebook from "../assets/img/facebook.png";
import logoGoogle from "../assets/img/google.png";
import { Mail } from 'lucide-react';

// Component Import
import Input from "../components/Input";
import Password from "../components/Password";
import { PrimaryButton } from "../components/PrimaryButton";

// Library Import
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../context/AuthContext";

const schema = yup.object({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("Password wajib diisi")
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    const result = loginUser(data.email, data.password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Login berhasil");
    navigate("/");
  };

  return (
    <section className="register-container flex min-h-screen flex-col md:flex-row">

      {/* Image Left */}
      <div className="register-image md:w-[45%] h-55 md:h-auto">
        <img src={pictureLeft} alt="Coffee" className="w-full h-full object-cover" />
      </div>

      {/* Right Section */}
      <section className="register-form md:w-[55%] flex items-center justify-center py-8">
        <div className="form-wrapper w-[90%] md:w-[70%]">

          <img src={logoBrown} alt="Coffee Shop" className="logo w-30 mb-5" />
          <h2 className="text-brown text-2xl font-semibold mb-1">Login</h2>
          <p className="content text-gray-400 mb-6">Fill out the form correctly</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            <Input 
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              icon={Mail}
              register={register("email")}
              error={errors.email?.message}
            />

            <Password 
              label="Password"
              placeholder="Enter Your Password"
              register={register("password")}
              error={errors.password?.message}
            />

            <Link to="/forgot" className="text-[#FF8906] text-right text-sm">
              Forgot Password?
            </Link>

            <PrimaryButton>Login</PrimaryButton>
          </form>

          <div className="divider flex items-center my-6">
            <span className="flex-1 h-px bg-gray-300"></span>
            <p className="mx-3 text-sm text-gray-400">Or</p>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>

          <div className="social-login grid grid-cols-2 gap-4">
            <div className="social flex items-center justify-center gap-2 border rounded-md py-3 hover:bg-gray-100">
              <img src={logoFacebook} className="w-5" />
              Facebook
            </div>
            <div className="social flex items-center justify-center gap-2 border rounded-md py-3 hover:bg-gray-100">
              <img src={logoGoogle} className="w-5" />
              Google
            </div>
          </div>

        </div>
      </section>
    </section>
  );
}

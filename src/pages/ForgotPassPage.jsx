import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../lib/http"; 

// Image Import
import pictureLeft from "../assets/img/Rectangle 292.png";
import logoBrown from "../assets/img/Logo-Brown.png";
import { Mail, Key } from 'lucide-react'; 

// Component Import
import Input from "../components/Input";
import Password from "../components/Password"; 
import { PrimaryButton } from "../components/PrimaryButton";

export default function ForgotPassPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setApiError("");
        setSuccessMsg("");

        try {
            const result = await http("/auth/forgot-password", {
                method: "POST",
                body: { email: email }
            });

            if (result && result.success) {
                setSuccessMsg("Kode OTP telah dikirim! (Silakan cek terminal server Go)");
                setStep(2); // Otomatis ubah form ke input OTP
            } else {
                setApiError(result.message || "Email tidak ditemukan.");
            }
        } catch (error) {
            console.error("Error OTP Request:", error);
            setApiError("Terjadi kesalahan pada server.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setApiError("");
        setSuccessMsg("");

        try {
            const result = await http("/auth/forgot-password", {
                method: "PATCH",
                body: {
                    email: email,
                    otp_code: parseInt(otpCode),
                    new_password: newPassword
                }
            });

            if (result && result.success) {
                alert("Password berhasil diubah! Silakan login dengan password baru.");
                navigate("/login"); 
            } else {
                setApiError(result.message || "OTP salah atau kadaluarsa.");
            }
        } catch (error) {
            console.error("Error Reset Password:", error);
            setApiError("Terjadi kesalahan saat mereset password.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        {/* Logo */}
                        <img src={logoBrown} alt="Coffee Shop" className="logo w-30 mb-5" />
                        
                        {/* Judul Dinamis berdasarkan Step */}
                        <h2 className="text-brown text-2xl font-semibold mb-1">
                            {step === 1 ? "Fill out the form correctly" : "Reset your password"}
                        </h2>
                        <p className="content text-gray-400 mb-6">
                            {step === 1 
                                ? "We will send an OTP code to your email" 
                                : "Enter the OTP code from your email and your new password"}
                        </p>

                        {apiError && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 border border-red-200 text-sm">
                                {apiError}
                            </div>
                        )}
                        {successMsg && (
                            <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 border border-green-200 text-sm">
                                {successMsg}
                            </div>
                        )}

                        {step === 1 && (
                            <form className="flex flex-col gap-6" onSubmit={handleRequestOTP}>
                                <Input 
                                    label="Email" 
                                    type="email" 
                                    placeholder="Enter Your Email" 
                                    icon={Mail} 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                
                                <PrimaryButton type="submit" disabled={isLoading}>
                                    {isLoading ? "Memproses..." : "Submit"}
                                </PrimaryButton>
                            </form>
                        )}

                        {step === 2 && (
                            <form className="flex flex-col gap-6" onSubmit={handleResetPassword}>
                                <Input 
                                    label="OTP Code" 
                                    type="number" 
                                    placeholder="Enter 6-digit OTP" 
                                    icon={Key} 
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    required
                                />
                                
                                <Password 
                                    label="New Password" 
                                    placeholder="Enter Your New Password" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />

                                <PrimaryButton type="submit" disabled={isLoading}>
                                    {isLoading ? "Merubah Password..." : "Reset Password"}
                                </PrimaryButton>

                                <button 
                                    type="button" 
                                    onClick={() => setStep(1)} 
                                    className="text-sm text-gray-500 hover:text-[#FF8906] mt-2"
                                >
                                    Ganti Email
                                </button>
                            </form>
                        )}

                    </div>
                </section>
            </section>
        </div>
    );
}
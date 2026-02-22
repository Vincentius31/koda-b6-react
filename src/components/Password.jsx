import React, { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react"; 

export default function Password({ label, placeholder, register, error, ...rest }) {
    const [showPassword, setShowPassword] = useState(false); 

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-group">
            <label className="block text-sm mb-2 font-medium text-gray-700">{label}</label>
            <div className="eye input-box flex items-center border rounded-md px-3 py-3 focus-within:border-[#FF8A00] transition-all">
                <KeyRound className="w-5 mr-3 text-gray-400"/>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="w-full outline-none border-none bg-transparent text-sm"
                    {...register}
                    {...rest}
                />
                
                <button 
                    type="button" 
                    onClick={togglePassword}
                    className="focus:outline-none text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5" /> : <Eye className="w-5" />}
                </button>
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}
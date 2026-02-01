export default function Input({ label, type, placeholder, icon: Icon, register, error, ...rest }) {
    return (
        <div className="form-group">
            <label className="block text-sm mb-2">{label}</label>
            <div className="input-box flex items-center border rounded-md px-3 py-3">
                {Icon && <Icon className="w-5 mr-3 text-gray-400"/>}
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full outline-none border-none bg-transparent"
                    {...register}
                    {...rest}    
                />
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}




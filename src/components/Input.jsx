// Deskripsi Props:
// 1. Icon : Mengambil prop bernama icon dan Mengubah menjadi Icon agar dapat di render sebagai component (Penggunaan libary Lucide React Icon)
// 2. register: Digunakan untuk intregasi libary React Hook Form 
// 3. error: pesan validasi jika terjadi error


export default function Input({ label, type, placeholder, icon: Icon, register, error, ...res}) {
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
                    {...res}
                />
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}




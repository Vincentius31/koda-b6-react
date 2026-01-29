import { Eye, KeyRound } from "lucide-react"

export default function Password({ label, placeholder, register, error }) {
    return (
        <div className="form-group">
            <label className="block text-sm mb-2">{label}</label>
            <div className="eye input-box flex items-center border rounded-md px-3 py-3">
                <KeyRound className="w-5 mr-3"/>
                <input
                    type="password"
                    placeholder={placeholder}
                    className="w-full outline-none border-none"
                    {...register}
                />
                <Eye className="w-5 mr-3"/>
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

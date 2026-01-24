import { Eye, KeyRound } from "lucide-react"

export default function Password({ label, placeholder }) {
    return (
        <div className="form-group mb-5">
            <label className="block text-sm mb-2">{label}</label>
            <div className="eye input-box flex items-center border rounded-md px-3 py-3">
                <KeyRound className="w-5 mr-3"/>
                <input
                    type="password"
                    placeholder={placeholder}
                    className="w-full outline-none border-none"
                />
                <Eye className="w-5 mr-3"/>
            </div>
        </div>
    )
}

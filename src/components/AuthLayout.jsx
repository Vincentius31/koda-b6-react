import loginImage from "../assets/img/Rectangle 289.png"

export default function AuthLayout({children}){
    return (
        <div className="min-h-screen flex">
            <div className="hidden md:block md:w-1/2">
                <img src={loginImage} alt="Image-Login" className="h-full w-full object-cover"/>
            </div>
            <div className="flex w-full md: w-1/2  items-center justify-center">
                {children}
            </div>
        </div>
    )
}
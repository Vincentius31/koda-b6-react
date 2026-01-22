import AuthImage from "../components/AuthImage.jsx"

export default function AuthLayout({children}){
    return (
        <div className="">
            <div className="">
                <img src="../assets/img/rectangle 289.png" alt="Image-Login" />
            </div>
            <div className="">
                {children}
            </div>
        </div>
    )
}
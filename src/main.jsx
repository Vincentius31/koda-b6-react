import { createRoot } from "react-dom/client";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ForgotPassPage } from "./pages/ForgotPassPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const el = document.getElementById("root");
const root = createRoot(el);

const H1 = function(){
    return (<h1>Hello World</h1>)
}

root.render(<Footer/>)
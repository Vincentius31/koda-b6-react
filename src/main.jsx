import { createRoot } from "react-dom/client";

const el = document.getElementById("root");
const root = createRoot(el);

const H1 = function(){
    return (<h1>Hello World</h1>)
}

root.render(<H1/>)
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

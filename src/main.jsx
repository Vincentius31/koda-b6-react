import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/redux/store";

const el = document.getElementById("root")
const root = createRoot(el)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CartProvider>
        <App />
      </CartProvider>
    </PersistGate>
  </Provider>
)
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);

  // 1. Fungsi Tambah (Sudah ada)
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.temperature === newItem.temperature
      );

      if (index !== -1) {
        return prevCart.map((item, i) =>
          i === index ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, newItem];
    });
    alert("Produk masuk cart");
  };

  // 2. Fungsi Hapus Item Tertentu (BARU)
  const removeFromCart = (id, size, temperature) => {
    setCart((prevCart) => {
        // Filter item yang TIDAK cocok dengan kriteria penghapusan
        // (Simpan item yang ID, Size, atau Temp-nya BEDA)
        return prevCart.filter(item => 
            !(item.id === id && item.size === size && item.temperature === temperature)
        );
    });
  };

  // 3. Fungsi Kurangi Qty (Opsional - logic minus)
  const decreaseQty = (id, size, temperature) => {
     setCart((prevCart) => {
        return prevCart.map(item => {
            if (item.id === id && item.size === size && item.temperature === temperature) {
                // Jika qty > 1, kurangi 1. Jika 1, biarkan (atau hapus)
                return { ...item, qty: Math.max(1, item.qty - 1) };
            }
            return item;
        });
     });
  };

  // 4. Fungsi Hapus Semua / Reset (BARU)
  // Panggil ini saat logout atau selesai checkout
  const clearCart = () => {
    setCart([]); // Set array kosong, useEffect akan otomatis kosongkan localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
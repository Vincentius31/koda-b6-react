import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  useEffect(() => {
    const adminEmail = "admin@coffee.com";
    const isAdminExist = users.find(u => u.email === adminEmail);

    if (!isAdminExist) {
      const defaultAdmin = {
        fullName: "Administrator",
        email: adminEmail,
        password: "admin123",
        role: "admin"
      };
      setUsers([...users, defaultAdmin]);
    }
  }, [users, setUsers]);

  // REGISTER
  const registerUser = (data) => {
    const emailExist = users.find(u => u.email === data.email);
    if (emailExist) {
      return { success: false, message: "Email sudah terdaftar" };
    }

    const newUser = {
      fullName: data.fullname,
      email: data.email,
      password: data.password,
      role: "user"
    };

    setUsers([...users, newUser]);
    return { success: true };
  };

  // LOGIN
  const loginUser = (email, password) => {
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, message: "Email atau password salah" };
    }

    setCurrentUser(user);
    return { success: true, user }; 
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
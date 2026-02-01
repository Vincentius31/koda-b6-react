import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  // REGISTER
  const registerUser = (data) => {
    const emailExist = users.find(u => u.email === data.email);

    if (emailExist) {
      return { success: false, message: "Email sudah terdaftar" };
    }

    const newUser = {
      fullName: data.fullname,
      email: data.email,
      password: data.password
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

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        registerUser,
        loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

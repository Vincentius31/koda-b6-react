import { createSlice } from '@reduxjs/toolkit';

const defaultAdmin = {
  fullName: "Administrator",
  email: "admin@coffee.com",
  password: "admin123",
  role: "admin"
};

const getInitialUsers = () => {
  const saved = localStorage.getItem("users");
  if (!saved) {
    const initialList = [defaultAdmin];
    localStorage.setItem("users", JSON.stringify(initialList));
    return initialList;
  }

  const parsed = JSON.parse(saved);

  const adminExists = parsed.some(u => u.email === defaultAdmin.email);
  if (!adminExists) {
    parsed.push(defaultAdmin);
    localStorage.setItem("users", JSON.stringify(parsed));
  }

  return parsed;
};

const initialState = {
  users: getInitialUsers(),
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { fullname, email, password } = action.payload;
      const emailExist = state.users.find(u => u.email === email);

      if (emailExist) {
        throw new Error("Email is exsisted. Please use other email.");
      }

      const newUser = {
        fullName: fullname,
        email,
        password,
        role: "user"
      };

      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Wrong Email or Password");
      }

      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { registerUser, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
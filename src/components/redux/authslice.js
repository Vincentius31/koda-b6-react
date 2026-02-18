import { createSlice } from '@reduxjs/toolkit';

const savedUsers = JSON.parse(localStorage.getItem("users")) || [
  {
    fullName: "Administrator",
    email: "admin@coffee.com",
    password: "admin123",
    role: "admin"
  }
];
const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
  users: savedUsers,
  currentUser: savedCurrentUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { fullname, email, password } = action.payload;
      const emailExist = state.users.find(u => u.email === email);
      
      if (emailExist) {
        throw new Error("Email sudah terdaftar");
      }

      const newUser = {
        fullName: fullname,
        email,
        password,
        role: "user"
      };
      
      state.users.push(newUser);
      // SIMPAN KE LOCALSTORAGE
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Email atau password salah");
      }

      state.currentUser = user;
      // SIMPAN KE LOCALSTORAGE
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
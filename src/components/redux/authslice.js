import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      fullName: "Administrator",
      email: "admin@coffee.com",
      password: "admin123",
      role: "admin"
    }
  ],
  currentUser: null,
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
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { registerUser, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;
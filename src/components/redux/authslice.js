import { createSlice } from '@reduxjs/toolkit';

const defaultAdmin = {
  fullname: "Administrator",
  email: "admin@coffee.com",
  password: "admin123",
  role: "admin",
  phone: "08123456789",
  address: "Coffee Shop Office",
  joinDate: "22 February 2026",
  image: "https://i.pravatar.cc/150?u=admin"
};

const getInitialUsers = () => {
  const saved = localStorage.getItem("users");
  
  if (!saved) {
    const initialList = [defaultAdmin];
    localStorage.setItem("users", JSON.stringify(initialList));
    return initialList;
  }

  let parsed = JSON.parse(saved);

  parsed = parsed.map(user => {
    if (user.hasOwnProperty('fullName')) {
      user.fullname = user.fullName; 
      delete user.fullName;        
    }
    return user;
  });

  const adminIndex = parsed.findIndex(u => u.email === defaultAdmin.email);

  if (adminIndex === -1) {
    parsed.push(defaultAdmin);
  } else {
    parsed[adminIndex] = { ...defaultAdmin, ...parsed[adminIndex] };
  }

  localStorage.setItem("users", JSON.stringify(parsed));
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
        throw new Error("Email is existed. Please use other email.");
      }

      const newUser = {
        fullname, 
        email,
        password,
        role: "user",
        phone: "-",
        address: "-",
        joinDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        image: `https://i.pravatar.cc/150?u=${email}`
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

      if (user.fullName) {
        user.fullname = user.fullName;
        delete user.fullName;
      }

      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },

    updateProfile: (state, action) => {
      const updatedData = action.payload;
      
      state.users = state.users.map(u => 
        u.email === updatedData.email ? { ...u, ...updatedData } : u
      );
      
      state.currentUser = { ...state.currentUser, ...updatedData };
      
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { registerUser, loginUser, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
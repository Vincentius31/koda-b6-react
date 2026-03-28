import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartData: (state, action) => {
            state.items = action.payload || [];
        },
        clearCartData: (state) => {
            state.items = [];
        }
    }
});

export const { setCartData, clearCartData } = cartSlice.actions;
export default cartSlice.reducer;
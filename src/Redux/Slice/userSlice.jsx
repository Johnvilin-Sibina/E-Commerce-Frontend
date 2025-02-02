import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  category: null,
  product: null,
  products: [],
  cartItems: [],
  cart: [],
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      state.currentUser.rest = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createCategoryStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    },
    createCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    createProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addToCartStart: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    addToCartSuccess: (state, action) => {
      state.cartItems = true;
      state.loading = false;
      state.error = false;
    },
    addToCartFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchCartStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchCartFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchOrdersStart: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchOrdersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signOutSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  category:null,
  product:null,
  cart:[],
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
    createCategoryStart:(state,action)=>{
      state.loading = true;
      state.error = null;
    },
    createCategorySuccess:(state,action)=>{
      state.category = action.payload;
      state.loading = false;
      state.error = null
    },
    createCategoryFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    createProductStart:(state)=>{
      state.loading = true;
      state.error = null
    },
    createProductSuccess:(state,action)=>{
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    createProductFailure:(state,action)=>{
      state.loading = false;
      state.error = action.payload
    },    
    addToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.cart = [...(state.cart || []), action.payload]; // Append new cart item
      state.loading = false;
      state.error = null;
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCart:(state,action)=>{
      state.cart = action.payload
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
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  setCart,
} = userSlice.actions;

export default userSlice.reducer;

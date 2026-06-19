import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrderDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderDetailSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    fetchOrderDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.orders.push(action.payload);
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
  fetchOrderDetailStart,
  fetchOrderDetailSuccess,
  fetchOrderDetailFail,
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  clearError
} = orderSlice.actions;

export default orderSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pages: 1,
    total: 0
  },
  filters: {
    category: '',
    search: ''
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.pagination = {
        currentPage: action.payload.currentPage,
        pages: action.payload.pages,
        total: action.payload.total
      };
    },
    fetchProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFail,
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductDetailFail,
  setFilters,
  clearError
} = productSlice.actions;

export default productSlice.reducer;

// mock data burda olduğunda hydration hatası aldığı customer liste aldık

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [], // Başta boş başlatıyoruz
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.unshift(action.payload);
      localStorage.setItem('customers', JSON.stringify(state.customers));
    },
    updateCustomer: (state, action) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
        localStorage.setItem('customers', JSON.stringify(state.customers));
      }
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
      localStorage.setItem('customers', JSON.stringify(state.customers));
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer, setCustomers } = customerSlice.actions;
export default customerSlice.reducer;




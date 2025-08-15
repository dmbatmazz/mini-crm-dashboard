
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../features/customerSlice';

export const store = configureStore({ // Uygulama genelinde kullanılacak store
  reducer: {
    customers: customerReducer,
  },
});

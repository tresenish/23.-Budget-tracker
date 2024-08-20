import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
console.log(store.getState());

// Housing
// Transportation
// Food & Groceries
// Purchases
// Savings
// Debt & Loans
// Health & Wellness
// Entertainment & Leisure
// Miscellaneous
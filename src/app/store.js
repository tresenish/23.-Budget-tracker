import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from '../features/slices/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

console.log(store.getState());

export default store;

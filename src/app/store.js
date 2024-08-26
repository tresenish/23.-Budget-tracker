import { configureStore } from '@reduxjs/toolkit';
import expensesReducer, { initializeExpenses } from '../features/slices/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

// Log the initial state
console.log('Initial state:', store.getState());

// Dispatch the initializeExpenses action
store.dispatch(initializeExpenses());

// Log the updated state after initialization
console.log('State after initialization:', store.getState());

export default store;

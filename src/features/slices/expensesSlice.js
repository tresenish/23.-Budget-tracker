import { createSlice } from '@reduxjs/toolkit';
import { generateRandomItems } from './random'; // Ensure the correct path

const initialState = {
  currency: "$",
  Housing: [],
  Transportation: [],
  FoodAndGroceries: [],
  Purchases: [],
  Savings: [],
  DebtAndLoans: [],
  HealthAndWellness: [],
  EntertainmentAndLeisure: [],
  Miscellaneous: [],
  History: []
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const { category, name, price } = action.payload;
      state[category].push({ name, price });
      state.History.unshift({ name, price, category });
    },
    removeExpense: (state, action) => {
      const { category, name, price } = action.payload;
      
      if (state[category]) {
        const indexCategory = state[category].findIndex(
          (expense) => expense.name === name && expense.price === price
        );
        if (indexCategory !== -1) {
          state[category].splice(indexCategory, 1);
        }
      }

      const indexHistory = state.History.findIndex(
        (expense) => expense.name === name && expense.price === price && expense.category === category
      );
      if (indexHistory !== -1) {
        state.History.splice(indexHistory, 1);
      }
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
    initializeExpenses: (state) => {
      const randomItems = generateRandomItems(50); 
      randomItems.forEach(item => {
        state[item.category].push({ name: item.name, price: item.price });
        state.History.unshift({ name: item.name, price: item.price, category: item.category });
      });
    }
  },
});

export const { addExpense, removeExpense, reset, changeCurrency, initializeExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;

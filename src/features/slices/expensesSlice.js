import { createSlice } from '@reduxjs/toolkit';
import { generateRandomItems } from './random';

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
      state.History.unshift({ category, name, price });
    },
    removeExpense: (state, action) => {
      const { category, name, price } = action.payload;
      const indexCategory = state[category].findIndex(
        (expense) => expense.name === name && expense.price === price
      );
      if (indexCategory !== -1) {
        state[category].splice(indexCategory, 1);
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
    }
  },
});

// Custom action to initialize expenses
export const initializeExpenses = () => (dispatch) => {
  const randomItems = generateRandomItems(50);
  randomItems.forEach(item => {
    dispatch(expensesSlice.actions.addExpense({ category: item.category, name: item.name, price: item.price }));
  });
};

export const { addExpense, removeExpense, reset, changeCurrency } = expensesSlice.actions;

export default expensesSlice.reducer;

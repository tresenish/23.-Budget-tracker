import { createSlice } from '@reduxjs/toolkit';

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
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
  },
  reducers: {
    addExpense: (state, action) => {
      const { category, name, price } = action.payload;

      // Add to Category Slice
      state[category].push({ name, price });

      // Add to History Slice (FIFO)
      state.History.unshift({ name, price });


    },
    removeExpense: (state, action) => {
      const { category, name, price } = action.payload;
      
      // Remove from Category Slice
      const indexCategory = state[category].findIndex(
        (expense) => expense.name === name && expense.price === price
      );
      if (indexCategory !== -1) {
        state[category].splice(indexCategory, 1);
      }

      // Remove from History Slice (Remove specific entry)
      const indexHistory = state.History.findIndex(
        (expense) => expense.name === name && expense.price === price
      );
      if (indexHistory !== -1) {
        state.History.splice(indexHistory, 1);
      }
    },
  },
});

export const { addExpense, removeExpense, shiftHistory } = expensesSlice.actions;

export default expensesSlice.reducer;

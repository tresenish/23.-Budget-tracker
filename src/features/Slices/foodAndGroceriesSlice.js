import { createSlice } from '@reduxjs/toolkit';

export const foodAndGroceriesSlice = createSlice({
  name: 'foodAndGroceries',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addExpense } = foodAndGroceriesSlice.actions;

export default foodAndGroceriesSlice.reducer;

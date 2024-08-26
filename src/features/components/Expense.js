import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../slices/expensesSlice';
import './Expense.css';

const Expense = ({ category, expense, displayCategory }) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.expenses.currency);

  const handleRemove = () => {
    if (category) {
      dispatch(removeExpense({ category, name: expense.name, price: expense.price }));
    } else {
      console.error("Category is not defined for this expense.");
    }
  };

  return (
    <div id="expenseLine">
      {expense.name}: {currency}{expense.price} 
      {displayCategory && <span id="expenseCategory"> in {category}</span>}
      <button id="expenseButton" onClick={handleRemove}>✖</button>
    </div>
  );
};

export default Expense;

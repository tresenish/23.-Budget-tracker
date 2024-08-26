import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../slices/expensesSlice';
import './Expense.css';

const Expense = ({ category, expense }) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.expenses.currency);

  const handleRemove = () => {
    dispatch(removeExpense({ category, name: expense.name, price: expense.price }));
  };

  return (
    <div id="expenseLine">
      {expense.name}:  {currency}{expense.price} <span id="expenseCategory">{category}</span>
      <button id="expenseButton" onClick={handleRemove}>✖</button>
    </div>
  );
};

export default Expense;

import React from 'react';
import { useSelector } from 'react-redux';
import Expense from './Expense';
import './History.css';

export const History = () => {
  const history = useSelector((state) => state.expenses.History);

  const lastTenExpenses = history.slice(0, 15);

  return (
    <div id="historyInnerDiv">
      <h2>History:</h2>
      {lastTenExpenses.length > 0 ? (
        lastTenExpenses.map((expense, index) => (
          <Expense key={index} category={expense.category} expense={expense} />
        ))
      ) : (
        <p>No expenses in history.</p>
      )}
    </div>
  );
};

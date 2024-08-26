import React from 'react';
import { useSelector } from 'react-redux';
import Expense from './Expense';
import './CategoryInfo.css';

export const CategoryInfo = ({ categoryName }) => {
  const expenses = useSelector((state) => state.expenses[categoryName]);

  if (!expenses || expenses.length === 0) {
    return null;
  }

  return (
    <div id="categorySection">
      <h2 id="categorySectionH2">{categoryName}:</h2>
      {expenses.slice(0, 6).map((expense, index) => (
        <Expense key={index} category={categoryName} expense={expense} displayCategory={false} />
      ))}
    </div>
  );
};

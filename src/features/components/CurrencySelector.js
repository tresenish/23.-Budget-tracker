import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency } from '../slices/expensesSlice';
import './CurrencySelector.css';
export const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.expenses.currency);

  const handleCurrencyChange = (event) => {
    dispatch(changeCurrency(event.target.value));
  };

  return (
    <div id="currencyInnerDiv">
      <select id="currency" value={currency} onChange={handleCurrencyChange}>
        <option value="$">USD/CAD ($)</option>
        <option value="€">EUR (€)</option>
        <option value="₴">UAH (₴)</option>
        <option value="£">GBP (£)</option>
        <option value="¥">JPY (¥)</option>
        <option value="₹">INR (₹)</option>
      </select>
    </div>
  );
};


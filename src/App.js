import React from 'react';
import { useDispatch } from 'react-redux';
import { GPTInput } from './features/gpt-input/GPTInput';
import { Chart } from './features/components/Chart';
import { CurrencySelector } from './features/components/CurrencySelector';
import { History } from './features/components/History';
import { initializeExpenses, reset } from './features/slices/expensesSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const handleRandomize = () => {dispatch(initializeExpenses());};
  const handleReset = () => {dispatch(reset());};

  return (
    <div className="App">
      <div id="header">
        <h1 id="navH1">Expense Tracker</h1>
        <div id="currencyDiv"><CurrencySelector/></div>
        <button className='buttonGroup' onClick={handleRandomize}>Randomize</button>
        <button className='buttonGroup' onClick={handleReset}>Reset</button>
      </div>
      <div id="chartDiv"><Chart/></div>
      <div id="gptDiv"><GPTInput/></div>
      <div id="historyDiv"><History/></div>
        {/* <Info/> */}
    </div>
  );
}

export default App;

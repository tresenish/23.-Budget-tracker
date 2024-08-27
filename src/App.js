import React from 'react';
import { useDispatch } from 'react-redux';
import { GPTInput } from './features/gpt-input/GPTInput';
import { Chart } from './features/components/Chart';
import { CurrencySelector } from './features/components/CurrencySelector';
import { History } from './features/components/History';
import { CategoryInfo } from './features/components/CategoryInfo';
import { initializeExpenses, reset } from './features/slices/expensesSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const handleRandomize = () => { dispatch(initializeExpenses()); };
  const handleReset = () => { dispatch(reset()); };

  const categories = [
    'Housing',
    'Transportation',
    'FoodAndGroceries',
    'Purchases',
    'Savings',
    'DebtAndLoans',
    'HealthAndWellness',
    'EntertainmentAndLeisure',
    'Miscellaneous',
  ];

  return (
    <div className="App">
      <div id="header">
        <div id="titleDiv">
          <h1 id="navH1">Expense Tracker</h1>
          <img src={require('./img/gpt.png')} alt="chatGPT logo" id="logoImg"/>
        </div>

        <div id="buttonsDiv">
          <div id="currencyDiv"><CurrencySelector/></div>
          <button id="randomizeButton" className='buttonGroup' onClick={handleRandomize}>Randomize</button>
          <button id="resetButton" className='buttonGroup' onClick={handleReset}>Reset</button>
        </div>
        
      </div>
      <p id="instructions">
        1. Press <strong>Reset</strong> to clear data.<br/>
        2. Add expenses using the format: <em>item price</em> (e.g., <strong>coffee 5, rent 500</strong>).<br/>
        3. Expenses are auto-categorized by chatGPT.<br/>
        4. Remove expenses via the <strong>History</strong> or their specific category by clicking the delete (✖) button.<br/>
        5. Use <strong>Randomize</strong> to generate test expenses.
      </p>

      <div id="chartDiv"><Chart/></div>
      <div id="gptDiv"><GPTInput/></div>
      <div id="historyDiv"><History/></div>
      <div id="categoryInfoDiv">
        {categories.map((category) => (
          <div key={category}><CategoryInfo categoryName={category} /></div>
        ))}
      </div>
    </div>
  );
}

export default App;

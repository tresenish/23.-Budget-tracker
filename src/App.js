// App.js
import React from 'react';
// import { Counter } from './features/counter/Counter';
import { GPTInput } from './features/gpt-input/GPTInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id="h1-app">Expense Tracker</h1>
      <div id="chartDiv">
        {/* <Chart/> */}
      </div>
      <div id="gptDiv">
        <GPTInput/>
      </div>
        
        {/* <Hitory/> */}
        {/* <Info/> */}
    </div>
  );
}

export default App;

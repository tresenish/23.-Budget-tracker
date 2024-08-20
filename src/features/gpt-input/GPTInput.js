import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GPTInput.css';
export function GPTInput() {
  // State to hold the input value
  const [input, setInput] = useState('');

  // Event handler for input change
  const handleInputChange = (event) => {
    setInput(event.target.value); // Update the input state with the new value
  };

  return (
    <div>
      <input
        type='text'
        id="gptIn"
        name="gptIn"
        placeholder="type input here"
        value={input} // Bind the input value to the state
        onChange={handleInputChange} // Handle the change event
      />
    </div>
  );
}

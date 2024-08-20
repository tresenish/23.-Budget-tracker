import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './GPTInput.css';

export function GPTInput() {
  // State to hold the input value
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  // Event handler for input change
  const handleInputChange = (event) => {
    setInput(event.target.value); // Update the input state with the new value
  };

  // Function to handle the submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    setInput('');
  };

  return (
    <form id='gptForm' onSubmit={handleSubmit}>
      <input
        type='text'
        id="gptIn"
        name="gptIn"
        placeholder="type input here"
        value={input}
        onChange={handleInputChange}
      />
      <button id='submitIn' type='submit'>+</button>
    </form>
  );
}

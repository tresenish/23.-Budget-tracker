import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendExpenseToChatGPT } from './gptAPI';
import { addExpense } from '../slices/expensesSlice';
import './GPTInput.css';

export function GPTInput() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');  // Debugging log to ensure the form is submitted

    try {
      const expenseData = await sendExpenseToChatGPT(input);
      if (expenseData) {
        dispatch(addExpense(expenseData));
        console.log(`Item "${expenseData.name}" was successfully added to the category "${expenseData.category}" with a price of $${expenseData.price}.`);
      } else {
        console.warn('No expense data returned from ChatGPT.');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Quota exceeded:', error.response.data);
        alert('You have exceeded your API quota. Please check your OpenAI account.');
      } else {
        console.error('Error in handleSubmit:', error.response ? error.response.data : error.message);
      }
    } finally {
      setInput(''); // Clear the input field after submission
    }
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

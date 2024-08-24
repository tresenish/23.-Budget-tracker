import axios from 'axios';

export const sendExpenseToChatGPT = async (input) => {
  try {
    // Customized prompt for ChatGPT
    const prompt = `Please categorize the following expense: "${input}". 
    Choose the most appropriate category from the following list: 
    Housing, Transportation, FoodAndGroceries, Purchases, Savings, DebtAndLoans, 
    HealthAndWellness, EntertainmentAndLeisure, Miscellaneous. 
    Respond in the format: "Category: <Category>, Item: <Item>, Price: <Price>".`;

    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    const response = result.data.choices[0].message.content;
    return parseChatGPTResponse(response);
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const parseChatGPTResponse = (response) => {
  // Updated regex to optionally account for a currency symbol before the price
  const regex = /Category:\s*(\w+),\s*Item:\s*([\w\s]+),\s*Price:\s*\$?(\d+)/i;
  const match = response.match(regex);

  if (match) {
    const category = match[1];
    const name = match[2].trim(); // Trim any extra whitespace around the name
    const price = parseFloat(match[3]);

    return { category, name, price };
  }

  console.warn('Unexpected response format:', response);
  return null;
};

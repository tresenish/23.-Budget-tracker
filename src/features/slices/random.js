function getRandomItem(category) {
    const items = {
      Housing: ['Rent', 'Mortgage', 'Electricity Bill', 'Water Bill', 'Property Tax'],
      Transportation: ['Bus Ticket', 'Gasoline', 'Car Maintenance', 'Parking Fee', 'Uber'],
      FoodAndGroceries: ['Apple', 'Banana', 'Bread', 'Milk', 'Eggs'],
      Purchases: ['Laptop', 'Phone', 'Headphones', 'Book', 'Clothes'],
      Savings: ['Bank Deposit', 'Investment', 'Retirement Fund'],
      DebtAndLoans: ['Credit Card Payment', 'Student Loan', 'Car Loan'],
      HealthAndWellness: ['Gym Membership', 'Doctor Visit', 'Medicine', 'Vitamin Supplements'],
      EntertainmentAndLeisure: ['Movie Ticket', 'Concert', 'Video Game', 'Museum Entry'],
      Miscellaneous: ['Gift', 'Charity Donation', 'Stationery', 'Coffee', 'Magazine'],
    };
    const itemsInCategory = items[category];
    return itemsInCategory[Math.floor(Math.random() * itemsInCategory.length)];
  }
  
  function getRandomPrice(category) {
    const priceRanges = {
      Housing: [500, 2000],
      Transportation: [5, 100],
      FoodAndGroceries: [1, 90],
      Purchases: [300, 1000],
      Savings: [50, 1000],
      DebtAndLoans: [50, 2000],
      HealthAndWellness: [10, 200],
      EntertainmentAndLeisure: [5, 150],
      Miscellaneous: [1, 50],
    };
    const [min, max] = priceRanges[category];
    return (Math.random() * (max - min) + min).toFixed(2);
  }
  
  function getRandomCategory() {
    const categories = ['Housing', 'Transportation', 'FoodAndGroceries', 'Purchases', 'Savings', 'DebtAndLoans', 'HealthAndWellness', 'EntertainmentAndLeisure', 'Miscellaneous'];
    return categories[Math.floor(Math.random() * categories.length)];
  }
  
  function generateRandomItems(count) {
    const randomItems = [];
    for (let i = 0; i < count; i++) {
      const category = getRandomCategory();
      const name = getRandomItem(category);
      const price = getRandomPrice(category);
      randomItems.push({ category, name, price });
    }
    return randomItems;
  }
  
  export { generateRandomItems };
  
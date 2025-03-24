

# Expense Tracker

![Expense Tracker UI](https://raw.githubusercontent.com/Yaswanth-Vempuluru-7916/expense-tracker/main/src/assets/images/ui.png)

A simple, beginner-friendly Expense Tracker built with React, TypeScript, Vite, Redux Toolkit, and Tailwind CSS. This app allows users to manage their expenses by adding, editing, removing, filtering, and persisting them in local storage.

## Table of Contents
- [Expense Tracker](#expense-tracker)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)

## Features
- **Add Expenses**: Input description, amount, category, and date to track expenses.
- **Edit Expenses**: Modify existing expenses directly from the list.
- **Remove Expenses**: Delete unwanted entries with a single click.
- **Filter by Category**: View expenses by specific categories or all at once.
- **Total Calculation**: Displays the sum of filtered expenses.
- **Persistent Storage**: Expenses are saved in local storage and persist across page refreshes.
- **Input Validation**: Ensures valid data (e.g., positive amounts, required fields).

## Technologies
- **React**: Frontend library for building the UI.
- **TypeScript**: Adds static typing for better code reliability.
- **Vite**: Fast build tool for development and production.
- **Redux Toolkit**: State management for expenses.
- **Local Storage**: Browser API for data persistence.

## Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Yaswanth-Vempuluru-7916/expense-tracker.git
   cd expense-tracker
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Run the Development Server**  
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to see the app.

## Usage
1. **Add an Expense**:
   - Fill in the description, amount, category, and date fields.
   - Click "Add Expense" (or "Update Expense" when editing).
   - Errors will appear if inputs are invalid (e.g., negative amount).

2. **Edit an Expense**:
   - Click the "Edit" button next to an expense.
   - Modify the fields and click "Update Expense".

3. **Remove an Expense**:
   - Click the "Remove" button next to an expense to delete it.

4. **Filter Expenses**:
   - Use the "Filter by Category" dropdown to view specific categories or all expenses.

5. **View Total**:
   - The total updates automatically based on the filtered list.

Expenses persist in your browser’s local storage, so they’ll remain after refreshing the page.

## Project Structure
```
expense-tracker/
├── src/
│   ├── store/
│   │   ├── expenseSlice.ts  # Redux slice for expense state and actions
│   │   └── store.ts        # Redux store configuration
│   ├── App.tsx             # Main component with UI and logic
│   ├── main.tsx            # Entry point with Redux Provider
│   ├── index.css           # Tailwind CSS directives
│   └── vite-env.d.ts       # TypeScript Vite environment types
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## Future Enhancements
- **Sorting**: Sort expenses by date, amount, or category.
- **Confirmation Dialog**: Add a confirmation step before removing expenses.
- **Export/Import**: Allow users to export expenses as JSON or import them.
- **Date Range Filter**: Filter expenses by a date range.
- **Charts**: Visualize expenses with a chart library (e.g., Chart.js).

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the existing style and includes appropriate TypeScript types.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

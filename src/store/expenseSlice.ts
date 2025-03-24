import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
    id: number,
    description: string,
    amount: number,
    category: string;
    date: string;
}

interface ExpenseState {
    expenses: Expense[];
}

const loadState = (): ExpenseState => {

    try {
        const serializedState = localStorage.getItem('expenses');

        if (serializedState === null) {
            return { expenses: [] }
        }
        return JSON.parse(serializedState) as ExpenseState;
    } catch (error) {
        console.error('Error loading state from local storage:', error);
        return { expenses: [] };
    }

}

const initialState: ExpenseState = loadState();

// create expense slice

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        // Action to add an Expense
        addExpense(state, action: PayloadAction<Expense>) {
            state.expenses.push(action.payload)
            localStorage.setItem('expenses',JSON.stringify(state));
        },
        
        //Remove expense by id
        removeExpense(state, action: PayloadAction<number>) {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload)
            localStorage.setItem('expenses',JSON.stringify(state));
        },

        //Edit expense
        editExpense(state,action:PayloadAction<Expense>){
            const index = state.expenses.findIndex((expense)=>expense.id === action.payload.id)
            if(index!==-1){
                state.expenses[index] = action.payload
                localStorage.setItem('expenses', JSON.stringify(state));
            }
        },
    }
})

export const { addExpense, removeExpense, editExpense } = expenseSlice.actions;

export default expenseSlice.reducer
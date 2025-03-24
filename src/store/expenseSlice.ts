import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
    id : number,
    description : string,
    amount : number,
    category : string;
}

interface ExpenseState {
    expenses : Expense[];
}

const initialState : ExpenseState = {
    expenses : []
}

// create expense slice

const expenseSlice = createSlice({
    name : 'expenses',
    initialState,
    reducers : {
        // Action to add an Expense
        addExpense(state, action: PayloadAction<Expense>){
            state.expenses.push(action.payload)
        },

        //Remove expense by id
        removeExpense(state, action : PayloadAction<number>){
            state.expenses = state.expenses.filter((expense)=>expense.id!==action.payload)
        }
    }
})

export const {addExpense, removeExpense} = expenseSlice.actions;

export default expenseSlice.reducer
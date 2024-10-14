import { createSlice } from "@reduxjs/toolkit";


const transactionSlice = createSlice({
    name : "transactions",
    initialState :{
        balance : 0,
        income : [],
        expense : [],
    },
    reducers : {
        addIncome(state,action){
            
            state.income.push(action.payload);
            state.balance += action.payload.amount
        },
        addExpense(state,action){
            state.expense.push(action.payload);
            state.balance -= action.payload.amount
        },
        editIncome(state,action){
            const {id , updatedIncome} = action.payload
            const index = state.income.findIndex((item)=>item.id===id)
            if (index!== -1){
                state.balance -= state.income[index].amount
                state.income[index] = updatedIncome
                state.balance += updatedIncome.amount
                }
          },
        editExpense(state,action){
            const {id , updatedExpense} = action.payload
            const index = state.expense.findIndex((item)=>item.id===id)
            if (index!== -1){
                state.balance += state.expense[index].amount
                state.expense[index] = updatedExpense
                state.balance -= updatedExpense
            }
        },
        deleteIncome: (state, action) => {
            const id = action.payload;
            state.income = state.income.filter((item) => item.id !== id);
          
        },
        deleteExpense(state,action){
            const index = state.expense.findIndex((item)=> item.id === action.payload)
            if(index!== -1){
                state.balance += state.expense[index].amount
                state.expense.splice(index, 1)
        }
        
        
    },
}


})

export default transactionSlice.reducer
export const {addIncome,addExpense,editExpense,editIncome,deleteExpense,deleteIncome}=transactionSlice.actions
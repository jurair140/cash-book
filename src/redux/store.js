import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './slice/transactionSlice'


const store = configureStore({
    reducer: {
        transactions: transactionReducer,
    }
})
export default  store;

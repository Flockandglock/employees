import { configureStore } from "@reduxjs/toolkit";
import employees from "../reducers/employees";
import filters from "../reducers/filter";



const store = configureStore({
    reducer: {employees, filters},
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
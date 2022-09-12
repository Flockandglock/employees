import { configureStore } from "@reduxjs/toolkit";
import employees from "../../components/employees-list/emplSlice";
import filters from "../../components/app-filter/filterSlice";


// Настариваем наш стор
const store = configureStore({
    reducer: {employees, filters},
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
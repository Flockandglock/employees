import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


const initialState = {
    employees: [],
    emplsLoadingStatus: 'idle',
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        employeesFetching: state => {
            state.emplsLoadingStatus = 'loading';
        },
        employeesFetched: (state, actions) => {
            state.emplsLoadingStatus = 'idle';
            state.employees = actions.payload;
        },
        employeesFetchingError: state => {
            state.emplsLoadingStatus = 'error'
        },
        addEmployees: (state, actions) => {
            state.employees.push(actions.payload);
        },
        employeesDeleted: (state, actions) => {
            state.employees = state.employees.filter(item => item.id !== actions.payload);
        },
        togglePropEmpl: (state, actions) => {
            state.employees = actions.payload
        }
    }
});

const {actions, reducer} = employeesSlice;

export default reducer;
export const {
    employeesFetching,
    employeesFetched,
    employeesFetchingError,
    addEmployees,
    employeesDeleted,
    togglePropEmpl
} = actions;
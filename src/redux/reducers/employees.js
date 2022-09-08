import { createReducer } from "@reduxjs/toolkit";

import {
    emplsFetching,
    emplsFetched,
    emplsFetchingError,
    togglePropEmpl,
    addEmpl,
    emplDeleted
} from '../actions';

const initialState = {
    employees: [],
    emplsLoadingStatus: 'idle',
};

const employees = createReducer(initialState, builder => {
    builder
        .addCase(emplsFetching, state => {
            state.emplsLoadingStatus = 'loading';
        })
        .addCase(emplsFetched, (state, actions) => {
            state.emplsLoadingStatus = 'idle';
            state.employees = actions.payload;
        })
        .addCase(emplsFetchingError, state => {
            state.emplsLoadingStatus = 'error'
        })
        .addCase(addEmpl, (state, actions) => {
            state.employees.push(actions.payload);
        })
        .addCase(emplDeleted, (state, actions) => {
            state.employees = state.employees.filter(item => item.id !== actions.payload);
        })
        .addCase(togglePropEmpl, (state, actions) => {
            state.employees = actions.payload
        })
        .addDefaultCase(() => {});
});

export default employees;
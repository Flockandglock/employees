import { createReducer } from "@reduxjs/toolkit";

import {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
    getQuery
} from '../actions';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    query: '',
};

const filters = createReducer(initialState, builder => {
    builder
        .addCase(filtersFetching, state => {
            state.filtersLoadingStatus = 'loading';
        })
        .addCase(filtersFetched, (state, actions) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = actions.payload;
        })
        .addCase(filtersFetchingError, state => {
            state.filtersLoadingStatus = 'error';
        })
        .addCase(activeFilterChanged, (state, actions) => {
            state.activeFilter = actions.payload;
        })
        .addCase(getQuery, (state, actions) => {
            state.query = actions.payload;
        })
        .addDefaultCase(() => {});
});

export default filters;
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    query: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: (state, actions) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = actions.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChanged: (state, actions) => {
            state.activeFilter = actions.payload;
        },
        getQuery: (state, actions) => {
            state.query = actions.payload;
        }
    }
});

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
    getQuery
} = actions;